"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceData, CreateInvoicePayload } from "@/lib/types/invoice";
import { AlertCircle, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createInvoice } from "@/actions/admin/invoices/create-invoice";

interface CreateInvoiceDialogProps {
  invoiceData: InvoiceData;
  invoiceId: string;
  onInvoiceCreated?: () => void;
}

const CreateInvoiceDialog = ({
  invoiceData,
  invoiceId,
  onInvoiceCreated,
}: CreateInvoiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<string>("");
  const [selectedModuleIndices, setSelectedModuleIndices] = useState<number[]>([]);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const student = invoiceData.student;

  // Get the selected course
  const selectedCourse =
    selectedCourseIndex !== "" ? invoiceData.courses[parseInt(selectedCourseIndex)] : null;

  // Get unpaid modules (modules where remaining fees exist for this course)
  // Since we calculate overall course fees, we need to track which modules still have balance
  // For simplicity, we'll show all modules and let admin decide which ones this payment covers
  const availableModules = selectedCourse ? selectedCourse.modules : [];

  // Get selected modules
  const selectedModules = selectedModuleIndices.map((idx) => availableModules[idx]);

  // Calculate total of selected modules
  const selectedModulesTotal = selectedModules.reduce(
    (sum, module) => sum + (module.price || 0),
    0
  );

  // Current remaining for the course
  const currentRemaining = selectedCourse ? selectedCourse.remainingFees : 0;

  // Amount entered
  const amountNum = parseFloat(amount) || 0;

  // Remaining after payment
  const remainingAfterPayment = Math.max(0, currentRemaining - amountNum);

  // Handle module selection
  const handleModuleToggle = (moduleIndex: number) => {
    setSelectedModuleIndices((prev) =>
      prev.includes(moduleIndex)
        ? prev.filter((idx) => idx !== moduleIndex)
        : [...prev, moduleIndex]
    );
  };

  // Reset form
  const resetForm = () => {
    setSelectedCourseIndex("");
    setSelectedModuleIndices([]);
    setAmount("");
    setPaymentMethod("");
    setDueDate("");
    setNotes("");
  };

  const handleSubmit = async () => {
    if (!selectedCourse || !amount || !paymentMethod) {
      toast.error("Please fill all required fields");
      return;
    }

    if (amountNum > currentRemaining) {
      toast.error("Amount cannot exceed remaining fees");
      return;
    }

    if (amountNum <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const payload: CreateInvoicePayload = {
        invoiceID: invoiceId,
        courseName: selectedCourse.courseName,
        courseId: selectedCourse.courseId, // Ensure this exists in FormattedCourse type
        amountPaid: amountNum,
        paymentMode: paymentMethod as "UPI" | "Cash" | "Card" | "Other",
        dueDate: dueDate || undefined,
        notes: notes || undefined,
      };

      const result = await createInvoice(payload);

      if (result.success) {
        toast.success("Payment recorded successfully!");
        setOpen(false);
        resetForm();

        if (onInvoiceCreated) {
          onInvoiceCreated();
        }
      } else {
        toast.error(result.message || "Failed to record payment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record New Payment</DialogTitle>
          <DialogDescription>
            Add a payment entry for a course with outstanding fees
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Info Card */}
          <Card className="bg-slate-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div className="font-semibold text-slate-900">{student.name}</div>
                <div className="text-slate-600">{student.email}</div>
                <div className="text-slate-600">{student.phone}</div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {/* Course Selection */}
            <div className="space-y-2">
              <Label htmlFor="course">Select Course *</Label>
              <Select
                value={selectedCourseIndex}
                onValueChange={(value) => {
                  setSelectedCourseIndex(value);
                  setSelectedModuleIndices([]); // Reset module selection when course changes
                  setAmount(""); // Reset amount
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course to pay for" />
                </SelectTrigger>
                <SelectContent>
                  {invoiceData.courses
                    .map((course, index) => ({ course, index }))
                    .filter(({ course }) => course.remainingFees > 0)
                    .map(({ course, index }) => (
                      <SelectItem key={index} value={index.toString()}>
                        <div className="flex justify-between w-full gap-4">
                          <span>{course.courseName}</span>
                          <span className="text-orange-600 font-medium">
                            Due: ₹{course.remainingFees.toLocaleString()}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {invoiceData.courses.every((c) => c.remainingFees === 0) && (
                <p className="text-sm text-green-600 mt-1">
                  All courses are fully paid!
                </p>
              )}
            </div>

            {/* Module Selection (Optional - for reference) */}
            {selectedCourse && availableModules.length > 0 && (
              <div className="space-y-3">
                <Label>Modules in this Course (for reference)</Label>
                <div className="grid gap-3 max-h-40 overflow-y-auto p-3 border rounded-lg bg-slate-50">
                  {availableModules.map((module, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Checkbox
                        id={`module-${idx}`}
                        checked={selectedModuleIndices.includes(idx)}
                        onCheckedChange={() => handleModuleToggle(idx)}
                      />
                      <Label
                        htmlFor={`module-${idx}`}
                        className="text-sm font-normal flex-1 cursor-pointer"
                      >
                        <div className="flex justify-between">
                          <span>{module.name}</span>
                          <span className="font-semibold text-slate-700">
                            ₹{(module.price || 0).toLocaleString()}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedModules.length > 0 && (
                  <div className="text-sm text-slate-600 bg-blue-50 p-2 rounded border border-blue-200">
                    Selected modules total: ₹{selectedModulesTotal.toLocaleString()}
                  </div>
                )}
              </div>
            )}

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount Paid (₹) *</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max={currentRemaining}
                placeholder="Enter payment amount"
                disabled={!selectedCourse}
              />
              {selectedCourse && (
                <p className="text-xs text-slate-500">
                  Maximum payable: ₹{currentRemaining.toLocaleString()}
                </p>
              )}
            </div>

            {/* Balance Alert */}
            {selectedCourse && amount && amountNum > 0 && (
              <Alert
                className={
                  amountNum > currentRemaining
                    ? "bg-red-50 border-red-200 text-red-800"
                    : "bg-blue-50 border-blue-200 text-blue-800"
                }
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {amountNum > currentRemaining ? (
                    <span className="font-semibold">
                      Amount exceeds remaining fees!
                    </span>
                  ) : (
                    <>
                      New balance: ₹{currentRemaining.toLocaleString()} - ₹
                      {amountNum.toLocaleString()} ={" "}
                      <strong>₹{remainingAfterPayment.toLocaleString()}</strong>
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Due Date (Only if remaining > 0 after payment) */}
            {remainingAfterPayment > 0 && (
              <div className="space-y-2">
                <Label htmlFor="dueDate">Next Due Date (Optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Transaction ID, reference number, or other details..."
                rows={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                resetForm();
              }}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              disabled={
                loading ||
                !selectedCourse ||
                !amount ||
                !paymentMethod ||
                amountNum > currentRemaining ||
                amountNum <= 0
              }
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Record Payment"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
