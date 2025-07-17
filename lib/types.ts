import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export type Column<T> = {
  id: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
};

export type FilterOption = {
  label: string;
  value: string;
};
export type Course = {
  id: string;
  name: string;
  description: string;
  discount: number;
  createdAt: string;
  students: number;
  batches: number;
  batchesCompleted: number;
  price: number;
  batchesName: string[];
  modules: string[];
  instructors: string[];
};

export type DummyBatches = {
  id: number | string;
  name: string;
  schedule: string;
  time: string;
  students: number;
  startDate: string;
  endDate: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  whatsappLink?: string;
};

export type DummyInstructors = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  email: string;
};

export type DummyStudent = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  batchId: string;
  isApproved: boolean;
  joinedAt: string;
  modules: string[];
  courses: Course[];
  feesStatus: "paid" | "unpaid";
  totalFeePaid: number;
  feesRemaining: number;
  refCoins?: number;
  gender: string;
  batches: string[];
};

export type DummyModules = {
  id: string;
  name: string;
  createdAt: string;
  description: string;
  course: string[];
  price: number;
  discount: number;
  offerPrice: number;
  rating: number;
  status: "Ongoing" | "Upcoming" | "Completed";
};

export type Mode = "online" | "offline" | "hybrid";
export type BatchType = "weekend" | "weekdays";

export type Offer = {
  id: string;
  title: string;
  description: string;
  discountType: "percentage" | "flat"; // strict type
  discountValue: number;
  validFrom: string;
  validTill: string;
  applicableCourses: string[];
  isActive: boolean;
  image: string;
};

export type Session = {
  id: string;
  name: string;
  date: Date;
  module: string;
  chapter: string;
  instructor: string;
};
export type InvoiceStatus = "Paid" | "Due" | "Overdue";
export type PaymentMode = "cash" | "upi" | "card";

export type InvoiceTable = {
  id: string;
  studentName: string;
  email: string;
  courseNames: string[]; // ✅ Updated to array
  amountPaid: number;
  totalFee: number;
  paymentMode: "cash" | "upi" | "card";
  createdAt: string;
  status: "Paid" | "Due" | "Overdue";
  notes?: string;
  dueDate?: string;
};

// type BatchType = 'online' | 'hybrid' | 'offline';

interface Module {
  id: number;
  name: string;
  price: number;
  paid: boolean;
}

export type CourseInvoice = {
  id: number;
  name: string;
  batch: string;
  batchType: Mode;
  totalFees: number;
  paidFees: number;
  remainingFees: number;
  modules: Module[];
  nextDueDate: string | null;
};

export type Invoice = {
  id: number;
  date: string;
  amount: number;
  course: string;
  module?: string;
  paymentMethod: PaymentMode;
  notes: string;
  dueDate?: string;
};

export type Student = {
  id: number;
  name: string;
  email: string;
  phone: string;
  courses: CourseInvoice[];
  invoiceHistory: Invoice[];
};
// Props interfaces

export type DummyInstructor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  modules: string[];
  batches: string[];
};

//!Final Types
export type prStudentCourse = {
  courseId: string;
  moduleId: string[];
  approvedAt: Date | null;
  isApproved: boolean;
};

export type prBatch  = {
  id: string;
  name: string;
  schedule: string;
  time: string;
  students: number;
  startDate: Date | null;
  endDate: Date | null;
  status: "Ongoing" | "Upcoming" | "Completed";
  whatsappLink?: string;
  type: Mode;
  typeOfBatch: BatchType;
}
export type prStudent = {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  gender: string;
  courses: prStudentCourse[];
  batchId: string[];
  invoiceId: string[];
};

export type prChapter = {
  id: string;
  name: string;
  description: string;
  moduleId: string;
};
export type prModule = {
  _id:string;
  name: string;
  description: string;
  price: number;
  discount: number;
  offerPrice?: number
  rating: number;
  syllabusLink?: string;
  syllabusLabel?: string;
  chapters: ChapterInput[];
  courseId: string[];
  batchId: string[];
  instructors?: string[];
  createdAt: string;
};
export type prInstructors = {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  phone: string;
  modules: prModule[];
  batches: string[];
  rating?: number;
};

export type CourseTable = {
  _id: string;
  courseName: string;
  createdAt: string;
  coursePrice: number;
  courseDiscount: number;
  courseOfferPrice: number;
  numberOfStudents: number;
};
type ContentTopic = {
  id: number;
  title: string;
  description: string;
};

export type ChapterInput = {
  id: number;
  name: string;
  description: string;
  topics: ContentTopic[];
};
export type prCourse = {
  _id: string;
  courseName: string;
  numberOfStudents: number;
  courseDescription: string;
  syllabusLink: string;
  coursePrice: number;
  courseDiscount: number;
  courseOfferPrice: number;
  courseMode: Mode;
  courseThumbnail:string | File | null | undefined
  courseStartDate:string ;
  courseEndDate: string;
  modules: prModule[] |string[];
};
