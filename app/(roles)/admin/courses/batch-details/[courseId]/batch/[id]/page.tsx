import { dummyBatches, dummyInstructors, dummyStudents } from "@/lib/static";
import React from "react";
import BatchDetails from "../../../../_components/batch-details";

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
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const batch = dummyBatches.find((batch) => batch.id === id);
  const students = dummyStudents.filter((stud) => stud.batchId === id);

  return (
    <main className="w-screen flex">
      <BatchDetails
        batch={batch}
        dummyInstructors={dummyInstructors}
        dummyModules={batchModules}
        dummyStudents={students}
      />
    </main>
  );
};

export default BatchDetailsPage;
