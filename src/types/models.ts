
export type JobStatus = 'RECEIVED' | 'IN_PROGRESS' | 'FINISHED' | 'DELIVERED';
export type PaymentMethod = 'CASH' | 'CHECK' | 'CARD' | 'BANK_TRANSFER';
export type DocumentType = 'LICENSE' | 'PHOTO' | 'RECEIPT' | 'OTHER';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  hunterId?: string;
  taxidermistId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  clientId: string;
  client?: Client;
  type: string; // "Deer Mount", "Turkey Mount", etc.
  species: string;
  status: JobStatus;
  description?: string;
  dropOffDate: Date;
  dueDate: Date;
  completedDate?: Date;
  estimatedPrice: number;
  specialInstructions?: string;
  hunterId?: string;
  taxidermistId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  jobId: string;
  job?: Job;
  subtotal: number;
  tax: number;
  fees: number;
  discount: number;
  total: number;
  balance: number;
  depositRequired: number;
  depositPaid: number;
  issuedDate: Date;
  dueDate: Date;
  paidInFull: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoice?: Invoice;
  amount: number;
  method: PaymentMethod;
  processorFee: number;
  notes?: string;
  timestamp: Date;
  processedBy: string;
}

export interface Document {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  type: DocumentType;
  clientId?: string;
  jobId?: string;
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}

export interface JobStatusHistory {
  id: string;
  jobId: string;
  fromStatus?: JobStatus;
  toStatus: JobStatus;
  notes?: string;
  changedBy: string;
  changedAt: Date;
}
