
import { NotesTable } from "@/components/notes-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

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
const DUMMY_NOTES:Note[] = [
  {
    id: "1",
    moduleId: "m1",
    moduleName: "React Fundamentals",
    chapterName: "Components & Props",
    lectureDate: "2024-03-15",
    attachments: [
      {
        id: "a1",
        type: "link",
        url: "https://youtube.com/watch?v=123",
        name: "Lecture Recording",
      },
      {
        id: "a2",
        type: "file",
        url: "/files/react-basics.pdf",
        name: "Lecture Notes.pdf",
      },
    ],
  },
  {
    id: "2",
    moduleId: "m2",
    moduleName: "State Management",
    chapterName: "Redux Overview",
    lectureDate: "2024-03-16",
    attachments: [
      {
        id: "a3",
        type: "link",
        url: "https://youtube.com/watch?v=456",
        name: "Redux Tutorial",
      },
    ],
  },
];
const BatchNotesTable = ({ batchId, mode }: BatchNotesTable) => {
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
            <Button className="bg-white hover:bg-purple-50 text-black cursor-pointer">
              Add Student
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <NotesTable
            // notes={DUMMY_NOTES}
            // role="admin"
            // mode={mode}
            // batchId={batchId}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default BatchNotesTable;
