
import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { User, Calendar, FileText, Users, Settings, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { user, logout, hasRole } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Calendar, roles: ['hunter', 'taxidermist', 'admin'] },
    { name: 'Clients', href: '/clients', icon: Users, roles: ['hunter', 'taxidermist', 'admin'] },
    { name: 'Jobs', href: '/jobs', icon: FileText, roles: ['hunter', 'taxidermist', 'admin'] },
    { name: 'Invoices', href: '/invoices', icon: FileText, roles: ['taxidermist', 'admin'] },
    { name: 'Settings', href: '/settings', icon: Settings, roles: ['hunter', 'taxidermist', 'admin'] },
  ];

  const visibleNavigation = navigation.filter(item => 
    item.roles.some(role => hasRole(role as any))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">T</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-semibold">TaxidermyPro</h1>
              <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {visibleNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-primary hover:bg-primary-50 transition-colors group"
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-primary" />
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t bg-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
