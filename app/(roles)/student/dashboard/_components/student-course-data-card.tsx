import { Button } from "@/components/ui/button";
import { BellIcon, BookOpen, CoinsIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdAlternateEmail, MdOutlineEmail } from "react-icons/md";
import StudentNotification from "./student-notification";
import { PiStudent } from "react-icons/pi";

const StudentCourseDataCard = () => {
  return (
    <div className="flex flex-col w-full items-center justify-between rounded-lg shadow-md  bg-white p-3 ">
     
      <div className="flex flex-col p-4 w-full  bg-soft-white">
        <div className="bg-white p-1 size-7 h-auto flex items-center  rounded-md ">
            <BookOpen className="text-primary-bg size-7"/>
        </div>
        <div className="flex flex-col">
            <h1 className="text-5xl text-primary-bg font-medium">24</h1>
            <span className="text-neutral-600 text-sm">Course Enrolled</span>
        </div>
      </div>
      <div className="flex flex-col p-4 w-full  bg-soft-white">
        <div className="bg-white p-1 size-7 h-auto flex items-center  rounded-md ">
            <PiStudent className="text-primary-bg size-7"/>
        </div>
        <div className="flex flex-col">
            <h1 className="text-5xl text-primary-bg font-medium">124</h1>
            <span className="text-neutral-600 text-sm">Lectures Attended</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDataCard;
