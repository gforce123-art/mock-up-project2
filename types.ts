export type Page =
  | 'car_management'
  | 'sales_management'
  | 'customer_management'
  | 'payment_management'
  | 'communication'
  | 'reporting'
  | 'system_maintenance';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: 'Available' | 'Sold' | 'Pending';
  imageUrl: string;
}

export interface Installment {
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paymentDate?: string;
}

export interface Sale {
  id: number;
  carId: number;
  carDescription: string;
  customerId: number;
  customerName: string;
  saleDate: string;
  salePrice: number;
  paymentStatus: 'Fully Paid' | 'Deposit Paid' | 'Partial Payment' | 'Pending Deposit' | 'Overdue' | 'Cancelled';
  depositAmount?: number;
  depositDate?: string;
  installments?: Installment[];
}

export interface ReportData {
  name: string;
  value: number;
}

export interface Customer {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Message {
  id: number;
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  timestamp: string; // ISO string format
  status: 'new' | 'read' | 'replied' | 'archived';
}