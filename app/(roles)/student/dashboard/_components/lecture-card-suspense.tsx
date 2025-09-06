"use client";
import React from "react";
import LectureScheduleCard from "./lecture-schedule-card";

const LectureCardSuspense = () => {
  // const { selectedCourse } = useCourseStore();
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
      <LectureScheduleCard  />
      <LectureScheduleCard  />
      <LectureScheduleCard  />
    </React.Suspense>
  );
};

export default LectureCardSuspense;
