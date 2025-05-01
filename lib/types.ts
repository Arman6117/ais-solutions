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
  id: number;
  name: string;
  schedule: string;
  time: string;
  students: number;
  startDate: string;
  endDate: string;
  status: string;
};

export type DummyInstructors = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  email: string;
};
