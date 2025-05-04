import React from "react";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "../../../../../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import EditCourseInstructorModules from "./edit-course-instructor-modules";
import EditCourseInstructorBatches from "./edit-course-instructor-batches";

import { Mail } from "lucide-react";
type EditInstructorDialogProps = {
  open: boolean;
  onClose: () => void;
  instructor: any;
};

const dummyBatches = [
  {
    name: "Morning Batch",
    students: 25,
    period: "May - Aug 2025",
  },
  {
    name: "Weekend Batch",
    students: 18,
    period: "Jun - Oct 2025",
  },
];

const availableBatches = [
  {
    name: "Evening Batch",
    students: 20,
    period: "Jun - Sep 2025",
  },
  {
    name: "Intensive Batch",
    students: 15,
    period: "Jul - Aug 2025",
  },
  {
    name: "Intensive Batch",
    students: 15,
    period: "Jul - Aug 2025",
  },
  {
    name: "Intensive Batch",
    students: 15,
    period: "Jul - Aug 2025",
  },
  {
    name: "Intensive Batch",
    students: 15,
    period: "Jul - Aug 2025",
  },
  {
    name: "Intensive Batch",
    students: 15,
    period: "Jul - Aug 2025",
  },
];

const dummyModules = [
  "Introduction to React",
  "Advanced React Patterns",
  "State Management",
  "React Performance",
];

const remainingModules = [
  "SSR in React",
  "React Testing",
  "React Router",
  "React Query",
];

const EditInstructorDialog = ({
  open,
  instructor,
  onClose,
}: EditInstructorDialogProps) => {
  if (!instructor) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-  items-center justify-center">
          <DialogHeader>
            <DialogTitle>Edit Instructor Details</DialogTitle>
          </DialogHeader>
          <Button className="bg-primary-bg ">
            <DialogClose className="w-full h-full cursor-pointer">
              No Instructor Selected
            </DialogClose>
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md ">
        <DialogHeader>
          <DialogTitle>Edit Instructor Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="bg-gradient-to-r rounded from-violet-600 to-indigo-600 text-white p-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-20 border-4 border-white/30">
                <AvatarImage
                  className="object-cover"
                  src={instructor.avatar}
                  alt={instructor.name}
                />
                <AvatarFallback className="bg-white/20 text-white font-medium text-xl">
                  {instructor.name.charAt(0) +
                    instructor.name.split(" ")[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{instructor.name}</h1>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <Mail size={14} />
                  <span>{instructor.email}</span>
                </div>
                {/* <div className="flex gap-2 mt-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                    {instructor.role || "Instructor"}
                  </Badge>
                  {instructor.isLead && (
                    <Badge className="bg-amber-500/80 hover:bg-amber-500/90 text-white border-none">
                      Lead
                    </Badge>
                  )}
                </div> */}
              </div>
            </div>
          </div>

          {/* Modules Section */}
          <EditCourseInstructorModules
            dummyModules={dummyModules}
            remainingModules={remainingModules}
          />

          {/* Batches Section */}
          <EditCourseInstructorBatches
            dummyBatches={dummyBatches}
            availableBatches={availableBatches}
          />

          <div className="flex cursor-pointer justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-neutral-200"
            >
              Cancel
            </Button>
            <Button className="bg-violet-600  cursor-pointer hover:bg-violet-700 text-white">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditInstructorDialog;
