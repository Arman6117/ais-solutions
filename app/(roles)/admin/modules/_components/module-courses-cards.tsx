import React from "react";
import ModuleCourseCard from "./module-course-card";

type ModuleCoursesCards = {
  courses: string[];
};
const ModuleCoursesCards = ({ courses }: ModuleCoursesCards) => {
  return (
    <div className="flex flex-wrap w-full gap-5">
      {courses.map((course, index) => (
        <ModuleCourseCard course={course} key={index} />
      ))}
    </div>
  );
};

export default ModuleCoursesCards;
