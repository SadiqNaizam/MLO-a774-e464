import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonLost {
  id: string;
  percentage: number;
  reason: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'p_unclear1', percentage: 40, reason: 'The proposal is unclear' },
  { id: 'venture', percentage: 20, reason: 'However venture pursuit' },
  { id: 'other', percentage: 10, reason: 'Other' },
  { id: 'p_unclear2', percentage: 30, reason: 'The proposal is unclear' },
];

interface ReasonsLostGridProps {
  className?: string;
}

const ReasonsLostGrid: React.FC<ReasonsLostGridProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {reasonsLostData.map((item) => (
            <div key={item.id}>
              <p className="text-3xl sm:text-4xl font-bold text-foreground">{item.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsLostGrid;
