import { Button } from "@/components/ui/button";
import { getLevelColor, getModeColor } from "@/lib/utils";
import {
  Calendar,
  Clock,
  GraduationCap,
  MapPin,
  MonitorSmartphone,
  StarIcon,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";


type ModuleCourseCardProps = {
  course: {
    id: string;
    title: string;
    duration: string;
    students: number;
    mode: "Online" | "Offline" | "Hybrid";
    location?: string;
    startDate: string;
    rating: number;
    level: "Beginner" | "Intermediate" | "Advanced";
    instructor: string;
  };
};

const ModuleCourseCard = ({ course }: ModuleCourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-72 overflow-hidden transition-all hover:shadow-lg hover:translate-y-1 duration-300 border border-gray-100">
      
      <div className="flex w-full justify-between p-4 rounded-t-lg bg-primary-bg">
        <h1 className="text-xl text-white font-medium line-clamp-1">
          {course.title}
        </h1>
        <Button
          size="sm"
          asChild
          className="bg-white text-primary-bg hover:bg-gray-100 hover:text-primary-bg"
        >
          <Link href={`/admin/courses/course-details/${course.id}?mode=view`}>View</Link>
        </Button>
      </div>

      
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getModeColor(
              course.mode
            )}`}
          >
            <MonitorSmartphone className="mr-1 size-3" />
            {course.mode}
          </span>
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(
              course.level
            )}`}
          >
            {course.level}
          </span>
        </div>
      </div>

      {/* Course Information */}
      <div className="px-4 py-3 grid grid-cols-2 gap-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="text-primary-bg size-4 mr-2" />
          <span className="font-medium">{course.duration}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <User className="text-primary-bg size-4 mr-2" />
          <span className="font-medium">{course.students} Students</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="text-primary-bg size-4 mr-2" />
          <span className="font-medium">{course.startDate}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <div className="flex items-center">
            <StarIcon className="text-yellow-500 size-4 mr-1" />
            <span className="font-medium">{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Location (if available) */}
      {course.location && (
        <div className="px-4 pb-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="text-primary-bg size-4 mr-2" />
            <span className="font-medium line-clamp-1">{course.location}</span>
          </div>
        </div>
      )}

      {/* Instructor */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center text-sm">
          <GraduationCap className="text-primary-bg size-4 mr-2" />
          <span className="font-medium">Instructor: </span>
          <span className="ml-1 text-gray-700">{course.instructor}</span>
        </div>
      </div>
    </div>
  );
};

export default ModuleCourseCard;
