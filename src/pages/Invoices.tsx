
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '../contexts/AuthContext';
import { mockInvoices, getJobById, getClientById } from '../data/mockData';
import { FileText, Search, Plus, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import PaymentForm from '../components/invoices/PaymentForm';

const Invoices = () => {
  const { user, hasRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('');

  // Filter invoices based on user role and search term
  const filteredInvoices = mockInvoices.filter(invoice => {
    const job = getJobById(invoice.jobId);
    const client = job ? getClientById(job.clientId) : null;
    
    const matchesSearch = client ? 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    
    if (hasRole('admin')) return matchesSearch;
    if (hasRole('hunter') && job) return matchesSearch && job.hunterId === user?.id;
    if (hasRole('taxidermist') && job) return matchesSearch && job.taxidermistId === user?.id;
    
    return false;
  });

  const overdueInvoices = filteredInvoices.filter(invoice => 
    invoice.balance > 0 && new Date(invoice.dueDate) < new Date()
  );

  const getInvoiceStatus = (invoice: any) => {
    if (invoice.balance <= 0) return { label: 'Paid', color: 'bg-green-100 text-green-800' };
    if (new Date(invoice.dueDate) < new Date()) return { label: 'Overdue', color: 'bg-red-100 text-red-800' };
    return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
  };

  const handleAddPayment = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setIsPaymentDialogOpen(true);
  };

  return (
    <DashboardLayout title="Invoices">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Invoice Management</h2>
          </div>
          {overdueInvoices.length > 0 && (
            <Badge className="bg-red-100 text-red-800">
              <AlertCircle className="h-3 w-3 mr-1" />
              {overdueInvoices.length} Overdue
            </Badge>
          )}
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Search Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by client name or invoice ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Outstanding</p>
                  <p className="text-lg font-semibold">
                    ${filteredInvoices.reduce((sum, inv) => sum + inv.balance, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Invoices</p>
                  <p className="text-lg font-semibold">{filteredInvoices.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-lg font-semibold">{overdueInvoices.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-lg font-semibold">
                    {filteredInvoices.filter(inv => 
                      new Date(inv.createdAt).getMonth() === new Date().getMonth()
                    ).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoices Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const job = getJobById(invoice.jobId);
                  const client = job ? getClientById(job.clientId) : null;
                  const status = getInvoiceStatus(invoice);
                  
                  return (
                    <TableRow key={invoice.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">#{invoice.id.slice(-6)}</TableCell>
                      <TableCell>
                        {client ? `${client.firstName} ${client.lastName}` : 'Unknown'}
                      </TableCell>
                      <TableCell>
                        {job ? `${job.type} - ${job.species}` : 'Unknown Job'}
                      </TableCell>
                      <TableCell>${invoice.total.toLocaleString()}</TableCell>
                      <TableCell className={invoice.balance > 0 ? 'text-red-600 font-medium' : 'text-green-600'}>
                        ${invoice.balance.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {invoice.balance > 0 && (
                            <Button 
                              size="sm" 
                              onClick={() => handleAddPayment(invoice.id)}
                            >
                              Add Payment
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Payment</DialogTitle>
            </DialogHeader>
            <PaymentForm 
              invoiceId={selectedInvoiceId}
              onSuccess={() => setIsPaymentDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>

        {filteredInvoices.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No invoices found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'Invoices will appear here when jobs are created'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Invoices;
