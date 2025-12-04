import { Mode } from "./types";

export interface AllPendingRequests {
  _id: string;
  studentName: string;
  email: string;
  courseName: string;
  courseId: string;
}

export interface CreatePendingRequest {
  studentId: string;
  courseId: string;
  modules: string[];
  finalPrice: number;
}

export interface RequestToApprove {
  studentId: { name: string; email: string };
  courseId: { _id:string,courseName: string };
  modules: [{ name: string; price: number }];
  finalPrice: number;
}

export interface CourseData {
  _id:string
  courseName: string;
  modules: [{ _id: string; name: string; price: number }];
  batches: [{ _id: string; name: string }];
}


export interface ApprovePendingRequestPayload {
  email:string,
  courseName:string,
  courseId:string
  batch:string,
  modules:string[],
  amountPaid:number
  totalFees:number
  dueDate?:string
  salesPersonId?: string;
  status:"Due" | "Paid" | "Partially Paid",
  mode:"UPI"| "Cash"| "Card"|"Other" 
  batchMode:Mode
}