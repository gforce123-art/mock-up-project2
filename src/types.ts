export type Page =
  | 'dashboard'
  | 'car_management'
  | 'sales_management'
  | 'customer_management'
  | 'quality_control'
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