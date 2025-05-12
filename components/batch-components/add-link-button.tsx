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

const AddLinkButton = ({ notesLinks }: { notesLinks: any[] }) => {
  const [linkLabel, setLinkLabel] = useState("");
  const [link, setLink] = useState("");
  const newLink = [{ linkLabel, link }];
  const createLink = () => {
    notesLinks.push(newLink);
    console.log("Added")
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="cursor-pointer my-2 bg-primary-bg">
          Add link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Video link</DialogTitle>
        </DialogHeader>
        <AddLinkDialog
          label={linkLabel}
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
