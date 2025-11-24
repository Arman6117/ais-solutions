"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SessionCard from "../../sessions/_components/session-card";
import { Session } from "@/lib/types/sessions.type";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getStudentId } from "@/actions/shared/get-student-id";
import { getSessionsByModule } from "@/actions/student/dashboard/get-session-by-module";

type StudentModulesMeetingDialogProps = {
  children: React.ReactNode;
  moduleName: string;
  batchId: string;
  status: "Ongoing" | "Upcoming" | "Completed";
};

const StudentModulesMeetingDialog = ({
  children,
  moduleName,
  batchId,
  status,
}: StudentModulesMeetingDialogProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const session = await authClient.getSession();
        if (!session.data) return;
        const id = await getStudentId(session.data.user.email!);
        if (id) {
          setStudentId(id);
        }
      } catch (error) {
        console.error("Error fetching student ID:", error);
      }
    };
    fetchStudentId();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!isOpen || !batchId || !moduleName) return;

      setIsLoading(true);
      try {
        // Call the getSessionsByModule function with moduleName and batchId
        const res = await getSessionsByModule(moduleName, batchId);
        
        if (res.success) {
          setSessions(res.data);
          if (res.data.length === 0) {
            toast.info(`No sessions found for ${moduleName}`);
          }
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        toast.error("Failed to load sessions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [isOpen, moduleName, batchId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        disabled={status === "Upcoming"}
        className="w-full"
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {moduleName} - Session History
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {sessions.length} session{sessions.length !== 1 ? "s" : ""} found
          </p>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary-bg" />
          </div>
        ) : (
          <ScrollArea className="max-h-[500px] overflow-hidden pr-4">
            <div className="flex flex-col gap-4">
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <SessionCard
                    key={session._id}
                    session={session}
                    attended={session.studentId.includes(studentId)}
                    studentId={studentId}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No sessions found for this module yet.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sessions will appear here after they are completed.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentModulesMeetingDialog;
