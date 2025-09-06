"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { ApproveRequestDialog } from "./approve-request-dialog";
import { AllPendingRequests } from "@/lib/types/pending-request.type";
import { getAllPendingRequests } from "@/actions/admin/pending-request/get-pending-request";
import { toast } from "sonner";



const PendingRequestDropdown = () => {
  const [allPendingRequests, setAllPendingRequests] = useState<
    AllPendingRequests[]
  >([]);

  const fetchPendingRequests = async () => {
    try {
      const res = await getAllPendingRequests();
      if (!res.success) {
        toast.error("Failed to fetch pending requests");
        return;
      }
      setAllPendingRequests(res.data);
      toast.success("Pending requests fetched successfully");
    } catch (error) {
      toast.error("An error occurred while fetching pending requests");
      console.error("Error fetching pending requests:", error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveClick = (req: string) => {
    setSelectedRequestId(req);
    setIsDialogOpen(true);
  };

  const pendingCount = allPendingRequests.length;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between relative">
            <span>Pending Requests</span>
            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <Badge className="text-xs p-2 bg-primary-bg  size-5">
                  {pendingCount}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[320px]">
          {allPendingRequests.length > 0 ? (
            <>
              {/* Optional: Show count at the top of dropdown */}
              <div className="px-3 py-2 text-xs text-muted-foreground border-b">
                {pendingCount} pending request{pendingCount !== 1 ? "s" : ""}
              </div>
              {allPendingRequests.map((req) => (
                <DropdownMenuItem
                  key={req._id}
                  className="flex flex-col items-start p-3 gap-2"
                >
                  <div className="w-full">
                    <p className="text-sm font-medium">{req.studentName}</p>
                    <p className="text-xs text-muted-foreground">{req.email}</p>
                    <p className="text-sm">{req.courseName}</p>
                  </div>
                  <Button onClick={() => handleApproveClick(req._id)}>Approve</Button>
                </DropdownMenuItem>
              ))}
            </>
          ) : (
            <DropdownMenuItem
              disabled
              className="text-muted-foreground text-sm"
            >
              No pending requests
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedRequestId && (
        <ApproveRequestDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          requestId={selectedRequestId}
        />
      )}
    </>
  );
};

export default PendingRequestDropdown;
