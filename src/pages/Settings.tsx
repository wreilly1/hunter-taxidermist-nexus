
import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, User, Bell, Shield, FileText, Palette } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessName: user?.businessName || '',
    address: user?.address || '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    jobStatusUpdates: true,
    paymentReminders: true,
    overdueInvoices: true,
    weeklyReports: false,
  });

  // Business settings
  const [businessSettings, setBusiness] = useState({
    taxRate: '8.5',
    defaultDiscount: '0',
    processorFeeRate: '2.9',
    invoiceTerms: '30',
    businessHours: 'Monday - Friday: 8AM - 6PM',
    specialInstructions: '',
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally make an API call to update profile
    console.log('Updating profile:', profileData);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationSave = () => {
    // Here you would normally make an API call to update notification preferences
    console.log('Updating notifications:', notifications);
    
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleBusinessSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would normally make an API call to update business settings
    console.log('Updating business settings:', businessSettings);
    
    toast({
      title: "Settings Updated",
      description: "Your business settings have been saved successfully.",
    });
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <SettingsIcon className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Account Settings</h2>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Business</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={profileData.businessName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="btn-primary">
                    Save Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBusinessSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        step="0.1"
                        value={businessSettings.taxRate}
                        onChange={(e) => setBusiness(prev => ({ ...prev, taxRate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="processorFeeRate">Processor Fee Rate (%)</Label>
                      <Input
                        id="processorFeeRate"
                        type="number"
                        step="0.1"
                        value={businessSettings.processorFeeRate}
                        onChange={(e) => setBusiness(prev => ({ ...prev, processorFeeRate: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="defaultDiscount">Default Discount (%)</Label>
                      <Input
                        id="defaultDiscount"
                        type="number"
                        step="0.1"
                        value={businessSettings.defaultDiscount}
                        onChange={(e) => setBusiness(prev => ({ ...prev, defaultDiscount: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="invoiceTerms">Invoice Terms (days)</Label>
                      <Input
                        id="invoiceTerms"
                        type="number"
                        value={businessSettings.invoiceTerms}
                        onChange={(e) => setBusiness(prev => ({ ...prev, invoiceTerms: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="businessHours">Business Hours</Label>
                    <Input
                      id="businessHours"
                      value={businessSettings.businessHours}
                      onChange={(e) => setBusiness(prev => ({ ...prev, businessHours: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="specialInstructions">Default Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      value={businessSettings.specialInstructions}
                      onChange={(e) => setBusiness(prev => ({ ...prev, specialInstructions: e.target.value }))}
                      rows={3}
                      placeholder="Default instructions that appear on new jobs..."
                    />
                  </div>
                  
                  <Button type="submit" className="btn-primary">
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="jobStatusUpdates">Job Status Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified when job status changes</p>
                    </div>
                    <Switch
                      id="jobStatusUpdates"
                      checked={notifications.jobStatusUpdates}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, jobStatusUpdates: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paymentReminders">Payment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Reminders for upcoming due dates</p>
                    </div>
                    <Switch
                      id="paymentReminders"
                      checked={notifications.paymentReminders}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, paymentReminders: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="overdueInvoices">Overdue Invoice Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alerts for overdue payments</p>
                    </div>
                    <Switch
                      id="overdueInvoices"
                      checked={notifications.overdueInvoices}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, overdueInvoices: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Weekly business summary reports</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                    />
                  </div>
                </div>
                
                <Button onClick={handleNotificationSave} className="btn-primary">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Enter current password" />
                  </div>
                  
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  
                  <div>
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                  
                  <Button className="btn-primary">
                    Update Password
                  </Button>
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
