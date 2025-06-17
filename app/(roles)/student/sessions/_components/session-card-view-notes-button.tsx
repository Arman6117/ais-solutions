import { Button } from "@/components/ui/button";
import { FileTextIcon, PlayCircle } from "lucide-react";
import React from "react";

const SessionCardViewNotesButton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Button className="flex gap-2 text-black cursor-pointer items-center w-20" size={'sm'} variant={'outline'}>
        <FileTextIcon/>
        <span>Notes</span>
      </Button>
      <Button className="flex gap-2 text-black cursor-pointer items-center w-20" size={'sm'} variant={'outline'}>
        <PlayCircle/>
        <span>Watch</span>
      </Button>
    </div>
  )
};

export default SessionCardViewNotesButton;
