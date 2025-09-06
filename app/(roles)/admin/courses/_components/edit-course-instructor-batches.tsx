"use client";
// import { Calendar, Minus, Plus, Users } from "lucide-react";
// import React, { useState } from "react";
// import { Button } from "../../../../../components/ui/button";
// import { ScrollArea } from "../../../../../components/ui/scroll-area";
// import { toast } from "sonner";


const EditCourseInstructorBatches = (
  // availableBatches,
  // dummyBatches,
) => {
  // const [assignedBatches, setAssignedBatches] = useState(dummyBatches);
  // const [unassignedBatches, setUnassignedBatches] = useState(availableBatches);
  // const [showAvailableBatches, setShowAvailableBatches] = useState(false);
  // const handleAssignBatch = (batch: any) => {
  //   //TODO: Make an API Call
  //   const existing = assignedBatches.some((b) => b.name === batch.name);
  //   if (existing) {
  //     toast.error("Batch already assigned");
  //     return;
  //   }

  //   setAssignedBatches((prev) => [...prev, batch]);
  //   setUnassignedBatches((prev) => prev.filter((b) => b.name !== batch.name));
  //   toast.success("Batch assigned");
  // };

  // const handleRemoveBatch = (batch: any) => {
  //   //TODO: Make an API Call
  //   const existing = unassignedBatches.some((b) => b.name === batch.name);
  //   if (existing) {
  //     toast.error("Batch is not assigned");
  //     return;
  //   }

  //   setAssignedBatches((prev) => prev.filter((b) => b.name !== batch.name));
  //   setUnassignedBatches((prev) => [...prev, batch]);
  //   toast.success("Batch removed");
  // };

  // return (
  //   <div className="flex flex-col gap-3 mt-5">
  //     <h1 className="text-sm font-bold">Batches</h1>
  //     <div className="flex flex-col gap-2">
  //       {assignedBatches.map((batch, idx) => (
  //         <div
  //           key={idx}
  //           className="flex items-center justify-between p-2 rounded bg-violet-50 border border-violet-200 group hover:bg-violet-100 transition-all"
  //         >
  //           <div className="flex flex-col">
  //             <span className="font-medium text-violet-700">{batch.name}</span>
  //             <div className="flex items-center gap-4 text-xs text-neutral-500">
  //               <div className="flex items-center gap-1">
  //                 <Users size={12} />
  //                 <span>{batch.students} Students</span>
  //               </div>
  //               <div className="flex items-center gap-1">
  //                 <Calendar size={12} />
  //                 <span>{batch.period}</span>
  //               </div>
  //             </div>
  //           </div>
  //           <Button
  //             variant="ghost"
  //             size="sm"
  //             className="h-6 w-6 p-0 text-neutral-400 hover:text-red-500 hover:bg-red-50"
  //             onClick={() => handleRemoveBatch(batch)}
  //           >
  //             <Minus size={16} />
  //           </Button>
  //         </div>
  //       ))}
  //       <Button
  //         variant={"outline"}
  //         size={"sm"}
  //         className="mt-2 bg-violet-50 text-xs cursor-pointer text-violet-700 border-violet-200 justify-center"
  //         onClick={() => setShowAvailableBatches((prev) => !prev)}
  //       >
  //         <Plus size={6} className="mr-1" />
  //         Assign Batch
  //       </Button>
  //     </div>

  //     {showAvailableBatches && (
  //       <div className="transition-all">
  //         <h1 className="text-sm font-bold mt-2">Available Batches</h1>
  //         <div className="fle">
  //           <ScrollArea className="max-h-40 flex flex-col gap-2 mt-2 ">
  //             {unassignedBatches.map((batch, idx) => (
  //               <div
  //                 key={idx}
  //                 className="flex items-center justify-between p-2 rounded bg-white border border-violet-200 hover:bg-violet-50 transition-all cursor-pointer"
  //                 onClick={() => handleAssignBatch(batch)}
  //               >
  //                 <div className="flex flex-col">
  //                   <span className="font-medium text-neutral-600">
  //                     {batch.name}
  //                   </span>
  //                   <div className="flex items-center gap-4 text-xs text-neutral-500">
  //                     <div className="flex items-center gap-1">
  //                       <Users size={12} />
  //                       <span>{batch.students} Students</span>
  //                     </div>
  //                     <div className="flex items-center gap-1">
  //                       <Calendar size={12} />
  //                       <span>{batch.period}</span>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <Button
  //                   variant="ghost"
  //                   size="sm"
  //                   className="h-6 w-6 p-0 text-neutral-400 hover:text-violet-600"
  //                 >
  //                   <Plus size={16} />
  //                 </Button>
  //               </div>
  //             ))}
  //           </ScrollArea>
  //         </div>
  //       </div>
  //     )}
  //   </div>

};

export default EditCourseInstructorBatches;
