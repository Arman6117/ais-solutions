"use client"; // Make the page a client component for easy testing

import { NoteData } from "@/lib/types/types";
import React from "react";
import NoteContentPlayer from "./note-content-player";
 

// --- PASTE THE DUMMY DATA OBJECT HERE OR IMPORT IT ---
const dummyNoteData: NoteData = {
  _id: "note_12345",
  title: "Introduction to React State Management",
  description: "This note covers the fundamental concepts of state management in React, including the useState and useEffect hooks, and when to reach for more advanced solutions.",
  videoLinks: [
    { _id: "vid_001", title: "Understanding the useState Hook", url: "https://www.youtube.com/watch?v=O6P86uwfdR0" },
    { _id: "vid_002", title: "Deep Dive into the useEffect Hook", url: "https://www.youtube.com/watch?v=0ZJgIjIuY7U" },
    { _id: "vid_003", title: "Props vs. State Explained", url: "https://www.youtube.com/watch?v=IYvD9oBCuJI" },
  ],
  fileLinks: [
    { _id: "file_001", title: "Course Slides (PDF)", url: "#" },
    { _id: "file_002", title: "Project Starter Files (ZIP)", url: "#" },
    { _id: "file_003", title: "Further Reading & Resources", url: "#" },
  ],
};
// ----------------------------------------------------


// This is a temporary component for testing the UI
const WatchPageForTesting = () => {
  // We don't need to fetch data, just use the dummy object
  const noteData = dummyNoteData;
  const sessionId = "test_session_123";

  return (
    <div className="container mx-auto py-8">
      {/* Pass the dummy data directly into your component's props */}
      <NoteContentPlayer note={noteData} sessionId={sessionId} />
    </div>
  );
};

export default WatchPageForTesting;