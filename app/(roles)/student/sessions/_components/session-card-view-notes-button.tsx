import { Button } from "@/components/ui/button";
import { FileTextIcon, PlayCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type SessionCardViewNotesButtonProps = {
  sessionId: string;
};
const SessionCardViewNotesButton = ({
  sessionId,
}: SessionCardViewNotesButtonProps) => {
  const noteId = 1;
  return (
    <div className="flex  gap-3">
      <Button
        className="flex gap-2 text-black cursor-pointer items-center w-20"
        size={"sm"}
        variant={"outline"}
      >
        <FileTextIcon />
        <span>Notes</span>
      </Button>
      <Link href={`/student/sessions/${sessionId}/${noteId}/watch`}>
        <Button
          className="flex gap-2 text-black cursor-pointer items-center w-20"
          size={"sm"}
          variant={"outline"}
        >
          <PlayCircle />
          <span>Watch</span>
        </Button>
      </Link>
    </div>
  );
};

export default SessionCardViewNotesButton;
