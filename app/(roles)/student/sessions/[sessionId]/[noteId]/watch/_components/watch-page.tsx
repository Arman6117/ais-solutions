"use client";

import { NoteData } from "@/lib/types/types";
import React, { useState } from "react";
import NoteContentPlayer from "./note-content-player";
import { AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

type WatchPageComponentProps = {
  sessionId: string;
  initialNotes: NoteData[];
};

const WatchPageComponent = ({
  sessionId,
  initialNotes,
}: WatchPageComponentProps) => {
  // Initialize state with server data (though you could just use props directly if you don't plan to mutate it)
  const [notesData] = useState<NoteData[]>(initialNotes);

  return (
    <div className="container mx-auto py-8">
      {notesData.length === 0 && (
        <div className="h-full items-center justify-center flex flex-col py-12">
          <AlertTriangle className="text-primary-bg w-12 h-12 opacity-60 mb-4" />
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">
            No Notes Found
          </h2>
          <p className="text-muted-foreground">
            There are no notes attached to this session yet.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-7">
        {notesData.map((note, index) => (
          <div key={note._id}>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={index === 0 ? `item-${index}` : undefined} // Open first item by default
            >
              <AccordionItem value={`item-${index}`} className="border rounded-lg bg-white shadow-sm">
                <AccordionTrigger className="hover:no-underline px-6 py-4">
                  <div className="flex items-center gap-2 flex-wrap text-left">
                    <span className="font-semibold text-gray-700">Topics:</span>
                    {note.topics && note.topics.length > 0 ? (
                      note.topics.map((topic, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                        >
                          {topic}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 italic text-sm">No topics listed</span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <NoteContentPlayer note={note} sessionId={sessionId} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {index < notesData.length - 1 && (
              <div className="flex items-center justify-center my-8 opacity-20">
                 <div className="h-1 w-2 bg-gray-400 rounded-full mx-1"></div>
                 <div className="h-1 w-2 bg-gray-400 rounded-full mx-1"></div>
                 <div className="h-1 w-2 bg-gray-400 rounded-full mx-1"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchPageComponent;
