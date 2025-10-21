import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types/student";
import { getLevelColor, getModeColor } from "@/lib/utils";
import { format, formatDistance } from "date-fns";
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

type CourseCardProps = {
  course:Course
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-xs overflow-hidden transition-all hover:shadow-lg hover:translate-y-1 duration-300 border border-gray-100">
      {/* Card Header with Course Title - Full width on all screens */}
      <div className="flex w-full justify-between p-3 sm:p-4 rounded-t-lg bg-primary-bg">
        <h1 className="text-lg sm:text-xl text-white font-medium line-clamp-1 mr-2">
          {course.courseId.courseName}
        </h1>
        <Button
          size="sm"
          asChild
          className="bg-white text-primary-bg hover:bg-gray-100 hover:text-primary-bg text-xs sm:text-sm px-2 sm:px-3"
        >
          <Link href={`/admin/courses/course-details/${course.courseId._id}?mode=view`}>View</Link>
        </Button>
      </div>

      {/* Course Mode Badge - Responsive padding */}
      <div className="px-3 sm:px-4 pt-2 sm:pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getModeColor(course.courseId.courseMode)}`}
          >
            <MonitorSmartphone className="mr-1 size-3" />
            {course.courseId.courseMode}
          </span>
          <span
            className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.courseId.courseLevel)}`}
          >
            {course.courseId.courseLevel}
          </span>
        </div>
      </div>

      {/* Course Information - Grid adjusts on smaller screens */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 grid grid-cols-2 xs:grid-cols-2 gap-y-2">
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Clock className="text-primary-bg size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="font-medium">{formatDistance(course.courseId.courseStartDate, course.courseId.courseEndDate)}</span>
        </div>

        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <User className="text-primary-bg size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="font-medium">{course.courseId.studentsEnrolled.length} Students</span>
        </div>

        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Calendar className="text-primary-bg size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="font-medium line-clamp-1">{format (course.courseId.courseStartDate, "PP")}</span>
        </div>

        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <div className="flex items-center">
            <StarIcon className="text-yellow-500 size-3 sm:size-4 mr-1 flex-shrink-0" />
            <span className="font-medium">1</span>
          </div>
        </div>
      </div>

      {/* Location (if available) - Responsive font size
      {course.location && (
        <div className="px-3 sm:px-4 pb-1 sm:pb-2">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <MapPin className="text-primary-bg size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="font-medium line-clamp-1">{course.location}</span>
          </div>
        </div>
      )} */}

      {/* Instructor - Adjusted padding and font sizes
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-100">
        <div className="flex items-center text-xs sm:text-sm flex-wrap">
          <GraduationCap className="text-primary-bg size-3 sm:size-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="font-medium">Instructor: </span>
          <span className="ml-1 text-gray-700 line-clamp-1">{course.instructor}</span>
        </div>
      </div> */}
    </div>
  );
};

export default CourseCard;