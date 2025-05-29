import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts';

interface SourceDataPoint {
  name: string;
  value: number; // Represents $ amount or count
  percentage: number;
  color: string;
}

const sourcesData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F87171' }, // red-400
  { name: 'Behance', value: 1000, percentage: 25, color: '#FBBF24' }, // amber-400
  { name: 'Instagram', value: 600, percentage: 15, color: '#2DD4BF' }, // teal-400
  { name: 'Dribbble', value: 400, percentage: 10, color: '#34D399' }, // emerald-400
];

interface SourcesPieChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border rounded shadow-lg text-sm">
        <p className="font-semibold">{`${payload[0].name}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
        <p>{`Percentage: ${payload[0].payload.percentage}%`}</p>
      </div>
    );
  }
  return null;
};

const SourcesPieChart: React.FC<SourcesPieChartProps> = ({ className }) => {
  const [activeToggle, setActiveToggle] = React.useState<string>('leadsConverted');

  // In a real app, data would change based on activeToggle
  // For this example, we use the same data for all toggles.
  const chartData = sourcesData;

  return (
    <TooltipProvider>
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-60 md:h-72 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {chartData.map((source) => (
                <div key={source.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: source.color }} />
                    <span className="text-foreground/80">{source.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground tabular-nums">$ {source.value}</span>
                    <span className="text-muted-foreground tabular-nums w-10 text-right">
                      {source.percentage}%
                      {source.name === 'Dribbble' && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-block ml-1 cursor-help"></span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="bg-slate-800 text-white py-1 px-2 rounded text-xs">
                            <p>from leads total</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <ToggleGroup
              type="single"
              value={activeToggle}
              onValueChange={(value) => { if (value) setActiveToggle(value); }}
              className="border border-border rounded-md p-0.5 bg-muted/50"
            >
              <ToggleGroupItem value="leadsCame" aria-label="Leads Came" className="px-3 py-1.5 text-xs data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-sm rounded-sm">
                Leads came
              </ToggleGroupItem>
              <ToggleGroupItem value="leadsConverted" aria-label="Leads Converted" className="px-3 py-1.5 text-xs data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-sm rounded-sm">
                Leads Converted
              </ToggleGroupItem>
              <ToggleGroupItem value="totalDealsSize" aria-label="Total Deals Size" className="px-3 py-1.5 text-xs data-[state=on]:bg-background data-[state=on]:text-primary data-[state=on]:shadow-sm rounded-sm">
                Total deals size
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SourcesPieChart;
