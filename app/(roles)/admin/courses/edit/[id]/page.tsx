import { coursesData, dummyBatches, dummyInstructors } from "@/lib/static";
import React from "react";
import CourseDetails from "@/components/course-components/course-details";

const EditCoursePage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = coursesData.find((course) => course.id === id);
  return (
    <main className="flex w-full">
      <CourseDetails
        course={data}
        dummyBatches={dummyBatches}
        dummyInstructors={dummyInstructors}
      />
    </main>
  );
};

export default EditCoursePage;
