import React from "react";
import CreateBatch from "./_components/create-batch";
import { getCourses } from "@/actions/admin/course/get-courses";

const CreateBatchPage = async () => {
  const courses = await getCourses();

  const plainCourses = courses.map((course) => ({
    id: String(course.id),        // convert ObjectId to string
    name: course.name,       // use a plain field
  }));

  return <CreateBatch courses={plainCourses} />;
};

export default CreateBatchPage;
