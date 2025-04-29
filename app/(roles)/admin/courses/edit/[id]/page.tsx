import { coursesData } from "@/lib/static";
import React from "react";
import EditCourse from "../../_components/edit-course";

const EditCoursePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const data = coursesData.find((course) => course.id === id);
  return (
    <main className="flex w-full">
      
        <EditCourse course={data} />
      
    
    </main>
  );
};

export default EditCoursePage;
