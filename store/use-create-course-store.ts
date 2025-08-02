import { DummyInstructors, prModule, Mode, prInstructors, Modules, CourseLevel, } from "@/lib/types/types";
import { create } from "zustand";

interface CourseFormState {
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  courseDiscount: number;
  courseOfferPrice: number;
  courseMode: Mode;
  courseLevel: CourseLevel;
  courseThumbnail?: File | null | string;
  courseStartDate: Date | null;
  courseEndDate: Date | null;
  courseSyllabusLink?: string; // ✅ Add this

  instructors: prInstructors[];
  modules:  Modules[];

  setBasicInfo: (
    info: Partial<Omit<CourseFormState, "instructors" | "modules">>
  ) => void;
  setInstructors: (
    updater: prInstructors[] | ((prev: prInstructors[]) => prInstructors[])
  ) => void;
  setModules: (modules: Modules[]) => void;

  resetCourseForm: () => void;
}


export const useCreateCourseStore = create<CourseFormState>((set) => ({
  courseName: "",
  courseDescription: "",
  courseMode: "online",
  courseLevel: "beginner",
  courseDiscount: 0,
  coursePrice: 0,
  courseOfferPrice: 0,
  courseStartDate: null,
  courseEndDate: null,
  courseThumbnail: "",
  courseSyllabusLink: "", // ✅ Add this

  instructors: [],
  modules: [],

  setBasicInfo: (info) => set((state) => ({ ...state, ...info })),
  setInstructors: (updater) =>
    set((state) => ({
      instructors: typeof updater === "function" ? updater(state.instructors) : updater,
    })),
  setModules: (modules) => set({ modules }),

  resetCourseForm: () =>
    set({
      courseName: "",
      courseDescription: "",
      coursePrice: 0,
      courseThumbnail: "",
      courseDiscount: 0,
      courseOfferPrice: 0,
      courseMode: "online",
      courseStartDate: null,
      courseEndDate: null,
      courseSyllabusLink: "", // ✅ Reset it too
      instructors: [],
      modules: [],
    }),
}));
