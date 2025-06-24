
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { mockJobs, getClientById } from '../data/mockData';
import { JobStatus } from '../types/models';
import { Calendar, Plus, User, Clock } from 'lucide-react';
import JobForm from '../components/jobs/JobForm';
import JobCard from '../components/jobs/JobCard';

const Jobs = () => {
  const { user, hasRole } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter jobs based on user role
  const filteredJobs = mockJobs.filter(job => {
    if (hasRole('admin')) return true;
    if (hasRole('hunter')) return job.hunterId === user?.id;
    if (hasRole('taxidermist')) return job.taxidermistId === user?.id;
    return false;
  });

  // Group jobs by status
  const jobsByStatus = {
    RECEIVED: filteredJobs.filter(job => job.status === 'RECEIVED'),
    IN_PROGRESS: filteredJobs.filter(job => job.status === 'IN_PROGRESS'),
    FINISHED: filteredJobs.filter(job => job.status === 'FINISHED'),
    DELIVERED: filteredJobs.filter(job => job.status === 'DELIVERED'),
  };

  const statusConfig = {
    RECEIVED: { title: 'Received', color: 'bg-blue-100 border-blue-200', count: jobsByStatus.RECEIVED.length },
    IN_PROGRESS: { title: 'In Progress', color: 'bg-yellow-100 border-yellow-200', count: jobsByStatus.IN_PROGRESS.length },
    FINISHED: { title: 'Finished', color: 'bg-green-100 border-green-200', count: jobsByStatus.FINISHED.length },
    DELIVERED: { title: 'Delivered', color: 'bg-gray-100 border-gray-200', count: jobsByStatus.DELIVERED.length },
  };

  return (
    <DashboardLayout title="Jobs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Job Management</h2>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
              </DialogHeader>
              <JobForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="space-y-4">
              <Card className={`${config.color} border-2`}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {config.title}
                    <span className="text-sm font-normal bg-white px-2 py-1 rounded-full">
                      {config.count}
                    </span>
                  </CardTitle>
                </CardHeader>
              </Card>
              
              <div className="space-y-3">
                {jobsByStatus[status as JobStatus].map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
                
                {jobsByStatus[status as JobStatus].length === 0 && (
                  <Card className="border-2 border-dashed border-gray-200">
                    <CardContent className="p-6 text-center text-muted-foreground">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No jobs in {config.title.toLowerCase()}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Job Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{jobsByStatus.RECEIVED.length}</div>
                <div className="text-sm text-muted-foreground">New Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{jobsByStatus.IN_PROGRESS.length}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{jobsByStatus.FINISHED.length}</div>
                <div className="text-sm text-muted-foreground">Ready</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{jobsByStatus.DELIVERED.length}</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
