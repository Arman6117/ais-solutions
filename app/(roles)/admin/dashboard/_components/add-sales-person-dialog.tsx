"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createSalesPerson } from "@/actions/admin/sales-person/sales-person-actions";

type AddSalesPersonDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddSalesPersonDialog = ({ open, onOpenChange }: AddSalesPersonDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [joiningDate, setJoiningDate] = useState<Date | undefined>(new Date());

  // Optional: Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
        // Reset or keep state? Usually nice to keep unless successfully submitted.
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!name || !email || !mobile || !joiningDate) {
        toast.error("Please fill in all fields");
        return;
    }

    setIsLoading(true);
    try {
      const res = await createSalesPerson({
        name,
        email,
        mobile,
        joiningDate,
      });

      if (res.success) {
        toast.success(res.message);
        setName("");
        setEmail("");
        setMobile("");
        setJoiningDate(new Date());
        onOpenChange(false); // Close dialog
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error)
     
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px] select-text"
        onOpenAutoFocus={(e) => e.preventDefault()} 
      >
        <DialogHeader>
          <DialogTitle>Add New Sales Person</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            />
          </div>

           <div className="space-y-2 flex flex-col">
          <Label className="mb-1">Joining Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={isLoading}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !joiningDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {joiningDate ? format(joiningDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={joiningDate}
                onSelect={setJoiningDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

          <div className="pt-4">
            <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
              ) : (
                  "Save Sales Person"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSalesPersonDialog;
