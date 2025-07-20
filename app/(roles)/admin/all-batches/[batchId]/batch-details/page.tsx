import { dummyBatches, dummyInstructors, dummyStudents } from "@/lib/static";
import React from "react";
import BatchDetails from "./_components/batch-details";

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
  const batch = dummyBatches.find((batch) => batch.id === id);
  const students = dummyStudents.filter((stud) => stud.batchId === id);
 
  return (
    <main className="w-screen flex">
      <BatchDetails
        batch={batch}
        dummyInstructors={dummyInstructors}
        dummyModules={batchModules}
        dummyStudents={students}
        courseId={courseId}
      />
    </main>
  );
};

export default BatchDetailsPage;
