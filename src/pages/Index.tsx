import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import PageHeader from '@/components/Dashboard/PageHeader';
import FunnelCountCard from '@/components/Dashboard/FunnelCountCard';
import SourcesPieChart from '@/components/Dashboard/SourcesPieChart';
import LeadsTrackingChart from '@/components/Dashboard/LeadsTrackingChart';
import ReasonsLostGrid from '@/components/Dashboard/ReasonsLostGrid';
import OtherDataGrid from '@/components/Dashboard/OtherDataGrid';

/**
 * DashboardPage
 * 
 * This component serves as the main view for the Leads Dashboard Overview.
 * It utilizes the MainAppLayout to provide the overall page structure (sidebar and top header)
 * and arranges various dashboard widgets (cards, charts, grids) in the main content area.
 * 
 * The layout of the dashboard widgets is as follows:
 * 1. PageHeader: Displays navigation tabs (Sales/Leads) and a date range filter.
 * 2. FunnelCountCard & SourcesPieChart: Displayed side-by-side in a responsive grid.
 *    FunnelCountCard shows lead progression through stages.
 *    SourcesPieChart visualizes lead sources.
 * 3. LeadsTrackingChart: A full-width chart showing trends of closed won vs. lost leads.
 * 4. ReasonsLostGrid & OtherDataGrid: Displayed side-by-side, showcasing reasons for lost leads
 *    and other miscellaneous statistics.
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard">
      {/* 
        This main div acts as the container for all dashboard content sections.
        It uses a grid layout with a defined gap, as specified in Layout Requirements (mainContent.container).
        'auto-rows-min' ensures that rows only take up the minimum height required by their content.
      */}
      <div className="grid gap-6 auto-rows-min">
        
        {/* Section 1: Page Header with Tabs and Date Filter */}
        {/* PageHeader is a self-contained block and a direct child of the main content grid. */}
        <PageHeader />
        
        {/* Section 2: Funnel Metrics and Lead Sources */}
        {/* This div is a grid item itself, containing two cards arranged in a nested grid. */}
        {/* On large screens (lg), FunnelCountCard takes 2/5 and SourcesPieChart takes 3/5 of the width. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <FunnelCountCard className="lg:col-span-2" />
          <SourcesPieChart className="lg:col-span-3" />
        </div>

        {/* Section 3: Leads Tracking Chart */}
        {/* LeadsTrackingChart is a full-width block and a direct child of the main content grid. */}
        <LeadsTrackingChart />

        {/* Section 4: Lost Reasons and Other Statistics */}
        {/* This div is a grid item, containing two cards arranged in a nested grid. */}
        {/* On medium screens (md) and above, these cards are displayed side-by-side. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ReasonsLostGrid />
          <OtherDataGrid />
        </div>
        
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
