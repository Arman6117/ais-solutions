import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

type DeleteConfirmationDialogProps = {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (state: boolean) => void;
  itemsToDelete: string[]; // Changed from number[]
  confirmDelete: () => void;
};

const DeleteConfirmationDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  itemsToDelete,
  confirmDelete,
}: DeleteConfirmationDialogProps) => {
  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            {itemsToDelete.length === 1
              ? "this note"
              : `these ${itemsToDelete.length} notes`}
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
