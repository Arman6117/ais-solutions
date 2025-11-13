

export interface CourseInfo {
    _id:string
    courseName: string;
    courseMode: string;
  }
  
  export interface BatchInfo {
    _id: string;
    name: string;
    courseId: string;
    modules: string[];
  }
  
  export interface StudentCourse {
    courseId: CourseInfo;
  }
  
  export interface Student {
    _id: string;
    name: string;
    email: string;
    phone: string;
    courses: StudentCourse[];
    batches: BatchInfo[];
  }
  
  export interface CourseDetails {
    courseId: string;
    modules: { name: string }[];
    totalFees: number;
    amountPaid: number;
    remainingFees: number;
    dueDate?: string;
    status: "Due" | "Paid" | "Overdue";
    mode: "offline" | "online" | "hybrid";
  }
  
  export interface PaymentHistory {
    amount: number;
    courseName: string;
    // modules: string[];
    dueDate?: string;
    notes?: string;
    mode: "UPI" | "Cash" | "Card" | "Other";
  }
  
  export interface InvoiceDoc {
    _id: string;
    studentId: Student;
    totalFees: number;
    amountPaid: number;
    remainingFees: number;
    courseDetails: CourseDetails[];
    paymentHistory: PaymentHistory[];
    status: "Due" | "Paid" | "Overdue";
  }
  
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