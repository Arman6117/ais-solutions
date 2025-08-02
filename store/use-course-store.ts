import { Course } from "@/lib/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseStore = {
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course) => void;
};

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      selectedCourse: null,
      setSelectedCourse: (course) => set({ selectedCourse: course }),
    }),
    {
      name: "course-store",
    }
  )
);
