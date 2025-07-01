"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ApproveRequestDialog } from "./approve-request-dialog";

type PendingRequest = {
  id: string;
  name: string;
  email: string;
  course: string;
  modules: string[];
  price: number;
  availableBatches: string[];
};

const mockPendingRequests: PendingRequest[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    course: "Web Development",
    modules: ["HTML", "CSS", "JavaScript"],
    price: 12000,
    availableBatches: ["Batch A", "Batch B", "Batch C"],
  },
  {
    id: "2",
    name: "Sara Ali",
    email: "sara@example.com",
    course: "Data Science",
    modules: ["Python", "Pandas", "ML"],
    price: 15000,
    availableBatches: ["DS Batch 1", "DS Batch 2"],
  },
];

const PendingRequestDropdown = () => {
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleApproveClick = (req: PendingRequest) => {
    setSelectedRequest(req);
    setIsDialogOpen(true);
  };

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
          {mockPendingRequests.length > 0 ? (
            mockPendingRequests.map((req) => (
              <DropdownMenuItem
                key={req.id}
                className="flex flex-col items-start p-3 gap-2"
              >
                <div className="w-full">
                  <p className="text-sm font-medium">{req.name}</p>
                  <p className="text-xs text-muted-foreground">{req.email}</p>
                  <p className="text-sm">{req.course}</p>
                </div>

                
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled className="text-muted-foreground text-sm">
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
