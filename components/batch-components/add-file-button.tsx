"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { FilesType } from "@/lib/types/note.type";
import AddFileDialog from "./add-file-dialog";

type AddFileButtonProps = {
  notesFiles: FilesType[];
  setNotesFiles: (files: FilesType[]) => void;
};

const AddFileButton = ({ notesFiles, setNotesFiles }: AddFileButtonProps) => {
  const [fileLabel, setFileLabel] = useState("");
  const [fileLink, setFileLink] = useState("");

  const onAddFile = (file:FilesType) => {
    if (file.label && file.link) {
      setNotesFiles([...notesFiles, { label:file.label, link: file.link }]);
      setFileLabel("");
      setFileLink("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="mt-2 bg-primary-bg">
          <Plus className="mr-2 h-3 w-3" />
          Add File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a File</DialogTitle>
        </DialogHeader>
        <AddFileDialog
          label={fileLabel}
          fileLink={fileLink}
          setFileLabel={setFileLabel}
          setFileLink={setFileLink}
          onAddFile={onAddFile}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddFileButton;