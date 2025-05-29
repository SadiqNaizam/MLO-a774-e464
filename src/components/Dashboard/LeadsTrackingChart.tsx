import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown, Dot } from 'lucide-react';
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 60, closedLost: 85 },
  { month: 'April', closedWon: 40, closedLost: 20 },
  { month: 'May', closedWon: 70, closedLost: 95 },
  { month: 'June', closedWon: 80, closedLost: 5 },
  { month: 'July', closedWon: 65, closedLost: 40 },
  { month: 'August', closedWon: 30, closedLost: 90 },
];

const totalClosed = 680;
const totalLost = 70;

interface LeadsTrackingChartProps {
  className?: string;
}

const CustomTooltipContent = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded shadow-lg text-sm">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} style={{ color: pld.color }} className="flex items-center">
            <Dot style={{ color: pld.stroke }} className="mr-1" />
            {pld.name}: {pld.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LeadsTrackingChart: React.FC<LeadsTrackingChartProps> = ({ className }) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('last 6 months');
  const periodOptions: string[] = [
    'last 6 months' as const,
    'last 3 months' as const,
    'last 30 days' as const,
    'last 7 days' as const,
  ];

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className='mb-4 sm:mb-0'>
                <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
                <div className="mt-1 text-sm text-muted-foreground">
                    <span className="text-3xl font-bold text-foreground">{totalClosed}</span> total closed
                    <span className="ml-4 text-3xl font-bold text-foreground">{totalLost}</span> total lost
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm w-full sm:w-auto">
                    <CalendarDays className="h-4 w-4" />
                    <span>{selectedPeriod}</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                {periodOptions.map((period) => (
                    <DropdownMenuItem key={period} onClick={() => setSelectedPeriod(period)}>
                    {period}
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              domain={[0, 'dataMax + 10']}
            />
            <Tooltip content={<CustomTooltipContent />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey="closedWon" name="Closed won" strokeWidth={2} stroke="#2DD4BF" fillOpacity={1} fill="url(#colorClosedWon)" dot={{ r: 4, fill: '#2DD4BF', strokeWidth: 2, stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#2DD4BF', stroke: 'hsl(var(--card))' }} />
            <Area type="monotone" dataKey="closedLost" name="Closed lost" strokeWidth={2} stroke="#F87171" fillOpacity={1} fill="url(#colorClosedLost)" dot={{ r: 4, fill: '#F87171', strokeWidth: 2, stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, fill: '#F87171', stroke: 'hsl(var(--card))' }} />
            
            <Legend 
                verticalAlign="bottom" 
                align="left" 
                iconType="square"
                iconSize={10}
                wrapperStyle={{ paddingLeft: '10px', paddingTop: '20px' }}
                formatter={(value, entry) => (
                    <span style={{ color: 'hsl(var(--muted-foreground))', marginLeft: '4px' }}>{value}</span>
                )}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
