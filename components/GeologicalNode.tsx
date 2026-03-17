import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

export interface GeologicalNodeData extends Record<string, unknown> {
  label: string;
  type: string;
  startMya: number;
  endMya: number | null;
  color: string;
  description: string | null;
  isExpanded?: boolean;
  hasChildren?: boolean;
  onShowDetail?: (data: GeologicalNodeData) => void;
}

export function GeologicalNode({ data, selected }: { data: GeologicalNodeData; selected?: boolean }) {
  const isEarth = data.type === 'root';
  
  return (
    <div className={cn(
      "relative min-w-[200px] rounded-xl border-2 bg-white dark:bg-zinc-900 p-4 shadow-sm transition-all hover:shadow-md",
      selected ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900 scale-105" : "border-zinc-100 dark:border-zinc-800",
      isEarth && "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10"
    )}>
      <Handle type="target" position={Position.Top} className="bg-zinc-300 dark:bg-zinc-600!" />
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            isEarth ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          )}
          style={{ 
            backgroundColor: !isEarth ? `${data.color}20` : undefined, 
            color: !isEarth ? data.color : undefined 
          }}>
            {data.type}
          </span>
          {data.hasChildren && !data.isExpanded && (
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" title="Has hidden branches" />
          )}
        </div>
        
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{data.label}</h3>
        
        <div className="flex items-center justify-between gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            <span>{data.startMya}{data.endMya !== null ? ` – ${data.endMya}` : ''} MYA</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={(e) => {
              e.stopPropagation();
              data.onShowDetail?.(data);
            }}
          >
            <Info className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="bg-zinc-300 dark:bg-zinc-600!" />
      
      {/* Visual Indicator of depth */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all rounded-b-xl" 
        style={{ 
          width: '100%', 
          backgroundColor: data.color || '#3b82f6',
        }} 
      />
    </div>
  );
}
