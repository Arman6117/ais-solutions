"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { ApproveRequestDialog } from "./approve-request-dialog";
import { AllPendingRequests } from "@/lib/types/pending-request";
import { getAllPendingRequests } from "@/actions/admin/pending-request/get-pending-request";
import { toast } from "sonner";

type Module = {
  name: string;
  price: number;
};

type PendingRequest = {
  id: string;
  name: string;
  email: string;
  course: string;
  modules: Module[];
  price: number;
  availableBatches: string[];
};

const mockPendingRequests: PendingRequest[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    course: "Web Development",
    price: 12000,
    availableBatches: ["Batch A", "Batch B", "Batch C"],
    modules: [
      { name: "HTML", price: 3000 },
      { name: "CSS", price: 4000 },
      { name: "JavaScript", price: 5000 },
    ],
  },
  {
    id: "2",
    name: "Sara Ali",
    email: "sara@example.com",
    course: "Data Science",
    price: 15000,
    availableBatches: ["DS Batch 1", "DS Batch 2"],
    modules: [
      { name: "Python", price: 5000 },
      { name: "Pandas", price: 4000 },
      { name: "ML", price: 6000 },
    ],
  },
];

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
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveClick = (req: PendingRequest) => {
    setSelectedRequest(req);
    setIsDialogOpen(true);
  };
 console.log(allPendingRequests)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between">
            Pending Requests
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[320px]">
          {allPendingRequests.length > 0 ? (
            allPendingRequests.map((req) => (
              <DropdownMenuItem
                key={req._id}
                className="flex flex-col items-start p-3 gap-2"
              >
                <div className="w-full">
                  <p className="text-sm font-medium">{req.studentName}</p>
                  <p className="text-xs text-muted-foreground">{req.email}</p>
                  <p className="text-sm">{req.courseName}</p>
                </div>
                <Button onClick={() => {}}>Approve</Button>
              </DropdownMenuItem>
            ))
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

      {selectedRequest && (
        <ApproveRequestDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          request={selectedRequest}
        />
      )}
    </>
  );
};

export default PendingRequestDropdown;
