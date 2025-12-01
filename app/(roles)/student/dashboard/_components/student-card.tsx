import { CoinsIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdAlternateEmail } from "react-icons/md";
import StudentNotification from "./student-notification";
import StudentBatchName from "./student-batch-name";
import StudentGroupJoinButton from "./student-group-join-button";
import { BatchInfo, StudentInfo } from "@/lib/types/student-dashboard.type";

export const revalidate = 60;

type StudentCardProps = {
  student: StudentInfo;
  batch: BatchInfo;
};

const StudentCard = async ({ student, batch }: StudentCardProps) => {
  // 1. Random Abstract Background Logic (1-6)
  const totalAbstracts = 6; 
  const randomIndex = Math.floor(Math.random() * totalAbstracts) + 1;
  const randomAbstractSrc = `/abstract/abstract${randomIndex}.jpg`;

  // 2. Smart Profile Image Fallback
  // If profilePic exists and is not empty -> Use it
  // Else -> Generate avatar with Initials (using UI Avatars service)
  const studentName = student?.name || "Student";
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=random&color=fff&size=128`;
  
  const profileImageSrc = student?.profilePic && student.profilePic.trim() !== "" 
    ? student.profilePic 
    : defaultAvatar;

  return (
    <div className="flex flex-col pattern11 w-[250px] max-w-sm sm:w-[400px] md:w-fit sm:mx-auto sm:max-w-md lg:max-w-lg rounded-lg shadow-md bg-white p-3 relative">
      <div className="relative w-full h-32 sm:h-36 lg:h-40 overflow-hidden rounded-lg">
        <Image
          src={randomAbstractSrc} 
          className="rounded-lg object-cover"
          alt="abstract background"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Profile Image - Positioned to overlap */}
      <div className="bg-white rounded-lg w-16 h-16 sm:w-20 sm:h-20 p-1 -mt-8 sm:-mt-10 ml-4 sm:ml-6 shadow-sm relative z-10">
        <div className="relative w-full h-full">
          <Image
            alt="student profile"
            className="rounded-lg object-cover"
            src={profileImageSrc} // Now uses initials if no pic
            fill
            sizes="80px"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col mt-2 sm:mt-4">
        <div className="flex flex-col ml-4 sm:ml-7 space-y-2">
          {/* Student Name */}
          <h1 className="font-medium text-base sm:text-lg text-gray-900 truncate">
            {studentName}
          </h1>

          {/* Email */}
          <div className="flex gap-1 items-center">
            <MdAlternateEmail className="text-neutral-500 w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-neutral-500 truncate">
              {student?.email || "No Email"}
            </span>
          </div>

          <StudentBatchName batchName={batch?.name || "N/A"} />

          <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-5 mt-3 sm:mt-4 items-center">
            {/* Coins */}
            <div className="bg-soft-white flex gap-1 items-center rounded-md shadow-md p-2 min-w-fit">
              <CoinsIcon className="text-primary-bg w-4 h-4 flex-shrink-0" />
              <span className="text-neutral-800 font-medium text-sm whitespace-nowrap">
                0
              </span>
            </div>

            {/* Notification */}
            <div className="flex-shrink-0">
              <StudentNotification />
            </div>

            {/* Join Button */}
            <div className="flex-shrink-0 w-full sm:w-auto sm:flex-1">
              <StudentGroupJoinButton groupLink={batch?.groupLink || "#"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
