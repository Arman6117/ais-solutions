"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { ApprovePendingRequestPayload, CourseData, RequestToApprove } from "@/lib/types/pending-request.type";
import { getPendingRequestById } from "@/actions/admin/pending-request/get-pending-request";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { getCourseList } from "@/actions/admin/pending-request/get-data-to-approve-request";
import { approvePendingRequest } from "@/actions/admin/pending-request/approve-pending-request";
import { Mode } from "@/lib/types/types";

const salesPeople = ["Prajyot", "Shruti", "Rohan", "Komal"];
const paymentModes = ["Cash", "UPI", "Card"];
const paymentStatuses = ["Paid", "Partially Paid", "Due"];

type Module = {
  _id?: string; // Added optional _id for modules
  name: string;
  price: number;
};
type ApproveRequestDialogProps = {
  requestId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ApproveRequestDialog = ({
  requestId,
  onOpenChange,
  open,
}: ApproveRequestDialogProps) => {
  const [request, setRequest] = useState<RequestToApprove | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [batchMode, setBatchMode] = useState<Mode>('online');
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [customTotalPrice, setCustomTotalPrice] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [courseList, setCourseList] = useState<CourseData[]>([]);

  const fetchPendingRequestToApprove = async () => {
    if (!requestId) return;

    setLoading(true);
    try {
      const res = await getPendingRequestById(requestId);
      if (!res.success || !res.data) {
        toast.error(res.message);
        return;
      }
      const courseRes = await getCourseList();
      if (!courseRes.success) {
        toast.error(courseRes.message);
      }
      setRequest(res.data);

      // Correctly set the selected course and modules using IDs
      setSelectedCourse(res.data.courseId._id || "");
      setSelectedModules(res.data.modules || []);
      setCustomTotalPrice("");
      setCourseList(courseRes.data);

      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && requestId) {
      fetchPendingRequestToApprove();
    }

    if (!open) {
      setRequest(null);
      setSelectedCourse("");
      setSelectedModules([]);
      setSelectedBatch("");
      setBatchMode('online');
      setSelectedSalesPerson("");
      setPaymentMode("");
      setPaymentStatus("");
      setDueDate("");
      setCustomTotalPrice("");
    }
  }, [requestId, open]);

  const currentCourse = useMemo(
    () => courseList.find((c) => c._id === selectedCourse),
    [selectedCourse, courseList]
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
        mod.name === name ? { ...mod, price: parseInt(price || "0") || 0 } : mod
      )
    );
  };

  const autoPrice = selectedModules.reduce((acc, m) => {
    const modulePrice =
      typeof m.price === "number" ? m.price : parseInt(String(m.price)) || 0;
    return acc + modulePrice;
  }, 0);

  const totalPrice = useMemo(() => {
    if (customTotalPrice !== "") {
      const customPrice = parseInt(customTotalPrice) || 0;
      return customPrice;
    }
    if (request?.finalPrice) {
      return request.finalPrice;
    }
    return autoPrice;
  }, [customTotalPrice, request?.finalPrice, autoPrice]);

  const isFormValid =
    selectedBatch &&
    batchMode &&
    selectedModules.length > 0 &&
    // selectedSalesPerson &&
    paymentMode &&
    paymentStatus &&
    (paymentStatus === "Paid" || dueDate);

  // Show loading state
  if (loading || !request) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogTitle>Approve Course Request</DialogTitle>
          <div className="flex items-center justify-center h-32">
            <Loader className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const approveRequest = async () => {
    if (!request || !currentCourse) {
      toast.error("Required data is missing.");
      return;
    }

    try {
      const moduleIds = selectedModules.map((mod) => {
        const moduleInCourse = currentCourse.modules.find(m => m.name === mod.name);
        return moduleInCourse?._id;
      }).filter(Boolean) as string[];

      if (moduleIds.length === 0) {
        toast.error("No modules selected or module IDs not found.");
        return;
      }

      const payload: ApprovePendingRequestPayload = {
        email: request.studentId?.email || "",
        courseName: currentCourse.courseName,
        courseId: selectedCourse,
        batch: selectedBatch,
        modules: moduleIds,
        amountPaid: amountPaid,
        totalFees: totalPrice,
        dueDate: paymentStatus !== "Paid" ? dueDate : undefined,
        status: paymentStatus as "Due" | "Paid" | "Partially Paid",
        mode: paymentMode as "UPI" | "Cash" | "Card" | "Other",
        batchMode: batchMode,
      };

      const res = await approvePendingRequest(requestId,payload);
      if (res.success) {
        toast.success(res.message);
        onOpenChange(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

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
            <p className="text-gray-900">
              {request.studentId?.name || "Unknown"}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">📧 Email</p>
            <p className="text-gray-900">
              {request.studentId?.email || "Unknown"}
            </p>
          </div>

          {/* Course Selector */}
          <div>
            <p className="font-medium text-gray-700 mb-1">📚 Course</p>
            <Select
              value={selectedCourse}
              onValueChange={(val) => {
                setSelectedCourse(val);
                const found = courseList.find((c) => c._id === val);
                setSelectedModules(found?.modules ?? []);
                setCustomTotalPrice(""); // reset custom price
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courseList.map((course) => (
                  <SelectItem key={course._id} value={course._id}>
                    {course.courseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Modules */}
          <div>
            <p className="font-medium text-gray-700 mb-1">
              ✅ Selected Modules
            </p>
            {selectedModules.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No modules selected
              </p>
            )}
            <div className="flex flex-col gap-2">
              {selectedModules.map((mod, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-violet-100 px-3 py-1 rounded text-violet-800"
                >
                  <span className="font-medium">{mod.name}</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={mod.price || 0}
                      onChange={(e) =>
                        handleModulePriceChange(mod.name, e.target.value)
                      }
                      className="w-20 h-6 text-xs"
                      min="0"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleModuleToggle(mod)}
                      className="h-6 w-6 p-0"
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
            <p className="font-medium text-gray-700 mb-1 mt-4">
              📦 Available Modules
            </p>
            <div className="flex flex-wrap gap-2">
              {currentCourse?.modules
                ?.filter(
                  (mod) => !selectedModules.some((m) => m.name === mod.name)
                )
                .map((mod) => (
                  <Badge
                    key={mod.name}
                    className="bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleModuleToggle(mod)}
                  >
                    {mod.name} – ₹{mod.price} ➕
                  </Badge>
                ))}
            </div>
          </div>

          {/* Custom Final Price */}
          <div className="mt-2">
            <p className="font-medium text-gray-700 mb-1">
              💸 Final Total Price
            </p>
            <Input
              type="number"
              value={customTotalPrice}
              placeholder={`Database: ₹${request?.finalPrice || 0} | Auto-calc: ₹${autoPrice}`}
              onChange={(e) => setCustomTotalPrice(e.target.value)}
              min="0"
            />
            <p className="text-green-600 text-sm mt-1">
              Final Price: ₹{totalPrice || 0}
            </p>
            <p className="text-xs text-muted-foreground">
              {customTotalPrice
                ? "Using custom price"
                : request?.finalPrice
                  ? "Using database price"
                  : "Using auto-calculated price"}
            </p>
          </div>

          {/* Batch selection */}
          <div>
            <p className="font-medium text-gray-700 mb-1">📅 Assign to Batch</p>
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {currentCourse?.batches.map((batch) => (
                  <SelectItem key={batch._id} value={batch._id}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Batch Mode */}
          <div>
            <p className="font-medium text-gray-700 mb-1">🧭 Batch Mode</p>
            <Select value={batchMode} onValueChange={(value) => setBatchMode(value as Mode)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select batch mode" />
              </SelectTrigger>
              <SelectContent>
                {["Offline", "Online", "Hybrid"].map((mode) => (
                  <SelectItem key={mode} value={mode.toUpperCase()}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sales Person */}
          {/* <div>
            <p className="font-medium text-gray-700 mb-1">🧑‍💼 Sales Person</p>
            <Select
              value={selectedSalesPerson}
              onValueChange={setSelectedSalesPerson}
            >
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
          </div> */}

          {/* Payment Mode */}
          <div>
            <p className="font-medium text-gray-700 mb-1">💳 Payment Mode</p>
            <Select value={paymentMode} onValueChange={setPaymentMode}>
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
            <Select value={paymentStatus} onValueChange={setPaymentStatus}>
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
          {paymentStatus === "Partially Paid" && (
            <div>
              <p className="font-medium text-gray-700 mb-1">💵 Amount Paid</p>
              <Input
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
                placeholder="Enter amount paid"
                className="w-full"
                min="0"
                max={totalPrice}
              />
            </div>
          )}
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!isFormValid}
            onClick={approveRequest}
          >
            Confirm & Assign Batch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
