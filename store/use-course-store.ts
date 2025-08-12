import { CourseSelector } from "@/lib/types/course.type";
import { Course } from "@/lib/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CourseStore = {
  selectedCourse: CourseSelector | null;
  setSelectedCourse: (course: CourseSelector) => void;
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
