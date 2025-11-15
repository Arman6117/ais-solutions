import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import React from "react";

type MeetingDeleteDialogProps = {
  onDelete: () => void;
};
const MeetingDeleteDialog = ({ onDelete }: MeetingDeleteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-destructive opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Trash2 className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this meeting This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-5 sm:gap-3">
          <DialogClose>Cancel</DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDeleteDialog;
