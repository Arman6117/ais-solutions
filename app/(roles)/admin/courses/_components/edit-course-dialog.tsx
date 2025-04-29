import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Course } from "@/lib/types";
import React from "react";

type EditCourseDialogProps = {
  open: boolean;
  onClose: () => void;
  data: Course[];
};
const EditCourseDialog = ({ open, onClose, data }: EditCourseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Edit the course details here. You can change the name,
            description,price and View the modules and batches
          </DialogDescription>
        </DialogHeader>
        {/* <DialogClose>Close</DialogClose> */}
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseDialog;
