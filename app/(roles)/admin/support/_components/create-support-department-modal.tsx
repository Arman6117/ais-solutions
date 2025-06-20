"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Building2,
  Laptop,
  Phone,
  Users,
  ShieldCheck,
  HelpCircle,
  MessageCircle,
  BookOpen,
  FileText,
  Briefcase,
  Wrench,
  Globe,
} from "lucide-react";
import { useSupportDepartmentStore } from "@/store/use-support-deparment-store";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

const ICONS = [
  { label: "Building", value: "Building2", icon: <Building2 className="size-4" /> },
  { label: "Laptop", value: "Laptop", icon: <Laptop className="size-4" /> },
  { label: "Phone", value: "Phone", icon: <Phone className="size-4" /> },
  { label: "Users", value: "Users", icon: <Users className="size-4" /> },
  { label: "Shield", value: "ShieldCheck", icon: <ShieldCheck className="size-4" /> },
  { label: "Help", value: "HelpCircle", icon: <HelpCircle className="size-4" /> },
  { label: "Chat", value: "MessageCircle", icon: <MessageCircle className="size-4" /> },
  { label: "Docs", value: "FileText", icon: <FileText className="size-4" /> },
  { label: "Knowledge", value: "BookOpen", icon: <BookOpen className="size-4" /> },
  { label: "HR", value: "Briefcase", icon: <Briefcase className="size-4" /> },
  { label: "Support", value: "Wrench", icon: <Wrench className="size-4" /> },
  { label: "Web", value: "Globe", icon: <Globe className="size-4" /> },
];

const COLORS = [
  { name: "Blue", value: "from-blue-500 to-blue-700" },
  { name: "Purple", value: "from-purple-500 to-purple-700" },
  { name: "Green", value: "from-green-500 to-green-700" },
  { name: "Teal", value: "from-teal-500 to-teal-700" },
  { name: "Orange", value: "from-orange-500 to-orange-700" },
  { name: "Pink", value: "from-pink-500 to-pink-700" },
];

const CreateSupportDepartmentModal = () => {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");
  const {addDepartment} = useSupportDepartmentStore()

  const handleSubmit = () => {
    const payload = {
       id: uuidv4(),
       name:departmentName,
      icon,
      color,
    };
   addDepartment(payload)
    console.log("Creating Support Department:", payload);
    // 🔗 Send to backend or update state
    setOpen(false);
    setDepartmentName("");
    setIcon("");
    setColor("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary-bg">+ Create Support Department</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Department</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {/* Department Name */}
          <div>
            <Label>Department Name</Label>
            <Input
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="e.g., Back Office"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <Label>Choose Icon</Label>
            <Select onValueChange={(val) => setIcon(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent>
                {ICONS.map((ic) => (
                 <SelectItem key={ic.value} value={ic.value}>
                    <div className="flex items-center gap-2">
                      {ic.icon}
                      {ic.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div>
            <Label>Choose Color</Label>
            <Select onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {COLORS.map((col) => (
                  <SelectItem key={col.value} value={col.value}>
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${col.value} mr-2 inline-block`} />
                    {col.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-primary-bg ml-auto">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSupportDepartmentModal;
