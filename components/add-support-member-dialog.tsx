"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type SupportMember = {
  id?: string;
  name: string;
  designation: string;
  email: string;
  contact: string;
  availableTime: string;
};

type AddSupportMemberDialogProps = {
  triggerLabel?: string;
  initialData?: SupportMember;
  onSubmit: (member: SupportMember) => void;
};

const AddSupportMemberDialog = ({
  triggerLabel = "+ Add Member",
  initialData,
  onSubmit,
}: AddSupportMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  const [member, setMember] = useState<SupportMember>({
    name: "",
    designation: "",
    email: "",
    contact: "",
    availableTime: "",
  });

  // 👇 Sync state with initialData when dialog opens
  useEffect(() => {
    if (open) {
      setMember(
        initialData ?? {
          name: "",
          designation: "",
          email: "",
          contact: "",
          availableTime: "",
        }
      );
    }
  }, [open, initialData]);

  const handleChange = (field: keyof SupportMember, value: string) => {
    setMember((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(member);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto bg-primary-bg">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add"} Support Member
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={member.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Designation</Label>
            <Input
              value={member.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              value={member.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Contact</Label>
            <Input
              value={member.contact}
              onChange={(e) => handleChange("contact", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Available Time</Label>
            <Input
              value={member.availableTime}
              onChange={(e) => handleChange("availableTime", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-primary-bg ml-auto">
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupportMemberDialog;
