export interface Session {
  _id: string;
  studentId: string[];
  courseName: string;
  modules: string[];
  chapters: string[];
  instructor?: string;
  title: string;
  date: Date;
  time: string;
  notes: string;
  videoLink: string;
}

export interface CreateSessionPayload {
  studentId?: string[];
  batchName: string | undefined;
  batchId?: string;
  moduleId?: string;
  module: string;         
  chapters: string[];     // keep array for multiple subtopics
  instructor?: string;
  meetingName: string;
  meetingLink: string;
  date: string;
  time: string;
}

export interface UpdateSessionPayload {
  studentId?: string[];
  meetingName?: string;
  modules?: string;
  chapters?: string[];
  instructor?: string;
  meetingLink?: string;
  date?: Date;
  time?: string;
}
