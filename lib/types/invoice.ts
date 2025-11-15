

// export interface CourseInfo {
//     _id:string
//     courseName: string;
//     courseMode: string;
//   }
  
import { Types } from 'mongoose';

// Module information from batch
export interface ModuleInfo {
  id: {
    _id: Types.ObjectId | string;
    name: string;
    price: number;
  };
}

// Course information with ObjectId reference
export interface CourseInfo {
  _id: Types.ObjectId | string;
  courseName: string;
}

// Populated batch information
export interface PopulatedBatch {
  _id: Types.ObjectId | string;
  name: string;
  courseId: CourseInfo;
  modules: ModuleInfo[];
}

// Batch info in student document
export interface BatchInfo {
  batchId: PopulatedBatch;
  mode: 'online' | 'offline' | 'hybrid';
  enrolledAt: Date | string;
  _id: Types.ObjectId | string;
}

// Student course enrollment
export interface StudentCourse {
  courseId: Types.ObjectId | string;
  moduleId: (Types.ObjectId | string)[];
  approvedAt: Date | string;
  isApproved: boolean;
  _id: Types.ObjectId | string;
}

// Student interface with populated data
export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  courses: StudentCourse[];
  batches: BatchInfo[];
}

// Course details in invoice
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

// Payment history entry
export interface PaymentHistory {
  amount: number;
  courseName: string;
  modules: (Types.ObjectId | string)[];
  totalFees?: number;
  notes?: string;
  mode: 'Cash' | 'Card' | 'UPI' | 'Bank Transfer';
  dueDate?: Date | string;
  createdAt?: Date | string;
  _id?: Types.ObjectId | string;
}

// Base invoice document
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
  __v?: number;
}

// Invoice with populated student
export interface InvoiceDocPopulated extends Omit<InvoiceDocBase, 'studentId'> {
  studentId: Student;
}

// Formatted response types
export interface FormattedModule {
  name: string;
  price: number;
}

export interface FormattedCourse {
  courseName: string;
  courseMode: string;
  batchName: string;
  modules: FormattedModule[];
  totalFees: number;
  amountPaid: number;
  remainingFees: number;
  dueDate: Date | string | null;
  status: string;
  paymentProgress: string;
}

export interface FormattedPayment {
  amount: number;
  courseName: string;
  modules: string;
  paymentDate: Date | string;
  dueDate: Date | string | null;
  notes: string | null;
  mode: string;
}

export interface InvoiceResponse {
  success: boolean;
  message?: string;
  data?: {
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
  };
}

  
  /*
   _id: 'AIS1',
    name: 'Arman Patel',
    email: 'armanp384@gmail.com',
    phone: '7058801089',
    batches: [
      {
        batchId: {
          _id: '68f7d7240fb1f5a29f5180d9',
          name: 'Batch 001',
          modules: [
            {
              id: '68f7d5870fb1f5a29f5180ae',
              name: 'Use State',
              startDate: '',
              endDate: '',
              instructor: [ '' ],
              status: 'Upcoming',
              numberOfStudent: 0
            }
          ],
          courseId: {
            _id: '68f7d6900fb1f5a29f5180c3',
            courseName: 'React'
          }
        },
        mode: 'offline',
        enrolledAt: '2025-11-12T14:49:48.126Z',
        _id: '69149e8cb64e0314a83e9898'
      }
    ],
    courses: [
      {
        courseId: {
          _id: '68f7d6900fb1f5a29f5180c3',
          courseName: 'React',
          courseMode: 'online'
        },
        moduleId: [ '68f7d5870fb1f5a29f5180ae' ],
        approvedAt: '2025-11-12T14:49:48.126Z',
        isApproved: true,
        _id: '69149a2eff197296d7e340c8'
      }
    ]
  }

  */
  // export interface StudentCourse {
  //   courseId: CourseInfo;
  // }
  
  export interface Student {
    _id: string;
    name: string;
    email: string;
    phone: string;
    courses: StudentCourse[];
    batches: BatchInfo[];
  }
  
  // export interface CourseDetails {
  //   courseId: string;
  //   modules: { name: string }[];
  //   totalFees: number;
  //   amountPaid: number;
  //   remainingFees: number;
  //   dueDate?: string;
  //   status: "Due" | "Paid" | "Overdue";
  //   mode: "offline" | "online" | "hybrid";
  // }
  
  // export interface PaymentHistory {
  //   amount: number;
  //   courseName: string;
  //   // modules: string[];
  //   dueDate?: string;
  //   notes?: string;
  //   mode: "UPI" | "Cash" | "Card" | "Other";
  // }
  
  // export interface InvoiceDoc {
  //   _id: string;
  //   studentId: Student;
  //   totalFees: number;
  //   amountPaid: number;
  //   remainingFees: number;
  //   courseDetails: CourseDetails[];
  //   paymentHistory: PaymentHistory[];
  //   status: "Due" | "Paid" | "Overdue";
  // }
  
  export interface CreateInvoicePayload {
    invoiceID:string,
    courseName:string,
    courseId:string
    amountPaid:number,
    paymentMode:     "UPI" | "Cash" | "Card" | "Other";
    dueDate?:string
    notes?:string
  }


  export interface InvoiceTable {
    studentName:string,
    email:string,
    course:string[],
    amountPaid:number,
    totalFees:number,
    mode:"UPI" | "Cash" | "Card" | "Other",
    status:"Due" | "Paid" | "Partially Paid" | "Overdue"
    createdAt:string

  }


  // export interface InvoiceDetail {

  // }