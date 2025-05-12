import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Pencil, PencilIcon, PlusIcon, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import NewNoteForm from "./batch-components/new-note-form";
import AddLinkButton from "./batch-components/add-link-button";

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
  const createNewNote = (newNote: any) => {
    notes.push(newNote);
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="items-center text-base font-semibold">
            <TableHead className="text-center  w-12">
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
          {notes.map((note, i) => (
            <TableRow key={i} className="text-center  text-sm font-medium">
              <TableCell className="text-center">
                <Checkbox />
              </TableCell>

              <TableCell className="text-center">{note.module}</TableCell>
              <TableCell className="text-center">{note.chapter}</TableCell>
              <TableCell className="text-center">{note.dateCreated}</TableCell>
              <TableCell className="text-center truncate max-w-44 ">
                {note.videoLinks.map((i: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2 pb-2 border-b-[1px]">
                      <div className="flex gap-2 items-center">
                        {i.label}
                        {mode === "edit" && (
                          <div className="flex  items-center">
                            <Button
                              variant={"ghost"}
                              className="cursor-pointer "
                              size={"icon"}
                            >
                              <Pencil className="size-4 text-violet-600" />
                            </Button>
                            <Button
                              variant={"ghost"}
                              className="cursor-pointer p "
                              size={"icon"}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* <Separator /> */}
                  </div>
                ))}
                {mode === "edit" && (
                  <AddLinkButton notesLinks={note.videoLinks}/>
                
                )}
              </TableCell>
              <TableCell className="text-center">
                {note.files.map((i: any) => (
                  <div
                    key={i}
                    className="flex items-center justify-center  flex-col gap-4"
                  >
                    <div className="flex flex-col gap-2 pb-2 border-b-[1px] ">
                      <div className="flex gap-2 items-center truncate">
                        <span className="truncate max-w-40">{i}</span>
                        {mode === "edit" && (
                          <div className="flex  items-center">
                            <Button
                              variant={"ghost"}
                              className="cursor-pointer "
                              size={"icon"}
                            >
                              <Pencil className="size-4 text-violet-600" />
                            </Button>
                            <Button
                              variant={"ghost"}
                              className="cursor-pointer p "
                              size={"icon"}
                            >
                              <Trash2 className="size-4 text-destructive" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* <Separator /> */}
                  </div>
                ))}
                {mode === "edit" && (
                  <Button
                    size={"sm"}
                    className="cursor-pointer mt-4 bg-primary-bg"
                  >
                    Add File
                  </Button>
                )}
              </TableCell>
              <TableCell className="text-center h-fit  flex gap-2 justify-center items-center">
                <Button
                  className="flex items-center  size-7 justify-center rounded-full cursor-pointer hover:bg-primary-bg hover:text-white"
                  variant="outline"
                  // onClick={() =>
                  //   // router.push(`${href}/${getRowId(item)}?mode=edit`)
                  // }
                >
                  <PencilIcon className="size-4" />
                </Button>
                <Button
                  className="flex items-center size-7 justify-center rounded-full cursor-pointer hover:bg-destructive hover:text-white"
                  variant="outline"
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default NotesTable;
