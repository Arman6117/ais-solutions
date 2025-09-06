"use client";
// import React, { useState } from "react";
// import { Badge } from "../../../../../components/ui/badge";
// import { Minus, Plus } from "lucide-react";
// import { Button } from "../../../../../components/ui/button";
// import { toast } from "sonner";
// import { dummyModules } from "@/lib/static";

// type EditCourseInstructorModules = {
//   dummyModules: typeof dummyModules[0][];
//   remainingModules: any[];
// };

const EditCourseInstructorModules = (
  // dummyModules,
  // remainingModules,
 ) => {
  // const [assignedModules, setAssignedModules] = useState(dummyModules);
  // const [availableModules, setAvailableModules] = useState(remainingModules);
  // const [showAvailableModules, setShowAvailableModules] = useState(false);
  // const handleAssignModule = (module: string) => {
  //   //TODO:Make an API Call
  //   const existing = assignedModules.includes(module);
  //   if (existing) {
  //     toast.error("Module already present");
  //     return;
  //   }

  //   setAssignedModules((prev) => [...prev, module]);
  //   setAvailableModules((prev) => prev.filter((mod) => mod !== module));
  //   toast.success("Module added");
  // };

  // const handleRemoveModule = (module: string) => {
  //   //TODO:Make an API Call
  //   const existing = availableModules.includes(module);
  //   if (existing) {
  //     toast.error("Module does not exist");
  //     return;
  //   }

  //   setAssignedModules((prev) => prev.filter((mod) => mod !== module));
  //   setAvailableModules((prev) => [...prev, module]);

  //   toast.success("Module removed");
  // };
  // return (
  //   <div className="flex flex-col gap-3 mt-5">
  //     <h1 className="text-sm font-bold">Modules</h1>
  //     <div className="flex flex-wrap gap-2">
  //       {assignedModules.map((module, idx) => (
  //         <Badge
  //           key={idx}
  //           variant="outline"
  //           className="bg-violet-50 cursor-pointer transition-all text-violet-700 group border-violet-200 py-1 px-2 justify-center"
  //           onClick={() => handleRemoveModule(module)}
  //         >
  //           <Minus size={6} className="hidden group-hover:block" />
  //           {module}
  //         </Badge>
  //       ))}
  //       <Button
  //         variant={"outline"}
  //         size={"sm"}
  //         className="bg-violet-50 h-6 text-xs p-0 cursor-pointer text-violet-700 border-violet-200 justify-center"
  //         onClick={() => setShowAvailableModules((prev) => !prev)}
  //       >
  //         <Plus size={6} className="mr-1" />
  //         Assign Module
  //       </Button>
  //     </div>
  //     {showAvailableModules && (
  //       <div className="transition-all">
  //         <h1 className="text-sm font-bold mt-2">Available Modules</h1>
  //         <div className="flex flex-wrap gap-2 mt-2">
  //           {availableModules.map((module, idx) => (
  //             <Badge
  //               key={idx}
  //               variant="outline"
  //               className="bg-violet-50 cursor-pointer hover:text-violet-700 text-neutral-400 border-violet-200 py-1 px-2 justify-center"
  //               onClick={() => handleAssignModule(module)}
  //             >
  //               <Plus size={7} className="mr-1" />
  //               {module}
  //             </Badge>
  //           ))}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default EditCourseInstructorModules;
