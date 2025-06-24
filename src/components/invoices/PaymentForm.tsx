
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { mockInvoices } from '../../data/mockData';

interface PaymentFormProps {
  invoiceId: string;
  onSuccess: () => void;
}

const PaymentForm = ({ invoiceId, onSuccess }: PaymentFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const invoice = mockInvoices.find(inv => inv.id === invoiceId);
  const maxAmount = invoice?.balance || 0;
  
  const [formData, setFormData] = useState({
    amount: '',
    method: '',
    processorFee: '0',
    notes: '',
  });

  const paymentMethods = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Check',
    'Bank Transfer',
    'PayPal',
    'Venmo',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    
    // Basic validation
    if (!formData.amount || !formData.method || amount <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid amounts.",
        variant: "destructive",
      });
      return;
    }

    if (amount > maxAmount) {
      toast({
        title: "Amount Too High",
        description: `Payment amount cannot exceed the outstanding balance of $${maxAmount.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }

    // Here you would normally make an API call to record the payment
    console.log('Recording payment:', {
      invoiceId,
      ...formData,
      amount,
      recordedBy: user?.id,
    });
    
    toast({
      title: "Payment Recorded",
      description: `Payment of $${amount.toLocaleString()} has been recorded successfully.`,
    });
    
    // Reset form and close dialog
    setFormData({ amount: '', method: '', processorFee: '0', notes: '' });
    onSuccess();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!invoice) {
    return <div className="p-4 text-center text-muted-foreground">Invoice not found</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-muted/50 p-3 rounded-lg">
        <div className="text-sm text-muted-foreground mb-1">Outstanding Balance</div>
        <div className="text-lg font-semibold">${maxAmount.toLocaleString()}</div>
      </div>

      <div>
        <Label htmlFor="amount">Payment Amount *</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          max={maxAmount}
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <Label htmlFor="method">Payment Method *</Label>
        <Select value={formData.method} onValueChange={(value) => handleInputChange('method', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="processorFee">Processor Fee ($)</Label>
        <Input
          id="processorFee"
          type="number"
          step="0.01"
          value={formData.processorFee}
          onChange={(e) => handleInputChange('processorFee', e.target.value)}
          placeholder="0.00"
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="Optional payment notes..."
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" className="btn-primary">
          Record Payment
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
