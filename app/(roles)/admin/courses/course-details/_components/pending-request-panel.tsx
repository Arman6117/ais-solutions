"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, User } from "lucide-react";
import { useEffect, useState } from "react";
import { ApproveRequestDialog } from "./approve-request-dialog";
import { AllPendingRequests } from "@/lib/types/pending-request.type";
import { getAllPendingRequests } from "@/actions/admin/pending-request/get-pending-request";
import { useRouter } from "next/navigation";

const PendingRequestDropdown = () => {
  const [allPendingRequests, setAllPendingRequests] = useState<
    AllPendingRequests[]
  >([]);
  const router = useRouter();

  const fetchPendingRequests = async () => {
    try {
      const res = await getAllPendingRequests();
      if (!res.success) {
        // toast.error("Failed to fetch pending requests"); // Optional: suppress error toast on periodic fetch
        return;
      }
      setAllPendingRequests(res.data);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveClick = (e: React.MouseEvent, reqId: string) => {
    e.preventDefault(); // Important: Prevent Dropdown from closing weirdly
    e.stopPropagation();
    setSelectedRequestId(reqId);
    setIsDialogOpen(true);
  };

  const pendingCount = allPendingRequests.length;

  const handleSuccess = () => {
    // Refresh list locally
    fetchPendingRequests();
    // Refresh server components (like main page stats)
    router.refresh();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between relative gap-2">
            <span>Pending Requests</span>
            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <Badge className="text-xs px-1.5 bg-primary-bg min-w-[20px] h-5 flex items-center justify-center rounded-full">
                  {pendingCount}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[320px] p-0" align="end">
          {allPendingRequests.length > 0 ? (
            <>
              <div className="px-4 py-3 text-sm font-medium text-muted-foreground border-b bg-gray-50/50">
                {pendingCount} pending request{pendingCount !== 1 ? "s" : ""}
              </div>
              
              <ScrollArea className="h-[300px]">
                <div className="p-1">
                  {allPendingRequests.map((req) => (
                    <DropdownMenuItem
                      key={req._id}
                      className="flex flex-col items-start p-3 gap-3 mb-1 cursor-default focus:bg-transparent"
                      onSelect={(e) => e.preventDefault()} // Prevent closing on item click (focus remains in menu)
                    >
                      <div className="w-full space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            {req.studentName}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground pl-5">{req.email}</p>
                        <div className="pl-5 pt-1">
                          <Badge variant="secondary" className="text-[10px] font-normal">
                            {req.courseName}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-1 h-8 text-xs bg-primary-bg hover:bg-primary-bg/90"
                        onClick={(e) => handleApproveClick(e, req._id)}
                      >
                        Review & Approve
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground text-sm">
                No pending requests
              </p>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Pass handleSuccess to refresh parent list after action */}
      {selectedRequestId && (
        <ApproveRequestDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          requestId={selectedRequestId}
          onSuccess={handleSuccess} // <--- Connect refresh logic
        />
      )}
    </>
  );
};

export default PendingRequestDropdown;
