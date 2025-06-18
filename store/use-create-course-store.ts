import { DummyInstructors, DummyModules, Mode } from "@/lib/types";
import { create } from "zustand";

interface CourseFormState {
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  courseDiscount: number;
  courseOfferPrice: number;
  courseMode: Mode;
  courseStartDate: Date | null;
  courseEndDate: Date | null;

  instructors: DummyInstructors[];

  modules: DummyModules[];

  setBasicInfo: (
    info: Partial<Omit<CourseFormState, "instructors" | "modules">>
  ) => void;
  setInstructors: (
    updater: DummyInstructors[] | ((prev: DummyInstructors[]) => DummyInstructors[])
  ) => void;
  setModules: (modules: DummyModules[]) => void;

  resetCourseForm: () => void;
}

export const useCreateCourseStore = create<CourseFormState>((set) => ({
  courseName: "",
  courseDescription: "",
  courseMode: "online",
  courseDiscount: 0,
  coursePrice: 0,
  courseOfferPrice: 0,
  courseStartDate: null,
  courseEndDate: null,

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
      courseDiscount: 0,
      courseOfferPrice: 0,
      courseMode: "online",
      courseStartDate: null,
      courseEndDate: null,
      instructors: [],
      modules: [],
    }),
}));
