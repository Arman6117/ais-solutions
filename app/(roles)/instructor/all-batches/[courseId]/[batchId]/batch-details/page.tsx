import {  batchModules, dummyInstructors } from "@/lib/static";
import React from "react";
import { getBatchById } from "@/actions/admin/batches/get-batch-by-id";
import InstructorBatchDetails from "./_components/instructor-batch-details";


const BatchDetailsPage = async ({
  params,
}: {
  params: Promise<{ batchId: string,courseId:string }>;
}) => {
  const id = (await params).batchId;
  const courseId = (await params).courseId;
  const  res = await getBatchById(id);
 
  if(!res.success) {
    return (
      <h1>No batch</h1>
    )
  }
  return (
    <main className="w-screen flex">
    
      <InstructorBatchDetails
        batch={res.data!}
        dummyInstructors={dummyInstructors}
        dummyModules={batchModules}
      
        courseId={courseId}
      />
    </main>
  );
};

export default BatchDetailsPage;
