"use client";
import React, { useMemo } from "react";
import LectureScheduleCard from "./lecture-schedule-card";
import { useCourseStore } from "@/store/use-course-store";

type LectureCardSuspenseProps = {
  day: "today" | "tomorrow";
};
const LectureCardSuspense = ({ day }: LectureCardSuspenseProps) => {
  const { selectedCourse } = useCourseStore();
  // const todayMeetingSchedule = useMemo(()=>{
  //     return selectedCourse?.meetingSchedule.filter((schedule) => {
  //         const scheduleDate = new Date(schedule.date);
  //         const today = new Date();
  //         return scheduleDate.toDateString() === today.toDateString();
  //     }) || [];
  // } ,[selectedCourse]);
  // const tomorrowMeetingSchedule = useMemo(()=> {
  //     return selectedCourse?.meetingSchedule.filter((schedule) => {
  //         const scheduleDate = new Date(schedule.date);
  //         const tomorrow = new Date();
  //         tomorrow.setDate(tomorrow.getDate() + 1);
  //         return scheduleDate.toDateString() === tomorrow.toDateString();
  //     }) || [];
  // },[selectedCourse]);
  return (
    <React.Suspense>
      <LectureScheduleCard day={day} />
      <LectureScheduleCard day={day} />
      <LectureScheduleCard day={day} />
    </React.Suspense>
  );
};

export default LectureCardSuspense;
