import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SupportDepartment = {
  id: string;
  name: string;
  icon: string; // store icon name like "Building2"
  color: string;
};


type SupportDepartmentStore = {
  departments: SupportDepartment[];
  addDepartment: (dept: SupportDepartment) => void;
  deleteDepartment: (id: string) => void;
  updateDepartment: (id: string, updated: Partial<SupportDepartment>) => void;
};

export const useSupportDepartmentStore = create<SupportDepartmentStore>()(
  persist(
    (set) => ({
      departments: [],
      addDepartment: (dept) =>
        set((state) => ({
          departments: [...state.departments, dept],
        })),
      deleteDepartment: (id) =>
        set((state) => ({
          departments: state.departments.filter((d) => d.id !== id),
        })),
      updateDepartment: (id, updated) =>
        set((state) => ({
          departments: state.departments.map((d) =>
            d.id === id ? { ...d, ...updated } : d
          ),
        })),
    }),
    {
      name: "support-department-store", // 🧠 localStorage key
    }
  )
);
