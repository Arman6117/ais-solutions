"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";

type AddFileDialogProps = {
  onAddFile: (file: string) => void;
};

const AddFileDialog = ({ onAddFile }: AddFileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAdd = () => {
    if (selectedFile) {
      onAddFile(selectedFile.name);
      setSelectedFile(null);
      setOpen(false);
    }
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
          <DialogTitle>Upload a File</DialogTitle>
        </DialogHeader>

        <Input
          type="file"
          onChange={handleFileChange}
          accept="*"
          className="mt-4"
        />

        {selectedFile && (
          <p className="text-sm mt-2 text-muted-foreground">
            Selected: {selectedFile.name}
          </p>
        )}

        <Button
          onClick={handleAdd}
          disabled={!selectedFile}
          className="mt-6 w-full"
        >
          Upload
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddFileDialog;
