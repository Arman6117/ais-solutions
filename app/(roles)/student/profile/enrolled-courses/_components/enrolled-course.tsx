import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const EnrolledCourse = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-3 mt-3">
        <Button className="bg-gradient-to-r w-16 h-10 from-purple-500 to-indigo-500 cursor-pointer text-white hover:from-purple-600 hover:to-primary-bg transition-colors duration-300">
          <Link className="" href={"/student/profile"}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-5xl">Course Name</h1>
      </div>
    </div>
  );
};

export default EnrolledCourse;
