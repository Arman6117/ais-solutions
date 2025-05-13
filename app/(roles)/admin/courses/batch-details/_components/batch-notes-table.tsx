"use client";
import NotesTable from "@/components/notes-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type BatchNotesTable = {
  mode: "view" | "edit";
  batchId: string;
};

interface Attachment {
  id: string;
  type: "link" | "file";
  url: string;
  name: string;
}

export interface Note {
  id: string;
  moduleId: string;
  moduleName: string;
  chapterName: string;
  lectureDate: string;
  attachments: Attachment[];
}
const notesData = [
  {
    id: "note-1",
    module: "Module 1",
    chapter: "Introduction",
    dateCreated: "2025-04-01",
    videoLinks: [
      {
        id: 1,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
      {
        id: 2,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
    ],
    files: ["intro.pdf", "welcome.zip"],
  },
  {
    id: "note-2",
    module: "Module 2",
    chapter: "Getting Started",
    dateCreated: "2025-04-03",
    videoLinks: [
      {
        id: 1,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
      {
        id: 2,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
    ],
    files: ["start-guide.docx"],
  },
  {
    id: "note-3",
    module: "Module 2",
    chapter: "Variables & Types",
    dateCreated: "2025-04-05",
    videoLinks: [
      {
        id: 1,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
      {
        id: 2,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
    ],
    files: ["types.pptx", "examples.zip"],
  },
  {
    id: "note-4",
    module: "Module 3",
    chapter: "Functions",
    dateCreated: "2025-04-10",
    videoLinks: [
      {
        id: 1,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
      {
        id: 2,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
    ],
    files: ["functions.pdf"],
  },
  {
    id: "note-5",
    module: "Module 4",
    chapter: "Arrays & Loops",
    dateCreated: "2025-04-14",
    videoLinks: [
      {
        id: 1,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
      {
        id: 2,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
    ],
    files: ["arrays-loops.docx"],
  },
  {
    id: "note-6",
    module: "Module 5",
    chapter: "Final Project Setup",
    dateCreated: "2025-04-20",
    videoLinks: [
      {
        id: 1,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
      {
        id: 2,
        label: "Lecture note",
        link: "https://youtu.be/xvFZjo5PgG0?si=OHvO2GhgCeqSRdDn",
      },
    ],
    files: ["project-setup.zip"],
  },
];

const BatchNotesTable = ({ batchId, mode }: BatchNotesTable) => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <Card className="border-0 w-full shadow-md p-0 mb-10 overflow-hidden mt-">
        <CardHeader
          className={cn(
            "px-8 py-6 flex justify-between",
            mode === "view"
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
              : "bg-gray-50 border-b"
          )}
        >
          <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
            Notes
          </CardTitle>

          <div>
            <Button
              className="bg-white hover:bg-purple-50 text-black cursor-pointer"
              onClick={() => setIsCreating(true)}
            >
              Create Note
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <NotesTable
            notes={notesData}
            role="admin"
            mode={mode}
            batchId={batchId}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default BatchNotesTable;
