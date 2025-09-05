import { coursesData, dummyBatches, dummyInstructors } from "@/lib/static";
import React from "react";
import CourseDetails from "@/components/course-components/course-details";
import { getCourseById } from "@/actions/admin/course/get-courses";

const CourseDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const data = await getCourseById(id)

  return (
    <main className="flex w-full">
      {/* <EditCourse course={data} /> */}
      <CourseDetails
        course={data.data}
        dummyBatches={dummyBatches}
        dummyInstructors={dummyInstructors}
      />
    </main>
  );
};

export default CourseDetailsPage;
