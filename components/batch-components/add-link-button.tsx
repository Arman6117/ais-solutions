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
import AddLinkDialog from "./add-link-dialog";
import { VideoLinksType } from "@/lib/types/note.type";

type AddLinkButtonProps = {
  notesLinks: VideoLinksType[];
  setNotesLinks: (links: VideoLinksType[]) => void;
};

const AddLinkButton = ({ notesLinks, setNotesLinks }: AddLinkButtonProps) => {
  const [label, setLinkLabel] = useState("");
  const [link, setLink] = useState("");

  const createLink = () => {
    if (!link || !label) return;
    const newLink = { label, link };
    setNotesLinks([...notesLinks, newLink]);
    setLinkLabel("");
    setLink("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="my-2 bg-primary-bg">
          Add link
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new video link</DialogTitle>
        </DialogHeader>
        <AddLinkDialog
          label={label}
          link={link}
          setLink={setLink}
          setLinkLabel={setLinkLabel}
          createLink={createLink}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkButton;
