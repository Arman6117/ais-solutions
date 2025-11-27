export interface StudentInfo {
  _id?: string;
  name: string;
  email: string;
  profilePic: string;
}

export interface MeetingInfo {
  _id?: string;
  batchName: string;
  time: string;
  courseName: string;
  module: string;
  meetingLink: string;
  date: string;
  studentId?: string[];

  // Status tracking fields
  status: "scheduled" | "rescheduled" | "cancelled";
  isDeleted?: boolean;
  originalDate?: string;
  originalTime?: string;
  rescheduledAt?: Date | null;
  cancelledAt?: Date | null;

  // NEW: Access control fields
  isPurchasedModule?: boolean;
  accessLevel?: "full" | "preview";
}

export interface ModuleInfo {
  id: string;
  name: string;
  courseName: string;
  noOfChap: number;
  chapters?: string[];
  thumbnail: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  startDate?: string;
  endDate?: string;
  instructor: string[];
  batchId: string;

  // NEW: Access control fields
  isPurchased?: boolean;
  accessLevel?: "full" | "preview" | undefined;
}

export interface ModuleSessionHistory {
  attended: boolean;
  meetingName: string;
  note: string;
  modules: string;
  chapter: string;
  date: string;
  time: string;
}

export interface BatchInfo {
  name: string;
  _id?: string;
  groupLink: string;
  courseId?: string;
}

export interface StudentDashboard {
  // Student
  student: StudentInfo;
  //Batch
  batch: BatchInfo;
  //Session
  lectureCompleted: number;
  meetings: MeetingInfo[];
  //Modules
  modules: ModuleInfo[];
}
