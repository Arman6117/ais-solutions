import {
  Dialog,
  DialogContent,
  
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { dummySessions } from "@/lib/static";
import React from "react";
//import SessionCard from "../../sessions/_components/session-card";
import { ScrollArea } from "@/components/ui/scroll-area";

type StudentModulesMeetingDialogProps = {
  children: React.ReactNode;
  session: (typeof dummySessions)[0][];
  status: "Ongoing" | "Upcoming" | "Completed";
};
const StudentModulesMeetingDialog = ({
  children,
  //session,
  status,
}: StudentModulesMeetingDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger disabled={status === "Upcoming"} className="w-full ">
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl! ">
        <DialogHeader>
          <DialogTitle>Module Name Session History</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex max-h-[500px] flex-col gap-3">
          {/* {session.map((s) => (
            <div key={s.id} className="mb-3">
              <SessionCard session={s} />
            </div>
          ))} */}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default StudentModulesMeetingDialog;
