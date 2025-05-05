'use client'
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog, DialogDescription } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const AddInstructorButton = () => {
  const[email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const [found,setFound ] = useState(null)
  const [error,setError] = useState(null)

  return (
    
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="flex items-center gap-2 cursor-pointer bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
        >
          <Plus size={16} /> Add Instructor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Instructor</DialogTitle>
          <DialogDescription>Add Instructors by using email</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddInstructorButton;
