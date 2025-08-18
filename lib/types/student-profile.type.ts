// types/student.ts
export interface Course {
    id: string;
    name: string;
    status: 'Completed' | 'Ongoing' | 'Upcoming';
    progress?: number;
    duration?: string;
    instructor?: string;
    thumbnail?: string;
    approved?:boolean
    paid?:number
    total?:number
    batch?:string

  }
  
  export interface StudentProfile {
    id: string;
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
  
  