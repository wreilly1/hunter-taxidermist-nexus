
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockClients } from '../../data/mockData';

interface JobFormProps {
  onSuccess: () => void;
}

const JobForm = ({ onSuccess }: JobFormProps) => {
  const { user, hasRole } = useAuth();
  const { toast } = useToast();
  
  // Filter clients based on user role
  const availableClients = mockClients.filter(client => {
    if (hasRole('admin')) return true;
    if (hasRole('hunter')) return client.hunterId === user?.id;
    if (hasRole('taxidermist')) return client.taxidermistId === user?.id;
    return false;
  });

  const [formData, setFormData] = useState({
    clientId: '',
    type: '',
    species: '',
    description: '',
    dropOffDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    estimatedPrice: '',
    specialInstructions: '',
  });

  const jobTypes = [
    'Shoulder Mount',
    'Full Body Mount',
    'European Mount',
    'Skin & Tan',
    'Habitat Display',
    'Skull Cleaning',
    'Antler Mounting',
  ];

  const commonSpecies = [
    'White-tailed Deer',
    'Elk',
    'Moose',
    'Wild Turkey',
    'Duck',
    'Goose',
    'Bear',
    'Wild Boar',
    'Antelope',
    'Mule Deer',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.clientId || !formData.type || !formData.species || !formData.dueDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally make an API call to create the job
    console.log('Creating job:', formData);
    
    toast({
      title: "Job Created",
      description: `${formData.type} for ${formData.species} has been created successfully.`,
    });
    
    onSuccess();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="clientId">Client *</Label>
        <Select value={formData.clientId} onValueChange={(value) => handleInputChange('clientId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            {availableClients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Job Type *</Label>
          <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="species">Species *</Label>
          <Select value={formData.species} onValueChange={(value) => handleInputChange('species', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select species" />
            </SelectTrigger>
            <SelectContent>
              {commonSpecies.map((species) => (
                <SelectItem key={species} value={species}>
                  {species}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={2}
          placeholder="Brief description of the specimen..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dropOffDate">Drop-off Date</Label>
          <Input
            id="dropOffDate"
            type="date"
            value={formData.dropOffDate}
            onChange={(e) => handleInputChange('dropOffDate', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="dueDate">Due Date *</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="estimatedPrice">Estimated Price ($)</Label>
        <Input
          id="estimatedPrice"
          type="number"
          step="0.01"
          value={formData.estimatedPrice}
          onChange={(e) => handleInputChange('estimatedPrice', e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div>
        <Label htmlFor="specialInstructions">Special Instructions</Label>
        <Textarea
          id="specialInstructions"
          value={formData.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
          rows={3}
          placeholder="Any special instructions or customer preferences..."
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="btn-primary">
          Create Job
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
