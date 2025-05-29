import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, PlusCircle } from 'lucide-react';

interface TopHeaderProps {
  pageTitle?: string;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  pageTitle = 'Dashboard',
  className,
}) => {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-10 flex h-[70px] items-center justify-between border-b bg-card px-6',
        'md:left-64', // Apply left margin only on md screens and up, assuming sidebar is present
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Deal</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
