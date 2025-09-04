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
  _id: string;
  studentId: { name: string; email: string };
  courseId: { courseName: string };
  modules: [{ name: string; price: number }];
  finalPrice: number;
}

export interface CourseData {
  courseName: string;
  modules: [{ _id: string; name: string; price: number }];
  batches: [{ _id: string; name: string }];
}
