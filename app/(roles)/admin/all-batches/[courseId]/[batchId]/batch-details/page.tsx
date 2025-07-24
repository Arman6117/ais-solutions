import {  dummyInstructors, dummyStudents } from "@/lib/static";
import React from "react";
import BatchDetails from "./_components/batch-details";
import { getBatchById } from "@/actions/admin/batches/get-batch-by-id";

export const batchModules = [
  "HTML & CSS Basics",
  "JavaScript Fundamentals",
  "React Core Concepts",
  "Node.js & Express",
  "MongoDB Integration",
  "Authentication & Deployment",
];

const BatchDetailsPage = async ({
  params,
}: {
  params: Promise<{ batchId: string,courseId:string }>;
}) => {
  const id = (await params).batchId;
  const courseId = (await params).courseId;
  const  res = await getBatchById(id);
  const students = dummyStudents.filter((stud) => stud.batchId === id);
 
  if(!res.success) {
    return (
      <h1>No batch</h1>
    )
  }
  return (
    <main className="w-screen flex">
    
      <BatchDetails
        batch={res.data!}
        dummyInstructors={dummyInstructors}
        dummyModules={batchModules}
        dummyStudents={students}
        courseId={courseId}
      />
    </main>
  );
};

export default BatchDetailsPage;
