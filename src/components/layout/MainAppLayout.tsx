import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageTitle?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  className,
  pageTitle = 'Dashboard',
}) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Sidebar />
      <TopHeader pageTitle={pageTitle} />
      {/* Main content area pushed to the right of the sidebar and below the header */}
      {/* The 'ml-64' applies for medium screens and up, matching TopHeader's 'md:left-64' logic */}
      {/* For smaller screens, sidebar might be hidden or overlay, which needs responsive handling not specified here */}
      <div className="md:ml-64">
        {/* mt-[70px] pushes content below the fixed header */}
        {/* The scrollable area needs a defined height to make overflow-y-auto work. */}
        {/* height: 'calc(100vh - 70px)' ensures it fits the remaining viewport height. */}
        <main 
          className="mt-[70px] p-6 overflow-y-auto min-w-0"
          style={{ height: 'calc(100vh - 70px)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
