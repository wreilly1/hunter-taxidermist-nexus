
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '../../types/models';
import { getClientById } from '../../data/mockData';
import { User, Calendar, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const client = getClientById(job.clientId);
  
  const statusColors = {
    RECEIVED: 'bg-blue-100 text-blue-800',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    FINISHED: 'bg-green-100 text-green-800',
    DELIVERED: 'bg-gray-100 text-gray-800',
  };

  return (
    <Card className="card-hover cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-sm">{job.type}</h4>
              <p className="text-xs text-muted-foreground">{job.species}</p>
            </div>
            <Badge className={`status-badge ${statusColors[job.status]} text-xs`}>
              {job.status.replace('_', ' ')}
            </Badge>
          </div>
          
          {client && (
            <div className="flex items-center text-xs text-muted-foreground">
              <User className="h-3 w-3 mr-1" />
              {client.firstName} {client.lastName}
            </div>
          )}
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            Due: {job.dueDate.toLocaleDateString()}
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <DollarSign className="h-3 w-3 mr-1" />
            ${job.estimatedPrice.toLocaleString()}
          </div>
          
          {job.specialInstructions && (
            <div className="text-xs text-muted-foreground border-t pt-2">
              <p className="truncate">{job.specialInstructions}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
