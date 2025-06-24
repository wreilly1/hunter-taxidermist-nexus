
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import RecentJobs from '../components/dashboard/RecentJobs';
import { useAuth } from '../contexts/AuthContext';
import { mockJobs, mockClients, mockInvoices } from '../data/mockData';
import { Users, FileText, Calendar, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { user, hasRole } = useAuth();

  const getStatsForUser = () => {
    if (hasRole('admin')) {
      return {
        totalClients: mockClients.length,
        activeJobs: mockJobs.filter(job => ['RECEIVED', 'IN_PROGRESS'].includes(job.status)).length,
        completedJobs: mockJobs.filter(job => job.status === 'FINISHED').length,
        totalRevenue: mockInvoices.reduce((sum, inv) => sum + (inv.total - inv.balance), 0)
      };
    }
    
    if (hasRole('hunter')) {
      const hunterJobs = mockJobs.filter(job => job.hunterId === user?.id);
      const hunterClients = mockClients.filter(client => client.hunterId === user?.id);
      return {
        totalClients: hunterClients.length,
        activeJobs: hunterJobs.filter(job => ['RECEIVED', 'IN_PROGRESS'].includes(job.status)).length,
        completedJobs: hunterJobs.filter(job => job.status === 'FINISHED').length,
        pendingJobs: hunterJobs.filter(job => job.status === 'RECEIVED').length
      };
    }
    
    if (hasRole('taxidermist')) {
      const taxidermistJobs = mockJobs.filter(job => job.taxidermistId === user?.id);
      const taxidermistClients = mockClients.filter(client => client.taxidermistId === user?.id);
      const relatedInvoices = mockInvoices.filter(inv => 
        taxidermistJobs.some(job => job.id === inv.jobId)
      );
      return {
        totalClients: taxidermistClients.length,
        activeJobs: taxidermistJobs.filter(job => ['RECEIVED', 'IN_PROGRESS'].includes(job.status)).length,
        completedJobs: taxidermistJobs.filter(job => job.status === 'FINISHED').length,
        totalRevenue: relatedInvoices.reduce((sum, inv) => sum + (inv.total - inv.balance), 0)
      };
    }

    return { totalClients: 0, activeJobs: 0, completedJobs: 0, totalRevenue: 0 };
  };

  const stats = getStatsForUser();

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-primary-100">
            {hasRole('hunter') && "Track your hunting trophies and manage your taxidermy projects."}
            {hasRole('taxidermist') && "Manage your workshop and keep clients updated on their projects."}
            {hasRole('admin') && "Overview of all system activities and user management."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Clients"
            value={stats.totalClients}
            icon={Users}
            description="Active client relationships"
          />
          <StatsCard
            title="Active Jobs"
            value={stats.activeJobs}
            icon={Calendar}
            description="In progress or received"
          />
          <StatsCard
            title="Completed Jobs"
            value={stats.completedJobs}
            icon={FileText}
            description="Successfully finished"
          />
          {hasRole(['taxidermist', 'admin']) ? (
            <StatsCard
              title="Revenue Collected"
              value={`$${stats.totalRevenue?.toLocaleString() || 0}`}
              icon={DollarSign}
              description="Total payments received"
            />
          ) : (
            <StatsCard
              title="Pending Jobs"
              value={stats.pendingJobs || 0}
              icon={Calendar}
              description="Waiting to start"
            />
          )}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentJobs />
          
          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4">
              {hasRole(['hunter', 'admin']) && (
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <h4 className="font-medium">Add New Client</h4>
                  <p className="text-sm text-muted-foreground">Register a new hunting client</p>
                </div>
              )}
              {hasRole(['taxidermist', 'admin']) && (
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <h4 className="font-medium">Create New Job</h4>
                  <p className="text-sm text-muted-foreground">Start a new taxidermy project</p>
                </div>
              )}
              {hasRole(['taxidermist', 'admin']) && (
                <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <h4 className="font-medium">Generate Invoice</h4>
                  <p className="text-sm text-muted-foreground">Create billing for completed work</p>
                </div>
              )}
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <h4 className="font-medium">Upload Documents</h4>
                <p className="text-sm text-muted-foreground">Add photos, licenses, or receipts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
