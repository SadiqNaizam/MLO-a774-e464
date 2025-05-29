import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface OtherDataItem {
  id: string;
  value: string | number;
  label: string;
  tooltip?: string;
}

const otherData: OtherDataItem[] = [
  { id: 'total_leads', value: 900, label: 'total leads count' },
  { id: 'avg_conversion', value: 12, label: 'days in average to convert lead' },
  { id: 'inactive_leads', value: 30, label: 'inactive leads', tooltip: 'Leads that have not been interacted with recently.' },
];

interface OtherDataGridProps {
  className?: string;
}

const OtherDataGrid: React.FC<OtherDataGridProps> = ({ className }) => {
  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Other data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
            {otherData.map((item) => (
              <div key={item.id}>
                <p className="text-3xl sm:text-4xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1 flex items-center">
                  {item.label}
                  {item.tooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-slate-800 text-white py-1 px-2 rounded text-xs max-w-xs">
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default OtherDataGrid;
