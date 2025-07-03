"use client";

import React, { useMemo, useState } from "react";
import {
  Dialog,
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
import { cn } from "@/lib/utils";

const salesPeople = ["Prajyot", "Shruti", "Rohan", "Komal"];
const paymentModes = ["Cash", "UPI", "Card"];
const paymentStatuses = ["Paid", "Partially Paid", "Due"];

type Module = {
  name: string;
  price: number;
};

type CourseData = {
  name: string;
  modules: Module[];
};

const courseList: CourseData[] = [
  {
    name: "Web Development",
    modules: [
      { name: "HTML", price: 2000 },
      { name: "CSS", price: 2000 },
      { name: "JavaScript", price: 4000 },
      { name: "React", price: 5000 },
    ],
  },
  {
    name: "Data Science",
    modules: [
      { name: "Python", price: 3000 },
      { name: "Pandas", price: 4000 },
      { name: "Machine Learning", price: 5000 },
    ],
  },
  {
    name: "App Development",
    modules: [
      { name: "Flutter", price: 6000 },
      { name: "Firebase", price: 3000 },
      { name: "Dart", price: 4000 },
    ],
  },
];

type ApproveRequestDialogProps = {
  request: {
    name: string;
    email: string;
    course: string;
    availableBatches: string[];
    modules: Module[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ApproveRequestDialog = ({
  request,
  onOpenChange,
  open,
}: ApproveRequestDialogProps) => {
  const [selectedCourse, setSelectedCourse] = useState(request.course);
  const [selectedModules, setSelectedModules] = useState<Module[]>(request.modules);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchMode, setBatchMode] = useState("");
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [customTotalPrice, setCustomTotalPrice] = useState("");

  const currentCourse = useMemo(
    () => courseList.find((c) => c.name === selectedCourse),
    [selectedCourse]
  );

  const handleModuleToggle = (mod: Module) => {
    setSelectedModules((prev) => {
      const exists = prev.find((m) => m.name === mod.name);
      return exists ? prev.filter((m) => m.name !== mod.name) : [...prev, mod];
    });
  };

  const handleModulePriceChange = (name: string, price: string) => {
    setSelectedModules((prev) =>
      prev.map((mod) =>
        mod.name === name ? { ...mod, price: parseInt(price || "0") } : mod
      )
    );
  };

  const autoPrice = selectedModules.reduce((acc, m) => acc + m.price, 0);
  const totalPrice = customTotalPrice !== "" ? parseInt(customTotalPrice || "0") : autoPrice;

  const isFormValid =
    selectedBatch &&
    batchMode &&
    selectedModules.length > 0 &&
    selectedSalesPerson &&
    paymentMode &&
    paymentStatus &&
    (paymentStatus === "Paid" || dueDate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Approve Course Request</DialogTitle>
          <DialogDescription>
            Assign batch and finalize modules and payment details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">👤 Student Name</p>
            <p className="text-gray-900">{request.name}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">📧 Email</p>
            <p className="text-gray-900">{request.email}</p>
          </div>

          {/* Course Selector */}
          <div>
            <p className="font-medium text-gray-700 mb-1">📚 Course</p>
            <Select
              value={selectedCourse}
              onValueChange={(val) => {
                setSelectedCourse(val);
                const found = courseList.find((c) => c.name === val);
                setSelectedModules(found?.modules ?? []);
                setCustomTotalPrice(""); // reset custom price
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courseList.map((course) => (
                  <SelectItem key={course.name} value={course.name}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Modules */}
          <div>
            <p className="font-medium text-gray-700 mb-1">✅ Selected Modules</p>
            {selectedModules.length === 0 && (
              <p className="text-muted-foreground text-sm">No modules selected</p>
            )}
            <div className="flex flex-col gap-2">
              {selectedModules.map((mod) => (
                <div
                  key={mod.name}
                  className="flex justify-between items-center bg-violet-100 px-3 py-1 rounded text-violet-800"
                >
                  <span className="font-medium">{mod.name}</span>
                  <div className="flex items-center gap-2">
                    ₹
                    <span className="font-medium">{mod.price}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleModuleToggle(mod)}
                    >
                      ❌
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Modules */}
          <div>
            <p className="font-medium text-gray-700 mb-1 mt-4">📦 Available Modules</p>
            <div className="flex flex-wrap gap-2">
              {currentCourse?.modules
                ?.filter((mod) => !selectedModules.some((m) => m.name === mod.name))
                .map((mod) => (
                  <Badge
                    key={mod.name}
                    className="bg-gray-100 text-gray-700 cursor-pointer"
                    onClick={() => handleModuleToggle(mod)}
                  >
                    {mod.name} – ₹{mod.price} ➕
                  </Badge>
                ))}
            </div>
          </div>

          {/* Custom Final Price */}
          <div className="mt-2">
            <p className="font-medium text-gray-700 mb-1">💸 Final Total Price</p>
            <Input
              type="number"
              value={customTotalPrice}
              placeholder={`Auto: ₹${autoPrice}`}
              onChange={(e) => setCustomTotalPrice(e.target.value)}
            />
            <p className="text-green-600 text-sm mt-1">Final Price: ₹{totalPrice}</p>
          </div>

          {/* Batch selection */}
          <div>
            <p className="font-medium text-gray-700 mb-1">📅 Assign to Batch</p>
            <Select onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {request.availableBatches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Batch Mode */}
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

          {/* Payment Mode */}
          <div>
            <p className="font-medium text-gray-700 mb-1">💳 Payment Mode</p>
            <Select onValueChange={setPaymentMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment mode" />
              </SelectTrigger>
              <SelectContent>
                {paymentModes.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Status */}
          <div>
            <p className="font-medium text-gray-700 mb-1">💰 Payment Status</p>
            <Select onValueChange={setPaymentStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          {paymentStatus !== "Paid" && (
            <div>
              <p className="font-medium text-gray-700 mb-1">📅 Due Date</p>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              disabled={!isFormValid}
              onClick={() => {
                const approvedData = {
                  student: request.name,
                  email: request.email,
                  course: selectedCourse,
                  selectedModules,
                  totalPrice,
                  batch: selectedBatch,
                  batchMode,
                  salesPerson: selectedSalesPerson,
                  paymentMode,
                  paymentStatus,
                  dueDate: paymentStatus !== "Paid" ? dueDate : null,
                };
                console.log("✅ Approved Request:", approvedData);
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
