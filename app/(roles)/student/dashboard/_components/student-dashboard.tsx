import Greetings from "@/components/greetings";
import React from "react";
import LectureSchedule from "./lecture-schedule";
import StudentBatches from "./student-batches";
import StudentCard from "./student-card";
import StudentCourseDataCard from "./student-course-data-card";
import StudentCourseSelector from "./student-course-selector";

const StudentDashboard = () => {
  return (
    <div className="flex w-screen h-full  py-1 gap-">
      <div className="flex flex-col">
        <Greetings>Arman</Greetings>
          <StudentCourseSelector/>
        <div className="mt-5">
          <LectureSchedule />
        </div>
        
      </div>
      <div className="bg-soft-white flex flex-col gap-5 pb  w-full h-dvh rounded-lg p-5">
        <div className="flex gap-8">
          <StudentCard />
          <StudentCourseDataCard />
        </div>
        <StudentBatches />
      </div>
    </div>
  );
};

export default StudentDashboard;
