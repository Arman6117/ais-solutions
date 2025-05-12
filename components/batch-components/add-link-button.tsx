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

const AddLinkButton = ({
  notesLinks,
  setNotesLinks,
}: {
  notesLinks: any[];
  setNotesLinks: (links: any[]) => void;
}) => {
  const [linkLabel, setLinkLabel] = useState("");
  const [link, setLink] = useState("");
  //   const newLink = [{ linkLabel, link }];
  const createLink = () => {
    const newLink = { linkLabel, link };
    setNotesLinks([...notesLinks, newLink]); // <-- Triggers re-render
    console.log("Added");
    setLinkLabel(""); // Reset inputs if needed
    setLink("");
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
