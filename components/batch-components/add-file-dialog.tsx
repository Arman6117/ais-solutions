"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { FilesType } from "@/lib/types/note.type";

type AddFileDialogProps = {
  label: string;
  fileLink: string;
  setFileLabel: (label: string) => void;
  setFileLink: (link: string) => void;
  onAddFile?: (file: FilesType) => void;
  createFile?: () => void;
};

const AddFileDialog = ({
  label,
  fileLink,
  setFileLabel,
  setFileLink,
  onAddFile,
  createFile,
}: AddFileDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSave = () => {
    if (!label.trim() || !fileLink.trim()) {
      toast.error("Please enter both label and file link");
      return;
    }

    if (onAddFile) {
      onAddFile({
        label: label.trim(),
        link: fileLink.trim(),
      });
    }

    if (createFile) {
      createFile();
    }

    toast.success("File added");
    
    if (setFileLabel && setFileLink) {
      setFileLabel("");
      setFileLink("");
    }
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-1">
          <Plus className="mr-2 h-3 w-3" />
          Add File
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a File</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-7 py-4">
          <div className="flex flex-col gap-2">
            <Label className="text-lg">Label</Label>
            <Input
              className="focus-visible:ring-0"
              placeholder="Enter file label..."
              required
              value={label}
              onChange={(e) => setFileLabel && setFileLabel(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Label className="text-lg">File Link</Label>
            <Input
              className="focus-visible:ring-0"
              placeholder="Enter file URL..."
              required
              value={fileLink}
              type="url"
              onChange={(e) => setFileLink && setFileLink(e.target.value)}
            />
          </div>
          
          <div className="flex gap-5">
            <DialogClose asChild>
              <Button onClick={handleSave} className="bg-primary-bg cursor-pointer">
                Save
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="ghost" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFileDialog;