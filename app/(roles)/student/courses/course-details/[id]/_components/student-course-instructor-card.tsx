import { DummyInstructors } from "@/lib/types";
import React from "react";

type StudentCourseInstructorCardProps = {
  instructors: DummyInstructors[];
};
const StudentCourseInstructorCard = ({
  instructors,
}: StudentCourseInstructorCardProps) => {
  return (
    <div className="flex gap-5 flex-col mt-10">
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium text-neutral-800">
          Instructors
        </h1>
        <p className="text-muted-foreground text-sm">
            Our talented instructors
        </p>
      </div>
      <div className="flex flex-col gap-5">

      {instructors.map((instructor,index)=> (
        <div className="flex flex-col border  rounded-md p-3" key={index}>
            <div className="flex gap-2 flex-col">

          <h1 className="text-lg font-semibold  text-primary-bg hover:text-violet-900 cursor-pointer underline">{instructor.name}</h1>
          <span className="text-muted-foreground text-sm">Lead Instructor and developer </span>
        </div>
            </div>
      ))}
      </div>
    </div>
  );
};

export default StudentCourseInstructorCard;
