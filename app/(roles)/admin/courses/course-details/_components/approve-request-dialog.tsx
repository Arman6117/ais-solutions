"use client";

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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const ApproveRequestDialog = ({ request }: { request: any }) => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  const finalPrice =
    discountAmount && !isNaN(Number(discountAmount))
      ? request.price - Number(discountAmount)
      : request.price;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-violet-600 hover:bg-violet-700">
          Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Approve Course Request</DialogTitle>
          <DialogDescription>
            Review student details and assign them to a batch.
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
          <div>
            <p className="font-medium text-gray-700">📚 Course</p>
            <p className="text-gray-900">{request.course}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">📦 Modules</p>
            <div className="flex gap-2 flex-wrap mt-1">
              {request.modules.map((mod: string) => (
                <Badge key={mod} className="bg-violet-100 text-violet-700">
                  {mod}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-700">💰 Course Price</p>
            <p className="text-gray-900 font-semibold">₹ {request.price}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">💸 Discount (Optional)</p>
            <Input
              placeholder="Enter discount amount (e.g. 500)"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              className="w-full"
              type="number"
            />
            {discountAmount && (
              <p className="text-sm text-green-600 mt-1">
                Final Price: ₹ {finalPrice}
              </p>
            )}
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-1">📅 Assign to Batch</p>
            <Select onValueChange={(val) => setSelectedBatch(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a batch" />
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
        </div>

        <DialogFooter className="mt-5">
            <DialogClose asChild>
                
          <Button
            disabled={!selectedBatch}
            onClick={() => {
              console.log("✔️ Approved:", {
                student: request.name,
                email: request.email,
                course: request.course,
                batch: selectedBatch,
                discount: discountAmount,
                finalPrice,
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
