"use client"; // Make the page a client component for easy testing

import { NoteData } from "@/lib/types/types";
import React, { useEffect, useState } from "react";
import NoteContentPlayer from "./note-content-player";
import { toast } from "sonner";
import { getNotesById } from "@/actions/admin/notes/get-notes";

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
      {/* Pass the dummy data directly into your component's props */}
      {notesData.map((note) => (
        <NoteContentPlayer key={note._id} note={note} sessionId={sessionId} />
      ))}
    </div>
  );
};

export default WatchPageComponent;
