import { coursesData, dummyBatches, dummyInstructors } from "@/lib/static";
import React from "react";
import EditCourse from "../../_components/edit-course";
import CourseDetails from "@/components/course-components/course-details";

const CourseDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const data = coursesData.find((course) => course.id === id);
  return (
    <main className="flex w-full">
      {/* <EditCourse course={data} /> */}
      <CourseDetails
        course={data}
        dummyBatches={dummyBatches}
        dummyInstructors={dummyInstructors}
      />
    </main>
  );
};

export default CourseDetailsPage;
