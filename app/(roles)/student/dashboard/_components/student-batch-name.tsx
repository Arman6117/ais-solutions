


import React from "react";
import { FaSchool } from "react-icons/fa";
export const revalidate = 60;

const StudentBatchName = ({ batchName }: { batchName: string }) => {

 

 
  // if (loading) return <BatchNameSkeleton />;
  if (!batchName) return null;

  return (
    <div className="flex gap-3">
      <div className="flex gap-1 items-center">
        <FaSchool className="text-neutral-500 size-[14px]" />
        <span className="text-sm mt-0.5 text-neutral-500">{batchName}</span>
      </div>
      {/* <div className="flex gap-1 items-center">
        <MdAlternateEmail className="text-neutral-500 size-[14px]" />
        <span className="text-sm mt-0.5 text-neutral-500">20 June 2025</span>
      </div> */}
    </div>
  );
};

export default StudentBatchName;