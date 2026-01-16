"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteDepartment } from "@/actions/admin/support/delete-support-card";

type DeleteDepartmentButtonProps = {
  departmentId: string;
  departmentName: string;
};

const DeleteDepartmentButton = ({
  departmentId,
  departmentName,
}: DeleteDepartmentButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    // Prevent event propagation if this button is placed inside a clickable accordion trigger
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);

    try {
      const result = await deleteDepartment(departmentId);
      
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          onClick={(e) => e.stopPropagation()} // Prevent accordion toggle when clicking delete
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete Department</span>
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Department?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className="font-semibold text-foreground">{departmentName}</span>?
            <br /><br />
            <span className="text-red-600 font-medium">Warning:</span> This action cannot be undone and will permanently remove all support members assigned to this department.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Department"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDepartmentButton;