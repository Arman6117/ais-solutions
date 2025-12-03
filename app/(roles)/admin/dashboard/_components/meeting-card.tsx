"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/types/sessions.type";
import { deleteSession } from "@/actions/admin/sessions/delete-session"; // Adjust import path
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export const MeetingCard = ({
  meeting,
  isTodayOrFuture,
}: {
  meeting: Session;
  isTodayOrFuture: boolean;
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // DELETE HANDLER
  const handleDelete = async () => {
    if (!meeting._id) {
      toast.error("Invalid Meeting ID");
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteSession(meeting._id);
      if (res.success) {
        toast.success(res.message);
        router.refresh(); // Refresh UI to remove the card
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete meeting");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white mb-2 p-3 rounded shadow-sm border border-gray-100 hover:border-violet-300 transition-colors duration-200 w-full">
      <div className="flex items-center mb-2">
        <div className="w-1 h-8 bg-violet-500 rounded-full mr-2"></div>
        {/* Fallback if courseName is missing */}
        <h3 className="font-bold text-gray-800">{meeting.meetingName || "Meeting"}</h3>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-10 mt-4 justify-between">
        <div className="flex flex-col gap-2 min-w-[100px]">
          <div>
            <p className="text-gray-500 text-xs">Module</p>
            <p className="font-medium text-sm">{meeting.module}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Chapters</p>
            <p className="font-medium text-sm">
              {meeting.chapters && meeting.chapters.length > 0 
                ? meeting.chapters[0] 
                : "Intro"}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 min-w-[100px]">
          {/* Assuming meeting has batchId populate or name. If not, handle gracefully */}
          {/* If you populate batchId in the backend, you can display batch name here */}
          <div>
             <p className="text-gray-500 text-xs">Instructor</p>
             <p className="font-medium text-sm">{meeting.instructor || "TBA"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[80px]">
          <p className="text-gray-500 text-xs">Time</p>
          <p className="font-medium text-sm">{meeting.time}</p>
        </div>
      </div>

      {isTodayOrFuture && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="px-3 py-1 h-8 text-xs"
            onClick={() => console.log("Edit", meeting)}
            disabled={isDeleting}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="px-3 py-1 h-8 text-xs"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
