"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AddSalesPersonDialog = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [joiningDate, setJoiningDate] = useState<Date | undefined>(new Date());

  const handleSubmit = () => {
    if (!name || !email || !mobile || !joiningDate) return;

    const salesPerson = {
      name,
      email,
      mobile,
      joiningDate: format(joiningDate, "yyyy-MM-dd"),
    };

    console.log("New Sales Person:", salesPerson);

    // Reset form
    setName("");
    setEmail("");
    setMobile("");
    setJoiningDate(new Date());
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
        <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black hover:bg-white font-semibold">
          <Plus className="group-hover:text-black text-white mr-2" />
          Add New Sales Person
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Sales Person</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="10-digit mobile number"
            />
          </div>

          <div className="space-y-3">
            <Label className="mb-1 block">Joining Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !joiningDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {joiningDate ? format(joiningDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={joiningDate}
                  onSelect={setJoiningDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="pt-2">
            <Button className="w-full" onClick={handleSubmit}>
              Save Sales Person
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSalesPersonDialog;
