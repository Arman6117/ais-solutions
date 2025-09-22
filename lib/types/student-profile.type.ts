
export interface CourseDetails {
  _id: string;
  courseName: string;
  courseThumbnail: string;
  courseStartDate: string;
  courseEndDate: string;
}

export interface Course {
  _id: string; // Enrollment ID
  courseId: CourseDetails; // Nested course object
  moduleId: string[]; // Array of module IDs
  approvedAt: string;
  isApproved: boolean;
}

export interface Batch {
  _id: string;
  batchId: string;
  mode: 'offline' | 'online';
  enrolledAt: string;
}

export interface CourseDetail {
  courseId: string;
  modules: string[];
  totalFees: number;
  remainingFees: number;
  amountPaid: number;
  dueDate: string;
  status: 'Paid' | 'Partially Paid' | 'Unpaid';
  mode: 'offline' | 'online';
}

export interface Invoice {
  _id: string;
  courseDetails: CourseDetail[];
}

export interface StudentData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  profilePic: string;
  role: 'student';
  feeStatus: 'paid' | 'unpaid' | 'partially_paid';
  batches: Batch[];
  invoices: Invoice[];
  courses: Course[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EditableData {
  name: string;
  phone: string;
}

// Helper type for flattened course access
export interface FlattenedCourse extends CourseDetails {
  enrollmentId: string; // The root _id from Course
  moduleId: string[];
  approvedAt: string;
  isApproved: boolean;
}

// Helper type for course with fee information (combining course and invoice data)
export interface CourseWithFees extends Course {
  totalFees?: number;
  remainingFees?: number;
  amountPaid?: number;
  dueDate?: string;
  paymentStatus?: 'Paid' | 'Partially Paid' | 'Unpaid';
  mode?: 'offline' | 'online';
}