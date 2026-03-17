'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Background,
  Controls,
  MiniMap,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GeologicalNode } from '@/components/GeologicalNode';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info, Layers, Maximize2, RefreshCw, Map } from 'lucide-react';
import Link from 'next/link';

const nodeTypes = {
  geological: GeologicalNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const showDetail = useCallback((unit: any) => {
    setSelectedUnit(unit);
    setIsSheetOpen(true);
  }, []);

  // Fetch root node (Earth) initially
  useEffect(() => {
    async function fetchRoot() {
      try {
        const response = await fetch('/api/units');
        const data = await response.json();
        if (data.length > 0) {
          const root = data[0];
          const rootNode: Node = {
            id: root.id,
            type: 'geological',
            data: { 
              label: root.name, 
              type: root.type,
              startMya: root.startMya,
              endMya: root.endMya,
              color: root.color,
              description: root.description,
              hasChildren: true,
              onShowDetail: showDetail
            },
            position: { x: 400, y: 100 },
          };
          setNodes([rootNode]);
        }
      } catch (error) {
        console.error('Failed to fetch root unit:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRoot();
  }, [setNodes, showDetail]);

  const onNodeClick = useCallback(async (_event: React.MouseEvent, node: Node) => {
    // Fetch children if not already expanded
    if (node.data.isExpanded) return;

    try {
      const response = await fetch(`/api/units?parentId=${node.id}`);
      const children = await response.json();

      if (children.length > 0) {
        const newNodes: Node[] = children.map((child: any, index: number) => ({
          id: child.id,
          type: 'geological',
          data: { 
            label: child.name, 
            type: child.type,
            startMya: child.startMya,
            endMya: child.endMya,
            color: child.color,
            description: child.description,
            hasChildren: true,
            onShowDetail: showDetail
          },
          // Calculate horizontal spacing
          position: { 
            x: node.position.x + (index - (children.length - 1) / 2) * 220, 
            y: node.position.y + 150 
          },
        }));

        const newEdges: Edge[] = children.map((child: any) => ({
          id: `e-${node.id}-${child.id}`,
          source: node.id,
          target: child.id,
          style: { stroke: node.data.color || '#3b82f6', strokeWidth: 2 },
          animated: true,
        }));

        // Mark current node as expanded
        setNodes((nds: Node[]) => 
          nds.map((n: Node) => (n.id === node.id ? { ...n, data: { ...n.data, isExpanded: true } } : n))
            .concat(newNodes)
        );
        setEdges((eds: Edge[]) => eds.concat(newEdges));
      }
    } catch (error) {
      console.error('Failed to fetch children:', error);
    }
  }, [setNodes, setEdges, showDetail]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="h-10 w-10 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-zinc-500">Excavating deep time...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-zinc-50">
      {/* Top Header */}
      <header className="flex h-14 items-center justify-between border-b bg-white px-6 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <ChevronLeft className="h-5 w-5 text-zinc-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-bold tracking-tight text-zinc-900">Geological Navigator</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-zinc-500">
          <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-blue-500" /> Eons</span>
          <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Eras</span>
          <span className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-amber-500" /> Periods</span>
        </div>
      </header>

      {/* React Flow Workspace */}
      <main className="flex-1 relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-zinc-50"
        >
          <Background color="#cbd5e1" variant="dots" gap={20} size={1} />
          <Controls position="bottom-right" className="bg-white border shadow-sm" />
          <MiniMap 
            position="bottom-left" 
            className="bg-white border rounded-lg shadow-sm"
            nodeColor={(n: any) => n.data.color || '#3b82f6'}
          />
          <Panel position="top-right" className="bg-white/80 backdrop-blur p-3 rounded-xl border border-white shadow-lg m-4 hidden sm:block">
            <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-900 uppercase tracking-wider mb-2">
              <Info className="h-3 w-3 text-blue-500" /> 
              Navigation Tips
            </h4>
            <ul className="text-[11px] text-zinc-600 space-y-1.5">
              <li>• Click a node to expand branches</li>
              <li>• Use mouse wheel to zoom in/out</li>
              <li>• Drag nodes to reorganize view</li>
              <li>• Detail panel opens on selection</li>
            </ul>
          </Panel>
        </ReactFlow>
      </main>

      {/* Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md border-l shadow-2xl">
          <SheetHeader className="gap-2">
            <div 
              className="inline-flex h-8 w-fit items-center justify-center rounded-lg px-3 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm"
              style={{ backgroundColor: selectedUnit?.color || '#3b82f6' }}
            >
              {selectedUnit?.type}
            </div>
            <SheetTitle className="text-3xl font-bold tracking-tight text-zinc-900 border-b pb-4">
              {selectedUnit?.label}
            </SheetTitle>
            <div className="flex items-center gap-3 py-4 text-zinc-600">
               <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold text-zinc-400 tracking-tighter">Timeline Range</span>
                  <span className="text-lg font-mono font-medium">{selectedUnit?.startMya} - {selectedUnit?.endMya} MYA</span>
               </div>
            </div>
            <SheetDescription className="text-base leading-relaxed text-zinc-700 bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
              {selectedUnit?.description || "A pivotal era in Earth's history, marked by significant geological and biological shifts."}
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-12">
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2 mb-6">
              <Maximize2 className="h-4 w-4 text-zinc-400" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="rounded-xl h-24 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-200">
                  <span className="text-xs font-bold text-zinc-400">View Map</span>
                  <Map className="h-5 w-5 text-blue-500" />
               </Button>
               <Button variant="outline" className="rounded-xl h-24 flex flex-col gap-2 hover:bg-indigo-50 hover:border-indigo-200">
                  <span className="text-xs font-bold text-zinc-400">Fossil Record</span>
                  <Info className="h-5 w-5 text-indigo-500" />
               </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
