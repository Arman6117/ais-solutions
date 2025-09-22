// types/student.ts
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
  modules?:string[]
}

export interface StudentProfile {

  name: string;
  email: string;
  number: string;
  image: string;
  totalFees: number;
  paidFees: number;
  courses: Course[];
}

export interface EditableData {
  name: string;
  number: string;
}

