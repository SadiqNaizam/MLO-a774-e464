import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  days: number;
  color: string;
  textColor?: string;
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, days: 2, color: 'bg-red-400', textColor: 'text-red-400' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, days: 2, color: 'bg-amber-400', textColor: 'text-amber-400' },
  { id: 'in_conversation', name: 'In conversation', count: 50, value: 100, days: 2, color: 'bg-slate-600', textColor: 'text-slate-600' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, days: 8, color: 'bg-green-400', textColor: 'text-green-400' },
  { id: 'closed_won', name: 'Closed won', count: 20, value: 50, days: 10, color: 'bg-purple-500', textColor: 'text-purple-500' },
];

const totalActiveLeads = 600;

interface FunnelCountCardProps {
  className?: string;
}

const FunnelCountCard: React.FC<FunnelCountCardProps> = ({ className }) => {
  const totalCountForProgress = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-5xl font-bold">{totalActiveLeads}</span>
            <span className="ml-2 text-muted-foreground">active leads</span>
          </div>
          <div className="flex w-full h-3 rounded-full overflow-hidden mb-6">
            {funnelData.map((stage) => (
              <div
                key={stage.id}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / totalCountForProgress) * 100}%` }}
              />
            ))}
          </div>
          <div className="space-y-3">
            {funnelData.map((stage, index) => (
              <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
                <div className={cn('w-3 h-3 rounded-sm', stage.color)} />
                <span className="text-foreground/80 whitespace-nowrap">{stage.name}</span>
                <span className="text-right text-foreground font-medium tabular-nums">{stage.count}</span>
                <span className="text-right text-muted-foreground tabular-nums">$ {stage.value}</span>
                {stage.name === 'In conversation' ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-right text-muted-foreground tabular-nums cursor-help">{stage.days} days</span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-slate-800 text-white py-1 px-2 rounded text-xs">
                      <p>average time on this stage</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span className="text-right text-muted-foreground tabular-nums">{stage.days} days</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FunnelCountCard;
