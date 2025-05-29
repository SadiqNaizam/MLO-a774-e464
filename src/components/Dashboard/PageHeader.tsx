import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('last 6 months');

  const periodOptions: string[] = [
    'last 6 months' as const,
    'last 3 months' as const,
    'last 30 days' as const,
    'last 7 days' as const,
    'all time' as const,
  ];

  return (
    <div className={cn('flex items-center justify-between pb-4 border-b', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
      </Tabs>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 text-muted-foreground">
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
  );
};

export default PageHeader;
