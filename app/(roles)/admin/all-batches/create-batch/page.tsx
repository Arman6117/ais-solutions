import React from "react";
import CreateBatch from "./_components/create-batch";
import { getCourses } from "@/actions/shared/get-course";


const CreateBatchPage = async () => {
  const courses = await getCourses();

  const plainCourses = courses.map((course) => ({
    id: String(course._id),        // convert ObjectId to string
    name: course.courseName,       // use a plain field
  }));

  return <CreateBatch courses={plainCourses} />;
};

export default CreateBatchPage;
