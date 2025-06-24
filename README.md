
# TaxidermyPro CRM

A specialized Customer Relationship Management system designed for hunters and taxidermists to manage clients, jobs, invoicing, and documents.

## 🎯 Features

### Multi-Role Authentication
- **Hunters**: Manage their clients and track submitted trophies
- **Taxidermists**: Handle workshop operations, job tracking, and billing
- **Administrators**: Full system oversight and user management

### Core Functionality
- **Client Management**: Complete CRUD operations with search capabilities
- **Job Tracking**: Timeline view with automated status change history
- **Invoicing System**: Auto-generation, partial payments, taxes, and fees
- **Document Management**: Drag-and-drop uploads for photos, licenses, receipts
- **Role-Based Access**: Users only see data relevant to their role

## 🚀 Quick Start

### Demo Accounts
The application comes with pre-configured demo accounts:

- **Hunter**: `hunter@demo.com` / `demo123`
- **Taxidermist**: `taxidermist@demo.com` / `demo123`  
- **Admin**: `admin@demo.com` / `demo123`

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗 Architecture Overview

### Tech Stack Decisions
- **React 18 + TypeScript**: Type-safe, component-based UI development
- **Tailwind CSS**: Rapid styling with consistent design system
- **React Router**: Client-side routing with protected routes
- **Context API**: Simple state management for authentication
- **Shadcn/UI**: Pre-built, accessible component library

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components (shadcn)
├── contexts/           # React contexts for state management
├── data/              # Mock data and utilities
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Route components
└── types/             # TypeScript type definitions
```

### Authentication & Authorization
- **Session Management**: localStorage-based with automatic persistence
- **Role-Based Access**: Component-level and route-level protection
- **Route Guards**: Automatic redirection based on authentication status

## 📊 Data Models

### Core Entities
```typescript
// User roles and authentication
type UserRole = 'hunter' | 'taxidermist' | 'admin';

// Job workflow status
type JobStatus = 'RECEIVED' | 'IN_PROGRESS' | 'FINISHED' | 'DELIVERED';

// Business entities
interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  address?: string;
  hunterId?: string;
  taxidermistId?: string;
}

interface Job {
  id: string;
  clientId: string;
  type: string;          // "Deer Mount", "Turkey Mount", etc.
  species: string;
  status: JobStatus;
  dropOffDate: Date;
  dueDate: Date;
  estimatedPrice: number;
  specialInstructions?: string;
}

interface Invoice {
  id: string;
  jobId: string;
  subtotal: number;
  tax: number;
  fees: number;
  discount: number;
  total: number;
  balance: number;
  depositRequired: number;
  depositPaid: number;
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Saddle Brown (#8B4513) - Traditional, earthy
- **Secondary**: Forest Green (#2D5016) - Natural, outdoorsy
- **Accent**: Peru (#CD853F) - Warm, welcoming

### Typography
- **Display**: Playfair Display (elegant headings)
- **Body**: Inter (clean, readable interface text)

### Component Philosophy
- **Accessibility First**: All components follow WCAG guidelines
- **Mobile Responsive**: Tailwind's responsive utilities throughout
- **Consistent Spacing**: 4px base unit system
- **Hover States**: Subtle animations and feedback

## 🔮 MVP Scope & Future Enhancements

### Current MVP Includes
- ✅ Multi-role authentication system
- ✅ Basic client management
- ✅ Job status tracking
- ✅ Invoice generation and payment tracking
- ✅ Role-based navigation and data filtering
- ✅ Responsive dashboard design

### Planned Enhancements
- 📋 Advanced job workflow management
- 📧 Email notifications and reminders
- 📁 Cloud document storage integration
- 💳 Payment processor integration (Stripe)
- 📊 Advanced reporting and analytics
- 📱 Mobile app companion
- 🔄 Real-time updates via WebSocket
- 🗄 Database migration from mock data

## 🤝 Contributing

This is an MVP demonstration. For production use, consider:

1. **Backend Integration**: Replace mock data with real API
2. **Database Setup**: PostgreSQL with Prisma ORM
3. **Authentication**: JWT tokens with refresh mechanism  
4. **File Storage**: AWS S3 or similar cloud storage
5. **Payment Processing**: Stripe or Square integration
6. **Email Service**: SendGrid or similar for notifications

## 📄 License

MIT License - feel free to use this as a starting point for your own CRM system.

---

**TaxidermyPro** - Bringing the hunting and taxidermy communities together through better management tools.
