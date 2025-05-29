import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  UserCircle2,
  FileText,
  FileSpreadsheet,
  ShoppingBag,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  User,
  CircleDot, // Generic logo placeholder
  ChevronDown // Example if needed for collapsibles, not used here directly
} from 'lucide-react';

// Define icon mapping type
// This ensures that icon names are valid Lucide icon keys if we were to dynamically map them.
// For this implementation, icons are directly used.
type IconName = keyof typeof import('lucide-react');

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#' },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: UserCircle2, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#' },
  { id: 'invoices', label: 'Invoices', icon: FileSpreadsheet, href: '#' },
  { id: 'items', label: 'Items', icon: ShoppingBag, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#' },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const auxNavItems: NavItem[] = [
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'profile', label: 'Profile', icon: User, href: '#' }, // Assuming the second 'Help' in image is Profile
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [activeItemName, setActiveItemName] = React.useState<string>('dashboard');

  const renderNavItem = (item: NavItem) => {
    const IconComponent = item.icon;
    const isActive = item.id === activeItemName;
    return (
      <a
        key={item.id}
        href={item.href}
        onClick={(e) => {
          e.preventDefault(); // Prevent navigation for demo
          setActiveItemName(item.id);
        }}
        className={cn(
          'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
        )}
      >
        <IconComponent className={cn('mr-3 h-5 w-5', isActive ? 'text-sidebar-accent-foreground' : 'text-sidebar-foreground/80')} />
        {item.label}
      </a>
    );
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar',
        className
      )}
    >
      <div className="flex items-center h-[70px] px-6 border-b border-sidebar-border">
        <CircleDot className="h-8 w-8 text-primary mr-2" /> 
        <h1 className="text-xl font-semibold text-sidebar-primary">Leads Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {mainNavItems.map(renderNavItem)}
      </nav>
      <div className="mt-auto border-t border-sidebar-border p-4 space-y-1">
        {auxNavItems.map(renderNavItem)}
      </div>
    </aside>
  );
};

export default Sidebar;
