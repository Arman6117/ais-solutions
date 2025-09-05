import { Mode } from "./types";

export interface Courses {

    _id: string;
    courseName: string;
    isApproved?: boolean;
  
}
export interface StudentCourse {
  _id: string;
  courseName: string;
}

export interface CourseCards {
  _id: string;
  courseThumbnail: string;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  courseOfferPrice: number;
  modules: string[];
  courseLevel: "beginner" | "intermediate" | "advanced";
  rating: number;
  courseStartDate: number;
  courseEndDate: number;
  courseMode: Mode;
  createdAt: Date;
}

export interface ModuleChapterTopic {
  title: string;
  description: string;
};

export interface ModuleChapter  {
  name: string;
  description: string;
  topics: ModuleChapterTopic[];
};
export interface CourseModule  {
  _id:string
  name: string;
  description: string;
  syllabusLink: string;
  price: number;
  chapters: ModuleChapter[];
};
export interface CourseDetails {
  _id: string;
  courseThumbnail: string;
  courseName: string;
  courseDescription: string;
  coursePrice: number;
  courseOfferPrice: number;
  courseDiscount:number
  modules: CourseModule[];
  courseLevel: "beginner" | "intermediate" | "advanced";
  rating: number;
  courseStartDate: number;
  courseEndDate: number;
  courseMode: Mode;
  createdAt: Date;
  numberOfStudents:number
}


// Assuming 'Mode' is defined elsewhere, for example:
// import type { Mode } from "./path-to-your-types";

export interface FormattedCourse  {
  _id: string;
  courseName: string;
  courseDescription: string;
  syllabusLink: string;
  createdAt: string; // The `format` function returns a string
  coursePrice: number;
  courseDiscount: number;
  courseOfferPrice: number;
  numberOfStudents: number;
  courseThumbnail: string;
  courseStartDate: string; // The `format` function returns a string
  courseEndDate: string; // The `format` function returns a string
  courseMode: Mode;
  courseLevel: "beginner" | "intermediate" | "advanced";
  modules: string[];
};