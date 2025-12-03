"use client";

import { NoteData } from "@/lib/types/types";
import React, { useEffect, useState } from "react";
import NoteContentPlayer from "./note-content-player";
import { toast } from "sonner";
import { getNotesById } from "@/actions/admin/notes/get-notes";
import { AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const WatchPageComponent = ({
  sessionId,
}: {
  sessionId: string;
}) => {
  const [notesData, setNotesData] = useState<NoteData[]>([]);

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

      <div className="flex flex-col gap-7">
        {notesData.map((note, index) => (
          <div key={note._id}>
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              defaultValue={index === 0 ? "item-0" : undefined} // Open first item
            >
              <AccordionItem value={`item-${index}`} className="border rounded-lg">
                <AccordionTrigger className="hover:no-underline px-6 py-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-700">Topics:</span>
                    {note.topics && note.topics.length > 0 ? (
                      note.topics.map((topic, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {topic}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 italic text-sm">No topics</span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <NoteContentPlayer note={note} sessionId={sessionId} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {index < notesData.length - 1 && (
              <hr className="border-t-2 border-gray-300 my-7" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchPageComponent;
