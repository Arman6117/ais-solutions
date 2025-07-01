"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const salesPeople = ["Prajyot", "Shruti", "Rohan", "Komal"];

type ApproveRequestDialogProps = {
  request: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export const ApproveRequestDialog = ({
  request,
  onOpenChange,
  open
}: ApproveRequestDialogProps) => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchMode, setBatchMode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  const [courseName, setCourseName] = useState(request.course);
  const [courseModules, setCourseModules] = useState(
    request.modules.join(", ")
  );
  const [basePrice, setBasePrice] = useState(request.price.toString());
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");

  const finalPrice =
    discountAmount && !isNaN(Number(discountAmount))
      ? Number(basePrice) - Number(discountAmount)
      : Number(basePrice);

  const isFormValid =
    selectedBatch &&
    batchMode &&
    courseName &&
    basePrice &&
    selectedSalesPerson;

  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-violet-600 hover:bg-violet-700">
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Approve Course Request</DialogTitle>
          <DialogDescription>
            Review and update details before assigning batch.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2 text-sm">
          <div>
            <p className="font-medium text-gray-700">👤 Student Name</p>
            <p className="text-gray-900">{request.name}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">📧 Email</p>
            <p className="text-gray-900">{request.email}</p>
          </div>

          {/* Editable Course Info */}
          <div>
            <p className="font-medium text-gray-700 mb-1">📚 Course Name</p>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Course name"
            />
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">📦 Modules</p>
            <Textarea
              value={courseModules}
              onChange={(e) => setCourseModules(e.target.value)}
              placeholder="Comma-separated modules"
            />
            <div className="flex gap-2 flex-wrap mt-2">
              {courseModules
                .split(",")
                .map((mod: string) => mod.trim())
                .filter(Boolean)
                .map((mod: string) => (
                  <Badge key={mod} className="bg-violet-100 text-violet-700">
                    {mod}
                  </Badge>
                ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="font-medium text-gray-700 mb-1">
              💰 Base Course Price
            </p>
            <Input
              type="number"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              placeholder="Enter base price"
            />
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">
              💸 Discount (Optional)
            </p>
            <Input
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              placeholder="Enter discount"
            />
            {discountAmount && (
              <p className="text-sm text-green-600 mt-1">
                Final Price: ₹ {finalPrice}
              </p>
            )}
          </div>

          {/* Batch & Mode */}
          <div>
            <p className="font-medium text-gray-700 mb-1">📅 Assign to Batch</p>
            <Select onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {request.availableBatches.map((batch: string) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">🧭 Batch Mode</p>
            <Select onValueChange={setBatchMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select batch mode" />
              </SelectTrigger>
              <SelectContent>
                {["Offline", "Online", "Hybrid"].map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sales Person */}
          <div>
            <p className="font-medium text-gray-700 mb-1">🧑‍💼 Sales Person</p>
            <Select onValueChange={setSelectedSalesPerson}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select sales person" />
              </SelectTrigger>
              <SelectContent>
                {salesPeople.map((person) => (
                  <SelectItem key={person} value={person}>
                    {person}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button
              disabled={!isFormValid}
              onClick={() => {
                console.log("✔️ Approved Request", {
                  name: request.name,
                  email: request.email,
                  course: courseName,
                  modules: courseModules
                    .split(",")
                    .map((m: string) => m.trim())
                    .filter(Boolean),
                  basePrice,
                  discountAmount,
                  finalPrice,
                  selectedBatch,
                  batchMode,
                  salesPerson: selectedSalesPerson,
                });
              }}
            >
              Confirm & Assign Batch
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
