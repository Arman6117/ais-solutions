import React from "react";
import CreateBatch from "./_components/create-batch";
import { getCourses } from "@/actions/shared/get-course";

export const revalidate = 60;
const CreateBatchPage = async () => {
  const courses = await getCourses();

 
  return <CreateBatch courses={courses} />;
};

export default CreateBatchPage;
