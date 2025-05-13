"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Pencil, PlusIcon, Trash2 } from "lucide-react";
import NewNoteForm from "./batch-components/new-note-form";
import AddLinkButton from "./batch-components/add-link-button";
import { FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";

type NotesTableProps = {
  mode: "view" | "edit";
  role: "admin" | "student";
  notes: any[];
  batchId: string;
  isCreating: boolean;
  setIsCreating: (state: boolean) => void;
};

const NotesTable = ({
  batchId,
  mode,
  notes,
  role,
  isCreating,
  setIsCreating,
}: NotesTableProps) => {
  const [noteList, setNoteList] = useState(notes);
  const router = useRouter();
  const updateNoteLinks = (noteIndex: number, newLinks: any[]) => {
    const updatedNotes = [...noteList];
    updatedNotes[noteIndex].videoLinks = newLinks;
    setNoteList(updatedNotes);
  };

  const createNewNote = (newNote: any) => {
    setNoteList([newNote, ...noteList]);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="items-center text-base font-semibold">
          <TableHead className="text-center w-12">
            <Checkbox />
          </TableHead>
          <TableHead className="text-center">Module</TableHead>
          <TableHead className="text-center">Chapter</TableHead>
          <TableHead className="text-center">Date Created</TableHead>
          <TableHead className="text-center">Video Link</TableHead>
          <TableHead className="text-center">Files</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isCreating && (
          <NewNoteForm
            setIsCreating={setIsCreating}
            createNewNote={createNewNote}
          />
        )}

        {noteList.map((note, i) => (
          <TableRow key={i} className="text-center text-sm font-medium">
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>{note.module}</TableCell>
            <TableCell>{note.chapter}</TableCell>
            <TableCell>{note.dateCreated}</TableCell>

            <TableCell className="text-center truncate max-w-44">
              <div className="flex flex-col items-center gap-4">
                {(note.videoLinks || []).map((v: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full gap-2 border-b pb-2"
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => window.open(v.link)}
                    >
                      <FaYoutube className="text-purple-600" />
                      <span className="truncate">{v.label}</span>
                    </div>
                    {mode === "edit" && (
                      <div className="flex gap-">
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                          <Pencil className="size-4 text-violet-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {mode === "edit" && (
                  <AddLinkButton
                    notesLinks={note.videoLinks || []}
                    setNotesLinks={(newLinks) => updateNoteLinks(i, newLinks)}
                  />
                )}
              </div>
            </TableCell>

            {/* FILES */}
            <TableCell>
              <div className="flex flex-col items-center gap-4">
                {(note.files || []).map((f: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full gap-2 border-b pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-40">{f}</span>
                    </div>
                    {mode === "edit" && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Pencil className="size-4 text-violet-600" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {mode === "edit" && (
                  <Button size="sm" className="mt-2 bg-primary-bg">
                    Add File
                  </Button>
                )}
              </div>
            </TableCell>

            {/* ROW ACTIONS */}
            <TableCell>
              <div className="flex justify-center gap-2">
                <Button size="icon" variant="outline">
                  <Pencil className="size-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NotesTable;
