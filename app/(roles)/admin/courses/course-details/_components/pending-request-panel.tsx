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

type Module = {
  name: string;
  price:number
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
  const [selectedRequest, setSelectedRequest] = useState<PendingRequest | null>(
    null
  );
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
                <Button onClick={() => handleApproveClick(req)}>Approve</Button>
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
