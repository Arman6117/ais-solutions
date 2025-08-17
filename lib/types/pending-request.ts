export interface AllPendingRequests {
  _id: string;
  studentName: string;
  email: string;
  courseName: string;
}

export interface CreatePendingRequest {
  studentId:string,
  courseId:string
  modules: string[];
  finalPrice: number;
}