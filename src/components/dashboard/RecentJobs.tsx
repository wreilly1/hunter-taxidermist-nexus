
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '../../types/models';
import { mockJobs, getClientById } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const RecentJobs = () => {
  const { user, hasRole } = useAuth();
  
  const getJobsForUser = () => {
    if (hasRole('admin')) return mockJobs;
    if (hasRole('hunter')) return mockJobs.filter(job => job.hunterId === user?.id);
    if (hasRole('taxidermist')) return mockJobs.filter(job => job.taxidermistId === user?.id);
    return [];
  };

  const jobs = getJobsForUser().slice(0, 5); // Show recent 5 jobs

  const getStatusBadgeClass = (status: string) => {
    const classes = {
      'RECEIVED': 'status-received',
      'IN_PROGRESS': 'status-in-progress',
      'FINISHED': 'status-finished',
      'DELIVERED': 'status-delivered'
    };
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => {
            const client = getClientById(job.clientId);
            return (
              <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{job.type}</p>
                    <Badge className={`status-badge ${getStatusBadgeClass(job.status)}`}>
                      {job.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {client?.firstName} {client?.lastName} • {job.species}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Due: {formatDate(job.dueDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${job.estimatedPrice}</p>
                </div>
              </div>
            );
          })}
          {jobs.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No recent jobs found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentJobs;
