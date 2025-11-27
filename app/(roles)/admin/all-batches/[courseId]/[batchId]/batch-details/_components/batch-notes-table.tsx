"use client";
import { getNotesTable } from "@/actions/admin/notes/get-notes";
import NotesTable from "@/components/notes-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteTableType } from "@/lib/types/note.type";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type BatchNotesTable = {
  mode: "view" | "edit" | "create";
  batchId: string;
};


type BatchNotesTableProps = {
  mode: "view" | "edit" | "create";
  batchId: string;
  courseId:string
};
const BatchNotesTable = ({ batchId, mode,courseId }: BatchNotesTableProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notes, setNotes] = useState<NoteTableType[]>([]);

  const fetchNotes = async () => {
    try {
      const res = await getNotesTable(batchId);
   
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setNotes(res.data);
      toast.success(res.message);
    } catch (error) {
      toast.error("Failed to fetch notes");
      console.log("Error fetching notes:", error);
    }
  };
  useEffect(() => {
    fetchNotes();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card className="border-0 w-full shadow-md p-0 mb-10 overflow-hidden">
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
          notes={notes}
          role="admin"
          mode={mode}
          courseId={courseId}
          batchId={batchId}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
        />
      </CardContent>
    </Card>
  );
};

export default BatchNotesTable;
