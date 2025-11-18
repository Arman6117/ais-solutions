// lib/types/sessions.type.ts

export type SessionStatus = 'scheduled' | 'rescheduled' | 'cancelled';

// Simplified Note type - only topics
export interface Note {
  _id?: string;
  topics: string[];
}

export interface Session {
  _id: string;
  studentId: string[];
  courseName: string;
  module: string;
  chapters: string[];
  instructor?: string;
  meetingName: string;
  date: Date;
  time: string;
  notes: Note[] | string[]; // Can be populated Note objects or just ObjectId strings
  videoLink: string;
  batchId?: string;
  
  // Status tracking fields
  status: SessionStatus;
  isDeleted: boolean;
  deletedAt?: Date | null;
  originalDate?: string;
  originalTime?: string;
  rescheduledAt?: Date | null;
  cancelledAt?: Date | null;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSessionPayload {
  studentId?: string[];
  batchName?: string;
  batchId?: string;
  moduleId?: string;
  module: string;
  chapters: string[];
  instructor?: string;
  meetingName: string;
  meetingLink: string;
  date: string;
  time: string;
}

export interface UpdateSessionPayload {
  studentId?: string[];
  meetingName?: string;
  module?: string;
  chapters?: string[];
  instructor?: string;
  meetingLink?: string;
  date?: string;
  time?: string;
  videoLink?: string;
  notes?: string[];
}

export interface ModulesForSession {
  _id: string;
  name: string;
  chapters: [{ name: string }];
}

export interface BatchMeetings {
  _id: string;
  meetingName: string;
  module: string;
  time: string;
  chapters: string[];
  date: string;
  instructor: string;
  status: SessionStatus;
  isDeleted: boolean;
  originalDate?: string;
  originalTime?: string;
  rescheduledAt?: Date | null;
  cancelledAt?: Date | null;
}

export interface SessionWithDisplayInfo extends Session {
  displayStatus: {
    status: SessionStatus;
    message: string;
    badge: 'scheduled' | 'rescheduled' | 'cancelled';
    variant: 'default' | 'warning' | 'destructive';
  };
}

export type SessionFilter = 'all' | 'active' | 'rescheduled' | 'cancelled';
