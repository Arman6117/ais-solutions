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
            <TableHead className="text-center">Files</TableHead>
            <TableHead className="text-center">Actions</TableHead>
            {/* <TableHead>Video Link</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {notes.map((note, i) => (
            <TableRow key={i} className="text-center">
              <TableCell className="text-center">
                <Checkbox />
              </TableCell>
              <TableCell className="text-center">{note.moduleName}</TableCell>
              <TableCell className="text-center">{note.chapterName}</TableCell>
              <TableCell className="text-center">{note.lectureDate}</TableCell>
              {note.attachments.map((atc: any) => (
                <TableCell className="text-center" key={atc.id}>{atc.name}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default NotesTable;
