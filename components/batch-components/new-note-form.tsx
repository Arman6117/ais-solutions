"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddLinkDialog from "./add-link-dialog";

const NewNoteForm = ({
  setIsCreating,
  createNewNote,
}: {
  setIsCreating: (state: boolean) => void;
  createNewNote: (newNote: any) => void;
}) => {
  const [moduleName, setModuleName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [link, setLink] = useState("");
  // const [moduleName,setModuleName] = useState('');x
  const newNote = {
    module: moduleName,
    chapter: chapterName,
    dateCreated: dateCreated,
    videoLinks: [{ label: linkLabel, link: link }],
    files: ["a file"],
  };

  return (
    <>
      <TableRow className="text-center  text-sm font-medium">
        <TableCell className="text-center">
          <Checkbox />
        </TableCell>
        <TableCell>
          <Input
            className="focus-visible:ring-0 max-w-28 w-28"
            placeholder="Module Name"
            required
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            className="focus-visible:ring-0 max-w-28 w-28"
            placeholder="Chapter Name"
            required
            type="text"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Input
            className="focus-visible:ring-0 focus-visible:border-0 px-2"
            // placeholder="Chapter Name"
            required
            value={dateCreated}
            type="date"
            onChange={(e) => setDateCreated(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer" variant={"outline"}>
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new Video link</DialogTitle>
              </DialogHeader>
              <AddLinkDialog
                label={linkLabel}
                link={link}
                setLinkLabel={setLinkLabel}
                setLink={setLink}
              />
            </DialogContent>
          </Dialog>
        </TableCell>
        <TableCell>
          <Button className="cursor-pointer" variant={"outline"}>
            Add File
          </Button>
        </TableCell>
        <TableCell>
          <Button
            onClick={() => {
              setIsCreating(false);
              createNewNote(newNote);
            }}
          >
            Save
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default NewNoteForm;
