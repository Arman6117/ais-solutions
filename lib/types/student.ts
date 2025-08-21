export interface StudentTable {
    _id:string,
    name:string,
    email:string,
    phone:string,
    gender:"male" | "female" | "other",
    batches:string[],
    feesStatus:"paid" | "partial" | "unpaid", 
    createdAt: string,
}

export interface Course {
    _id: string;
    courseName: string;
    courseStatus?: 'Completed' | 'Ongoing' | 'Upcoming';
    progress?: number;
    duration?: string;
    courseStartDate:string,
    courseEndDate:string,
    totalFees:number,
    dueDate:string,
    courseThumbnail:string
    amountPaid:number,
    remainingFee:number
    instructor?: string;
    isApproved?:boolean
    batches?:string
    status?:string

  }
  
export interface StudentData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    profilePic:string
    gender:"male" | "female" | "other";
    batches: string[];
    feesStatus: "paid" | "partial" | "unpaid";
    createdAt: string;
    updatedAt: string;
    courses:Course[],
    invoices: string[];
    referralCode: string,
    totalFees?:number
    remainingFee?:number
    amountPaid?:number
}

