import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { Clock, Info } from 'lucide-react';

interface GeologicalNodeProps {
  data: {
    label: string;
    type: string;
    startMya: number;
    endMya: number;
    color: string;
    description?: string;
    isExpanded?: boolean;
    hasChildren?: boolean;
  };
  selected?: boolean;
}

export function GeologicalNode({ data, selected }: GeologicalNodeProps) {
  const isEarth = data.type === 'root';
  
  return (
    <div className={cn(
      "relative min-w-[180px] rounded-xl border-2 bg-white p-4 shadow-sm transition-all hover:shadow-md",
      selected ? "border-blue-500 ring-2 ring-blue-100 scale-105" : "border-zinc-100",
      isEarth && "border-blue-200 bg-blue-50/30"
    )}>
      <Handle type="target" position={Position.Top} className="!bg-zinc-300" />
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            isEarth ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-600"
          )}
          style={{ backgroundColor: !isEarth ? `${data.color}20` : undefined, color: !isEarth ? data.color : undefined }}>
            {data.type}
          </span>
          {data.hasChildren && !data.isExpanded && (
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" title="Has hidden branches" />
          )}
        </div>
        
        <h3 className="text-sm font-bold text-zinc-900 line-clamp-1">{data.label}</h3>
        
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
          <Clock className="h-3 w-3" />
          <span>{data.startMya}{data.endMya !== null ? ` – ${data.endMya}` : ''} MYA</span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-zinc-300" />
      
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
