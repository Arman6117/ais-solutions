"use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   Dialog,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Skeleton } from "@/components/ui/skeleton";
// import { dummyInstructors } from "@/lib/static";
// import { DummyInstructors } from "@/lib/types/types";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import { Plus } from "lucide-react";
// import React, { useState } from "react";
// import { toast } from "sonner";
// import InstructorHoverCard from "./instructor-hover-card";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

const AddInstructorButton = (
//   setInstructor,
//   className,
//   showLabel,
// }: {
//   setInstructor: (instructorOrUpdater: any) => void;
//   className?: string;
//   showLabel: boolean;
) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [found, setFound] = useState<DummyInstructors | null>(null);
//   const [error, setError] = useState("");
//   const [open, setOpen] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const handleSearch = () => {
//     setLoading(true);
//     setFound(null);
//     setError("");
//     setTimeout(() => {
//       const instructor = dummyInstructors.find((i) => i.email === email);
//       if (instructor) setFound(instructor);
//       else setError("No instructor found with this email");
//       setLoading(false);
//     }, 1000);
//   };

//   const handleAdd = () => {
//     if (found) {
//       // Add a unique ID if it doesn't exist
//       const instructorToAdd = {
//         ...found,
//         id: found.id || `instructor-${Date.now()}`,
//       };

//       setInstructor(instructorToAdd);

//       console.log("Added instructor:", instructorToAdd);
//       toast.success(`${found?.name} has been added.`);
//       setFound(null);
//       setEmail("");
//       setOpen(false);
//       setDialogOpen(false);
//     }
//   };

//   const handleReset = () => {
//     setFound(null);
//     setEmail("");
//     setError("");
//     setOpen(false);
//   };

  return (
 <>
</>
//       <Dialog
//         open={dialogOpen}
//         onOpenChange={(isOpen) => {
//           setDialogOpen(isOpen);
//           if (!isOpen) handleReset();
//         }}
//       >
//         <DialogTrigger asChild>
//           <Button
//             size="sm"
//             className={cn("flex items-center gap-2 cursor-pointer bg-violet-600 hover:bg-violet-700 text-white shadow-sm ",className)}
//           >
//             <Plus size={16} />
//             {showLabel && <span>Add Instructor</span>}
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden">
//           <DialogHeader>
//             <DialogTitle>Add Instructor</DialogTitle>
//             <DialogDescription>
//               Add Instructors by using email
//             </DialogDescription>
//           </DialogHeader>
//           <div className="flex flex-col gap-2 mt-2">
//             <div className="flex flex-col sm:flex-row gap-2">
//               <Input
//                 className="flex-1"
//                 placeholder="Search instructor by email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//               />
//               <Button
//                 className="bg-primary-bg whitespace-nowrap"
//                 onClick={handleSearch}
//               >
//                 Search
//               </Button>
//             </div>
//           </div>
//           {loading && (
//             <Skeleton className="w-full h-24 flex items-center p-5 rounded-lg mt-4">
//               <div className="flex justify-between items-center w-full">
//                 <div className="size-12 rounded-full bg-gray-300"></div>
//                 <div className="flex flex-col gap-3">
//                   <div className="w-20 sm:w-56 rounded-full h-3 bg-gray-400"></div>
//                   <div className="w-24 sm:w-64 rounded-full h-3 bg-gray-400"></div>
//                 </div>
//                 <div className="size-12 rounded-md bg-gray-300"></div>
//               </div>
//             </Skeleton>
//           )}
//           {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
//           {found && (
//             <Popover open={open} onOpenChange={setOpen}>
//               <PopoverTrigger asChild>
//                 <div className="w-full cursor-pointer mt-4 border border-gray-100 shadow-lg flex items-center justify-between p-3 sm:p-5 rounded-lg hover:bg-gray-50">
//                   <div className="flex gap-3 sm:gap-6 items-center">
//                     <Avatar className="size-10 sm:size-12">
//                       <AvatarImage
//                         src={found.avatar}
//                         className="object-cover"
//                       />
//                       <AvatarFallback>{found.name[0]}</AvatarFallback>
//                     </Avatar>
//                     <div className="flex flex-col">
//                       <p className="font-medium text-sm sm:text-base">
//                         {found.name}
//                       </p>
//                       <p className="font-medium text-xs sm:text-sm text-muted-foreground">
//                         {found.email}
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     className="rounded-md bg-primary-bg ml-2"
//                     onClick={handleAdd}
//                     size="sm"
//                   >
//                     Add
//                   </Button>
//                 </div>
//               </PopoverTrigger>
//               <PopoverContent
//                 align="end"
//                 alignOffset={-50}
//                 className="w-[280px] sm:w-[350px] md:w-96 max-h-80 overflow-y-auto p-0 bg-white border border-gray-200 rounded-lg shadow-lg"
//                 style={{ overflowY: "scroll" }}
//               >
//                 <InstructorHoverCard instructor={found} />
//               </PopoverContent>
//             </Popover>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
  );

};

export default AddInstructorButton;
