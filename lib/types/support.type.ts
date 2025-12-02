import { ObjectId } from "mongoose";

// 1. Type for an Assigned Batch
export interface AssignedBatch {
  batchId: string | ObjectId; // Can be string (frontend) or ObjectId (backend)
  batchName: string;
}

// 2. Type for a Single Support Member
export interface SupportMember {
  _id?: string; // Optional because new members won't have an ID yet
  id?: string; // Frontend might use 'id' instead of '_id'
  name: string;
  designation: string;
  email: string;
  contact: string;
  availableTime: string;
  assignedBatches: AssignedBatch[];
}

// 3. Type for the Support Department Document
export interface ISupportDepartment {
  _id: string | ObjectId;
  name: string;
  icon: string;
  color: string;
  members: SupportMember[];
  createdAt?: Date;
  updatedAt?: Date;
}

// 4. Payload Type for creating/updating a member (Frontend -> Server Action)
export interface CreateMemberPayload {
  departmentId: string; // We need to know which department to add them to
  name: string;
  designation: string;
  email: string;
  contact: string;
  availableTime: string;
  assignedBatches: string[]; // Array of Batch IDs (strings) from the multi-select
}

// 5. Payload Type for creating a department
export interface CreateDepartmentPayload {
  name: string;
  icon: string;
  color: string;
}

export type MemberPayload = {
    departmentId: string;
    memberId?: string; // Required for update
    name: string;
    designation: string;
    email: string;
    contact: string;
    availableTime: string;
    assignedBatches: string[]; // Array of Batch IDs
  };