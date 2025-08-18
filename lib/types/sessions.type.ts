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
  courseName: string;
  modules: string[];
  chapters: string[];
  instructor?: string;
  title: string;
  date: Date;
  time: string;
}
export interface UpdateSessionPayload {
  studentId?: string[];
  courseName?: string;
  modules?: string[];
  chapters?: string[];
  instructor?: string;
  title?: string;
  date?: Date;
  time?: string;
  notes?: string;
  videoLink?: string;
}
