import React from "react";
import CreateCourseBasicInfo from "./create-course-basic-info";
import CreateCourseInstructors from "./create-course-intstrcutors";
import CreateCourseModules from "./create-course-modules";
import { Button } from "@/components/ui/button";
import CreateCourseButton from "./create-course-button";

const CreateCourse = () => {
  return (
    <main className="flex w-full flex-col gap-3 ">
      <div className="flex flex-col">
        <h1 className="text-5xl font-medium">Create A New Course</h1>
      </div>
      <form className="flex flex-col gap-7">
        <CreateCourseBasicInfo />
        {/* <CreateCourseInstructors /> */}
        <CreateCourseModules />
       <CreateCourseButton/>
      </form>
    </main>
  );
};

export default CreateCourse;
