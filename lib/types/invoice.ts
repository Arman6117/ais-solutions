// lib/types/types.ts

import { Types } from 'mongoose';

// ==========================================
// 1. CORE ENTITY TYPES (Student, Course, Batch)
// ==========================================

// Basic Course Info (used inside Batch)
export interface CourseInfo {
  _id: Types.ObjectId | string;
  courseName: string;
}

// Module Info (used inside Batch)
export interface ModuleInfo {
  id: {
    _id: Types.ObjectId | string;
    name: string;
    price: number;
  };
}

// Populated Batch (used inside Student)
export interface PopulatedBatch {
  _id: Types.ObjectId | string;
  name: string;
  courseId: CourseInfo;
  modules: ModuleInfo[];
}

// Batch Info Structure (as stored in Student document)
export interface BatchInfo {
  batchId: PopulatedBatch;
  mode: 'online' | 'offline' | 'hybrid';
  enrolledAt: Date | string;
  _id: Types.ObjectId | string;
}

// Student Course Structure
export interface StudentCourse {
  courseId: Types.ObjectId | string;
  moduleId: (Types.ObjectId | string)[];
  approvedAt: Date | string;
  isApproved: boolean;
  _id: Types.ObjectId | string;
}

// THE MAIN STUDENT TYPE
export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  courses: StudentCourse[];
  batches: BatchInfo[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// ==========================================
// 2. INVOICE DOCUMENT TYPES (Database Schema)
// ==========================================

// Course details inside an Invoice document
export interface CourseDetails {
  courseId: Types.ObjectId | string;
  modules: (Types.ObjectId | string)[];
  totalFees: number;
  remainingFees: number;
  amountPaid: number;
  status: 'Paid' | 'Pending' | 'Due' | 'Overdue';
  mode: 'online' | 'offline' | 'hybrid';
  dueDate?: Date | string;
}

// Payment history entry inside an Invoice document
export interface PaymentHistory {
  amount: number;
  courseName: string;
  modules: (Types.ObjectId | string)[];
  totalFees?: number;
  notes?: string;
  mode: 'Cash' | 'Card' | 'UPI' | 'Other';
  dueDate?: Date | string;
  createdAt?: Date | string;
  _id?: Types.ObjectId | string;
}

// Base Invoice Document Interface
export interface InvoiceDocBase {
  _id: Types.ObjectId | string;
  studentId: Types.ObjectId | string;
  totalFees: number;
  remainingFees: number;
  amountPaid: number;
  courseDetails: CourseDetails[];
  paymentHistory: PaymentHistory[];
  status: 'Paid' | 'Pending' | 'Due' | 'Overdue';
  createdAt?: Date | string;
  updatedAt?: Date | string;
  __v?: number;
}

// Invoice Document with Populated Student
export interface InvoiceDocPopulated extends Omit<InvoiceDocBase, 'studentId'> {
  studentId: Student;
}

// ==========================================
// 3. API RESPONSE TYPES (Frontend Consumption)
// ==========================================

// Formatted Module for Frontend
export interface FormattedModule {
  name: string;
  price: number;
  amount?: number;
  status?: string;
}

// Formatted Course for Frontend
export interface FormattedCourse {
  courseName: string;
  courseMode: "offline" | "hybrid" | "online";
  batchName: string;
  modules: FormattedModule[];
  totalFees: number;
  amountPaid: number;
  remainingFees: number;
  dueDate: string  | null;
  status: string;
  paymentProgress: string;
}

// Formatted Payment for Frontend
export interface FormattedPayment {
  amount: number;
  courseName: string;
  modules: string | string[];
  paymentDate: Date | string;
  dueDate: Date | string | null;
  notes: string | null;
  mode: string;
}

// Main Data Object for Invoice Details Page
export interface InvoiceData {
  student: {
    name: string;
    email: string;
    phone: string;
  };
  summary: {
    totalFees: number;
    amountPaid: number;
    remainingFees: number;
    paymentProgress: string;
  };
  courses: FormattedCourse[];
  paymentHistory: FormattedPayment[];
}

// Standard API Response Wrapper
export interface InvoiceResponse {
  success: boolean;
  message?: string;
  data?: InvoiceData;
}

// ==========================================
// 4. FORM & COMPONENT PROPS
// ==========================================

export interface CreateInvoicePayload {
  invoiceID: string;
  courseName: string;
  courseId: string;
  amountPaid: number;
  paymentMode: "UPI" | "Cash" | "Card" | "Other";
  dueDate?: string;
  notes?: string;
}

export interface InvoiceTable {
  studentName: string;
  email: string;
  course: string[];
  amountPaid: number;
  totalFees: number;
  mode: "UPI" | "Cash" | "Card" | "Other";
  status: "Due" | "Paid" | "Partially Paid" | "Overdue";
  createdAt: string;
}
