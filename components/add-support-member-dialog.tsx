"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getBatchesForSelect } from "@/actions/admin/batches/get-batches";

type BatchOption = {
  id: string;
  name: string;
};

// ✅ EXPORT THIS TYPE so parents can use it instead of 'any'
export type SupportMemberFormValues = {
  id?: string;
  name: string;
  designation: string;
  email: string;
  contact: string;
  availableTime: string;
  assignedBatches?: string[]; // Array of Batch IDs
};

type AddSupportMemberDialogProps = {
  triggerLabel: React.ReactNode | string;
  initialData?: SupportMemberFormValues;
  onSubmit: (member: SupportMemberFormValues) => void;
};

const AddSupportMemberDialog = ({
  triggerLabel = "+ Add Member",
  initialData,
  onSubmit,
}: AddSupportMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  
  // State for batches
  const [availableBatches, setAvailableBatches] = useState<BatchOption[]>([]);
  const [batchOpen, setBatchOpen] = useState(false);
  
  const [member, setMember] = useState<SupportMemberFormValues>({
    name: "",
    designation: "",
    email: "",
    contact: "",
    availableTime: "",
    assignedBatches: [],
  });

  // Fetch batches on component mount
  useEffect(() => {
    const fetchBatches = async () => {
      const result = await getBatchesForSelect();
      if (result.success) {
        setAvailableBatches(result.data);
      }
    };
    fetchBatches();
  }, []);

  // Sync state with initialData when dialog opens
  useEffect(() => {
    if (open) {
      setMember(
        initialData ?? {
          name: "",
          designation: "",
          email: "",
          contact: "",
          availableTime: "",
          assignedBatches: [],
        }
      );
    }
  }, [open, initialData]);

  const handleChange = (field: keyof SupportMemberFormValues, value: string) => {
    setMember((prev) => ({ ...prev, [field]: value }));
  };

  const toggleBatch = (batchId: string) => {
    setMember((prev) => {
      const currentBatches = prev.assignedBatches || [];
      if (currentBatches.includes(batchId)) {
        return {
          ...prev,
          assignedBatches: currentBatches.filter((id) => id !== batchId),
        };
      } else {
        return {
          ...prev,
          assignedBatches: [...currentBatches, batchId],
        };
      }
    });
  };

  const removeBatch = (batchId: string) => {
    setMember((prev) => ({
      ...prev,
      assignedBatches: (prev.assignedBatches || []).filter((id) => id !== batchId),
    }));
  };

  const handleSubmit = () => {
    onSubmit(member);
    setOpen(false);
  };

  // Helper to get batch name by ID
  const getBatchName = (id: string) => 
    availableBatches.find((b) => b.id === id)?.name || "Unknown Batch";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {typeof triggerLabel === "string" ? (
          <Button className="ml-auto bg-primary-bg">{triggerLabel}</Button>
        ) : (
          triggerLabel
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add"} Support Member
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Top Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={member.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="grid gap-2">
              <Label>Designation</Label>
              <Input
                value={member.designation}
                onChange={(e) => handleChange("designation", e.target.value)}
                placeholder="Senior Support"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                value={member.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label>Contact</Label>
              <Input
                value={member.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                placeholder="+1 234 567 890"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Available Time</Label>
            <Input
              value={member.availableTime}
              onChange={(e) => handleChange("availableTime", e.target.value)}
              placeholder="e.g., 9:00 AM - 5:00 PM EST"
            />
          </div>

          {/* Batch Selection (Multi-select) */}
          <div className="grid gap-2">
            <Label>Assign Batches</Label>
            
            <Popover open={batchOpen} onOpenChange={setBatchOpen} modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={batchOpen}
                  className="w-full justify-between"
                >
                  Select batches...
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[460px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search batch..." />
                  <CommandList>
                    <CommandEmpty>No batch found.</CommandEmpty>
                    <CommandGroup>
                      {availableBatches.map((batch) => (
                        <CommandItem
                          key={batch.id}
                          value={batch.name}
                          onSelect={() => {
                            toggleBatch(batch.id);
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              member.assignedBatches?.includes(batch.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {batch.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected Batches Display */}
            {member.assignedBatches && member.assignedBatches.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {member.assignedBatches.map((batchId) => (
                  <Badge key={batchId} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                    {getBatchName(batchId)}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBatch(batchId);
                      }}
                      className="ml-1 hover:bg-slate-200 rounded-full p-0.5 transition-colors focus:outline-none"
                      type="button"
                    >
                      <X className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="bg-primary ml-auto">
            {initialData ? "Update Member" : "Add Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSupportMemberDialog;
