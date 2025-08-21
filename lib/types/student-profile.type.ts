// types/student.ts
export interface Course {
    _id: string;
    name: string;
    status?: 'Completed' | 'Ongoing' | 'Upcoming';
    progress?: number;
    duration?: string;
    instructor?: string;
    thumbnail?: string;
    isApproved?:boolean
    paid?:number
    total?:number
    batch?:string

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
  
  