import Greetings from "@/components/greetings";
import React from "react";
import LectureSchedule from "./lecture-schedule";
import StudentBatches from "./student-batches";
import StudentCard from "./student-card";

const StudentDashboard = () => {
  return (
    <div className="flex w-screen h-full  py-1 gap-">
      <div className="flex flex-col">
        <Greetings>Arman</Greetings>
        <div className="mt-5">
          <LectureSchedule />
        </div>
        
      </div>
      <div className="bg-soft-white flex flex-col gap-5 pb  w-full h-dvh rounded-lg p-5">
        <div className="flex gap-3">
          <StudentCard />
        </div>
        <StudentBatches />
      </div>
    </div>
  );
};

export default StudentDashboard;
