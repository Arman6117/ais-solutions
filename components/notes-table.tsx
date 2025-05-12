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

type NotesTableProps = {
  mode: "view" | "edit";
  role: "admin" | "student";
  notes: any[];
  batchId: string;
};

const NotesTable = ({ batchId, mode, notes, role }: NotesTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="items-center">
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
          {notes.map((note, i) => (
            <TableRow key={i} className="text-center">
              <TableCell className="text-center">
                <Checkbox />
              </TableCell>
              <TableCell className="text-center">{note.module}</TableCell>
              <TableCell className="text-center">{note.chapter}</TableCell>
              <TableCell className="text-center">{note.dateCreated}</TableCell>
              <TableCell className="text-center truncate max-w-44 ">
                {note.videoLinks.map((i: any) => (
                  <div key={i.id} className="flex flex-col gap-4">
                    <div  className="flex flex-col gap-2">
                      {i.label}
                    </div>

                    <Separator />
                  </div>
                ))}
              </TableCell>
              <TableCell className="text-center">{note.files}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default NotesTable;
