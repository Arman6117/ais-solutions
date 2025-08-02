import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DummyInstructors } from "@/lib/types/types";
import { PlayCircle, Star, Users } from "lucide-react";
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
        <h1 className="text-3xl font-medium text-neutral-800">Instructors</h1>
        <p className="text-muted-foreground text-sm">
          Our talented instructors
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {instructors.map((instructor, index) => (
          <div
            className="flex flex-col gap-4 border  rounded-md p-3"
            key={index}
          >
            <div className="flex gap-2 flex-col">
              <h1 className="text-lg font-semibold  text-primary-bg hover:text-violet-900 cursor-pointer underline">
                {instructor.name}
              </h1>
              <span className="text-muted-foreground text-sm">
                Lead Instructor and developer
              </span>
            </div>
            <div className="flex gap-6 items-center">
              <Avatar className=" size-[100px]">
                <AvatarImage src={instructor.avatar} className="object-cover" />
                <AvatarFallback>{instructor.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <Star className="text-black fill-black size-3" />
                  <span className="text-sm">4.7 Instructor rating</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Users className="text-black  size-3" />
                  <span className="text-sm">300 Students</span>
                </div>
                <div className="flex gap-3 items-center">
                  <PlayCircle className="text-black  size-3" />
                  <span className="text-sm">7 Courses</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseInstructorCard;
