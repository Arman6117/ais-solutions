"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { CreateDepartmentPayload } from "@/lib/types/support.type";
import { createSupportDepartment } from "@/actions/admin/support/create-support-department";

// Predefined pools for random assignment
const ICON_KEYS = [
  "Building2", "Laptop", "Phone", "Users", "ShieldCheck", 
  "HelpCircle", "MessageCircle", "FileText", "BookOpen", 
  "Briefcase", "Wrench", "Globe"
];

const COLOR_CLASSES = [
  "bg-gradient-to-br from-blue-500 to-blue-700",
  "bg-gradient-to-br from-purple-500 to-purple-700",
  "bg-gradient-to-br from-green-500 to-green-700",
  "bg-gradient-to-br from-teal-500 to-teal-700",
  "bg-gradient-to-br from-orange-500 to-orange-700",
  "bg-gradient-to-br from-pink-500 to-pink-700",
  "bg-gradient-to-br from-indigo-500 to-indigo-700",
  "bg-gradient-to-br from-rose-500 to-rose-700",
];

const CreateSupportDepartmentModal = () => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async () => {
    if (!departmentName.trim()) {
        toast.warning("Please enter a department name.");
        return;
    }
    
    setIsLoading(true);

    // Randomly assign visual identity
    const randomIcon = ICON_KEYS[Math.floor(Math.random() * ICON_KEYS.length)];
    const randomColor = COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)];

    const payload: CreateDepartmentPayload = {
      name: departmentName,
      icon: randomIcon,
      color: randomColor,
    };
    
    // Call the server action
    const result = await createSupportDepartment(payload);

    if (result.success) {
      toast.success(result.message);
      router.refresh(); // Refresh server components to show the new data
      setOpen(false);
      setDepartmentName("");
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Department
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Department</DialogTitle>
          <DialogDescription>
            Add a new support team. We&apos;ll automatically assign a unique icon and theme.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="space-y-2">
            <Label htmlFor="dept-name">Department Name</Label>
            <Input
              id="dept-name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="e.g., Customer Success"
              className="col-span-3"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!departmentName.trim() || isLoading}>
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Create Department
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSupportDepartmentModal;
