
import { Client, Job, Invoice, Payment, Document, JobStatusHistory } from '../types/models';

export const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Bob',
    lastName: 'Thompson',
    email: 'bob.thompson@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Street, Huntsville, TX 77340',
    hunterId: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.j@email.com',
    phone: '(555) 345-6789',
    address: '789 Pine Ave, Deer Park, TX 77536',
    hunterId: '1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    firstName: 'Lisa',
    lastName: 'Davis',
    phone: '(555) 456-7890',
    address: '321 Cedar Ln, Conroe, TX 77301',
    taxidermistId: '2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];

export const mockJobs: Job[] = [
  {
    id: '1',
    clientId: '1',
    type: 'Shoulder Mount',
    species: 'White-tailed Deer',
    status: 'IN_PROGRESS',
    description: '8-point buck, shoulder mount with oak base',
    dropOffDate: new Date('2024-01-20'),
    dueDate: new Date('2024-04-20'),
    estimatedPrice: 450,
    specialInstructions: 'Customer wants slightly turned head position',
    hunterId: '1',
    taxidermistId: '2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '2',
    clientId: '2',
    type: 'Full Body Mount',
    species: 'Wild Turkey',
    status: 'RECEIVED',
    description: 'Tom turkey, full strut position',
    dropOffDate: new Date('2024-02-10'),
    dueDate: new Date('2024-05-10'),
    estimatedPrice: 650,
    specialInstructions: 'Display quality, museum pose',
    hunterId: '1',
    taxidermistId: '2',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    clientId: '3',
    type: 'European Mount',
    species: 'Elk',
    status: 'FINISHED',
    description: 'Bull elk skull and antlers',
    dropOffDate: new Date('2024-01-05'),
    dueDate: new Date('2024-02-05'),
    completedDate: new Date('2024-01-30'),
    estimatedPrice: 200,
    taxidermistId: '2',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-30')
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    jobId: '1',
    subtotal: 450,
    tax: 36,
    fees: 15,
    discount: 0,
    total: 501,
    balance: 276,
    depositRequired: 225,
    depositPaid: 225,
    issuedDate: new Date('2024-01-20'),
    dueDate: new Date('2024-04-20'),
    paidInFull: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    jobId: '2',
    subtotal: 650,
    tax: 52,
    fees: 20,
    discount: 50,
    total: 672,
    balance: 672,
    depositRequired: 325,
    depositPaid: 0,
    issuedDate: new Date('2024-02-10'),
    dueDate: new Date('2024-05-10'),
    paidInFull: false,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceId: '1',
    amount: 225,
    method: 'CARD',
    processorFee: 7.25,
    notes: 'Deposit payment',
    timestamp: new Date('2024-01-20'),
    processedBy: '2'
  }
];

// Helper functions to get related data
export const getClientById = (id: string): Client | undefined => 
  mockClients.find(client => client.id === id);

export const getJobsByClientId = (clientId: string): Job[] =>
  mockJobs.filter(job => job.clientId === clientId);

export const getJobsByRole = (userId: string, role: 'hunter' | 'taxidermist'): Job[] => {
  const fieldName = role === 'hunter' ? 'hunterId' : 'taxidermistId';
  return mockJobs.filter(job => job[fieldName] === userId);
};

export const getInvoiceByJobId = (jobId: string): Invoice | undefined =>
  mockInvoices.find(invoice => invoice.jobId === jobId);

export const getPaymentsByInvoiceId = (invoiceId: string): Payment[] =>
  mockPayments.filter(payment => payment.invoiceId === invoiceId);
