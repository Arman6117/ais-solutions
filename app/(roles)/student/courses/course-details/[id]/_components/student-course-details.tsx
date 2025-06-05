import { Badge } from "@/components/ui/badge";
import { Calendar, Pyramid } from "lucide-react";
import Link from "next/link";
import React from "react";

const StudentCourseDetails = () => {
  return (
    <div className="flex flex-col w-full ">
      <div className="h-auto bg-gradient-to-r gap-4 rounded-md from-[#16161d] to-indigo-950 p-10 flex flex-col">
        <h1 className="sm:text-[45px] text-4xl max-w text-white font-bold ">
          The Complete Web Development Bootcamp
        </h1>
        <p className="text-white text-sm max-w-[600px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, nobis,
          voluptas ipsum, sequi neque cupiditate deleniti voluptatum placeat
          repudiandae et dolores cumque! Nesciunt, accusamus? Atque quia
          adipisci est porro beatae.
        </p>
        <Badge className="bg-primary-bg flex gap-2 mt-5">
          <Pyramid className="text-white" />
          Intermediate
        </Badge>
        <span className="text-white text-sm flex gap-2">
          Instructors:
          <Link href={""} className="hover:underline hover:text-blue-500">John Doe</Link>
        </span>
        <div className="flex gap-2 items-center">
            <Calendar className="text-white size-4"/>
            <span className="text-white text-sm">Last Updated 2/2025</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetails;
