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
  createdAt: string;
  students: number;
  batches: number;
  batchesCompleted:number
  price:number
  batchesName: string[];
  modules: string[];
  instructors: string[];
};
