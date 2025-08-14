import { Mode } from "./types";

export interface CourseSelector {
  courses: {
    _id: string;
    courseName: string;
    isApproved?: boolean;
  }[];
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
