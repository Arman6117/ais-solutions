import { Icon } from "next/dist/lib/metadata/types/metadata-types";

export type Column<T> = {
  id: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
};

export type FilterOption = {
  label: string;
  value: string;
};
export type Course = {
  id: string;
  name: string;
  description: string;
  discount: number;
  createdAt: string;
  students: number;
  batches: number;
  batchesCompleted: number;
  price: number;
  batchesName: string[];
  modules: string[];
  instructors: string[];
};

export type DummyBatches = {
  id: number | string;
  name: string;
  schedule: string;
  time: string;
  students: number;
  startDate: string;
  endDate: string;
  status: "Ongoing" | "Upcoming" | "Completed";
};

export type DummyInstructors = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  email: string;
};

export type DummyStudent = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  batchId: string;
  isApproved: boolean;
  joinedAt: string;
  modules: string[];
  courses: Course[];
  feesStatus: "paid" | "unpaid";
  totalFeePaid: number;
  feesRemaining: number;
};

// Updated Note type definition to include both legacy pdfFiles and new files format
export type Note = {
  id: string;
  moduleName: string;
  chapterName: string;
  dateCreated: string;
  youtubeLinks: string[];
  // Legacy field - deprecated but kept for backward compatibility
  pdfFiles?: string[];
  // New field - stores all file types with metadata
  files?: Array<{
    name: string;
    type: string;
  }>;
};

// Type for link/file fields
export type LinkField = "youtubeLinks" | "files";

// Type for column definitions
export type ColumnNote = {
  id: string;
  header: string;
  accessor: (note: Note) => React.ReactNode;
};
