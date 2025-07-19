"use client";

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onDelete: (ids: string[]) => void;
  selectedIds?: string[];
  singleId?: string;
  className?:string
};

export default function DeleteDialog({ onDelete, selectedIds = [], singleId ,className}: Props) {
  const idsToDelete = singleId ? [singleId] : selectedIds;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(singleId ? "p-2 hover:bg-destructive rounded-full cursor-pointer hover:text-white" : "cursor-pointer",className )}
          variant={singleId ? "outline" : "destructive"}
          size={singleId ? "icon" : "sm"}
        >
          <Trash2 className="size-4" />
          {!singleId && <span className="ml-2">{selectedIds.length}</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. {idsToDelete.length} item{idsToDelete.length > 1 ? "s" : ""} will be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={() => onDelete(idsToDelete)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
