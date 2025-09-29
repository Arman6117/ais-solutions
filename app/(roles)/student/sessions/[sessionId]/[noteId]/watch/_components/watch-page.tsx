"use client"; // Make the page a client component for easy testing

import { NoteData } from "@/lib/types/types";
import React, { useEffect, useState } from "react";
import NoteContentPlayer from "./note-content-player";
import { toast } from "sonner";
import { getNotesById } from "@/actions/admin/notes/get-notes";
import { AlertTriangle } from "lucide-react";

// ----------------------------------------------------

// This is a temporary component for testing the UI
const WatchPageComponent = ({
  // noteId,
  sessionId,
}: {
  // noteId: string;
  sessionId: string;
}) => {
  const [notesData, setNotesData] = useState<NoteData[]>([]);
  // We don't need to fetch data, just use the dummy object
  const fetchNotes = async () => {
    try {
      const res = await getNotesById(sessionId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setNotesData(res.data);
      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  // console.log(notesData)
  return (
    <div className="container mx-auto py-8">
      {notesData.length === 0 && (
        <div className="h-full items-center justify-center flex flex-col">
          <AlertTriangle className="text-primary-bg w-12 h-12 opacity-60 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            No Notes Found
          </h2>
        </div>
      )}
      {notesData.map((note) => (
        <NoteContentPlayer key={note._id} note={note} sessionId={sessionId} />
      ))}
    </div>
  );
};

export default WatchPageComponent;
