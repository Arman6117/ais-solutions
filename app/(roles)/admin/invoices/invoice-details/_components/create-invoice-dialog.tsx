"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { Invoice, PaymentMode, Student } from "@/lib/types/types";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlertCircle, Plus } from "lucide-react";
import { useState } from "react";
interface InvoiceFormData {
  courseId: string;
  moduleIds: number[];
  amount: string;
  paymentMethod: string;
  dueDate: string;
  notes: string;
}
interface CreateInvoiceDialogProps {
  student: Student;
  onSubmit: (invoice: Invoice) => void;
}
const CreateInvoiceDialog = ({
  student,
  onSubmit,
}: CreateInvoiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<InvoiceFormData>({
    courseId: "",
    moduleIds: [],
    amount: "",
    paymentMethod: "",
    dueDate: "",
    notes: "",
  });

  const selectedCourse = student.courses.find(
    (c) => c.id === parseInt(formData.courseId)
  );
  // const unpaidModules = selectedCourse ? selectedCourse.modules.filter(m => !m.paid) : [];
  // const selectedModules = unpaidModules.filter(m => formData.moduleIds.includes(m.id));
  // const maxAmount = selectedModules.reduce((sum, m) => sum + m.price, 0);
  const remainingAfterPayment = 20000 - (parseFloat(formData.amount) || 0);

  const handleSubmit = (): void => {
    if (!formData.courseId || !formData.amount || !formData.paymentMethod) {
      alert("Please fill all required fields");
      return;
    }

    const invoice: Invoice = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: parseFloat(formData.amount),
      course: selectedCourse!.name,
      // module: selectedModules.map(m => m.name).join(', '),
      paymentMethod: formData.paymentMethod as PaymentMode,
      notes: formData.notes,
      dueDate: formData.dueDate,
    };

    onSubmit(invoice);
    setFormData({
      courseId: "",
      moduleIds: [],
      amount: "",
      paymentMethod: "",
      dueDate: "",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Generate a new invoice for student fee payment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-1">
                <div className="font-medium">{student.name}</div>
                <div className="text-muted-foreground">{student.email}</div>
                <div className="text-muted-foreground">{student.phone}</div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="course">Select Course *</Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) =>
                  setFormData({ ...formData, courseId: value, moduleIds: [] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {student.courses
                    .filter((c) => c.remainingFees > 0)
                    .map((course) => (
                      <SelectItem key={course.id} value={"s"}>
                        {course.name} - Remaining: ₹
                        {course.remainingFees.toLocaleString()}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* {selectedCourse && unpaidModules.length > 0 && (
                <div className="space-y-3">
                  <Label>Select Modules</Label>
                  <div className="grid gap-3 max-h-32 overflow-y-auto p-3 border rounded-lg">
                    {unpaidModules.map(module => (
                      <div key={module.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`module-${module.id}`}
                          checked={formData.moduleIds.includes(module.id)}
                          onCheckedChange={(checked) => handleModuleSelection(module.id, checked as boolean)}
                        />
                        <Label htmlFor={`module-${module.id}`} className="text-sm font-normal flex-1">
                          {module.name} - ₹{module.price.toLocaleString()}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

            <div className="space-y-2">
              <Label htmlFor="amount">Amount Paid *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                //   max={maxAmount}
                min="1"
                placeholder="Enter amount"
              />
              {/* {maxAmount > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Maximum amount for selected modules: ₹{maxAmount.toLocaleString()}
                  </div>
                )} */}
            </div>

            {formData.amount && remainingAfterPayment > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Remaining balance after payment: ₹
                  {remainingAfterPayment.toLocaleString()}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, paymentMethod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {remainingAfterPayment > 0 && (
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} className="flex-1">
              Create Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
