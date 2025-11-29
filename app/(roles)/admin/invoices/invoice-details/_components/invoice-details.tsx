"use client";
import React, { useState } from "react";
import {
  Mail,
  CreditCard,
  Smartphone,
  Banknote,
  Clock,
  BookOpen,
  Users,
  Monitor,
  Wifi,
  User,
  Phone,
  IndianRupee,
  CalendarDays,
  Receipt,
  Building,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
// import CreateInvoiceDialog from "./create-invoice-dialog";

// --- TYPES BASED ON SERVER RESPONSE ---

interface APIModule {
  _id?: string;
  name: string;
  amount?: number;
  price?: number;
  status?: string;
}

interface APICourse {
  courseName: string;
  courseMode: string;
  batchName: string;
  modules: APIModule[];
  totalFees: number;
  amountPaid: number;
  remainingFees: number;
  dueDate: string | Date | null;
  status: string;
  paymentProgress: string;
}

interface APIPaymentHistory {
  amount: number;
  courseName: string;
  modules: string | string[];
  paymentDate: string | Date;
  dueDate: string | Date | null;
  notes: string | null;
  mode: string;
}

interface InvoiceData {
  student: {
    name: string;
    email: string;
    phone: string;
  };
  summary: {
    totalFees: number;
    amountPaid: number;
    remainingFees: number;
    paymentProgress: string;
  };
  courses: APICourse[];
  paymentHistory: APIPaymentHistory[];
}

// --- HELPER COMPONENTS ---

const BatchTypeIcon = ({ type }: { type: string }) => {
  const normalizedType = type.toLowerCase();
  const config = {
    online: {
      icon: Monitor,
      color: "bg-blue-100 text-blue-700",
      label: "Online",
    },
    hybrid: {
      icon: Wifi,
      color: "bg-purple-100 text-purple-700",
      label: "Hybrid",
    },
    offline: {
      icon: Building,
      color: "bg-green-100 text-green-700",
      label: "Offline",
    },
  };

  const { icon: Icon, color, label } =
    config[normalizedType as keyof typeof config] || config.offline;
  return (
    <Badge variant="secondary" className={`${color} font-medium`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};

const PaymentMethodIcon = ({ method }: { method: string }) => {
  const normalizedMethod = method.toLowerCase();
  let Icon = Receipt;
  let color = "text-gray-600";

  if (normalizedMethod.includes("upi")) {
    Icon = Smartphone;
    color = "text-orange-600";
  } else if (normalizedMethod.includes("card")) {
    Icon = CreditCard;
    color = "text-blue-600";
  } else if (normalizedMethod.includes("cash")) {
    Icon = Banknote;
    color = "text-green-600";
  }

  return <Icon className={`w-4 h-4 ${color}`} />;
};

// --- MAIN CARD COMPONENTS ---

const StudentInfoCard = ({ student }: { student: InvoiceData["student"] }) => (
  <Card className="mb-6 shadow-sm">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2 text-lg">
        <User className="w-5 h-5" />
        Student Information
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Full Name
          </Label>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-semibold text-gray-900">{student.name}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Email Address
          </Label>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{student.email}</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Phone Number
          </Label>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-900">{student.phone}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FeeSummaryCard = ({ summary }: { summary: InvoiceData["summary"] }) => {
  return (
    <Card className="mb-6 bg-slate-950 text-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <IndianRupee className="w-5 h-5" />
          Overall Fee Summary
        </CardTitle>
        <CardDescription className="text-slate-400">
          Complete financial overview across all enrolled courses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-300">
              Payment Progress
            </Label>
            <span className="text-sm text-slate-300">
              {summary.paymentProgress}%
            </span>
          </div>
          <Progress
            value={parseFloat(summary.paymentProgress)}
            className="h-2 bg-slate-800 [&>div]:bg-white"
          />
        </div>

        <div className="flex gap-6 items-center justify-between pt-2">
          <div className="flex flex-col items-center space-y-1">
            <Label className="text-xs text-slate-400 uppercase">
              Total Fees
            </Label>
            <div className="text-2xl font-bold">
              ₹{summary.totalFees.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Label className="text-xs text-slate-400 uppercase">
              Amount Paid
            </Label>
            <div className="text-2xl font-bold text-green-400">
              ₹{summary.amountPaid.toLocaleString()}
            </div>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Label className="text-xs text-slate-400 uppercase">
              Outstanding
            </Label>
            <div className="text-2xl font-bold text-orange-400">
              ₹{summary.remainingFees.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CourseCard = ({ course }: { course: APICourse }) => {
  return (
    <Card className="mb-6 shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-primary" />
            {course.courseName}
          </CardTitle>
          <BatchTypeIcon type={course.courseMode} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            {course.batchName}
          </span>
          {course.dueDate && (
            <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs font-medium">
              <Clock className="w-3 h-3" />
              Due: {new Date(course.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Payment Progress</Label>
            <span className="text-sm text-muted-foreground">
              {course.paymentProgress}%
            </span>
          </div>
          <Progress
            value={parseFloat(course.paymentProgress)}
            className="h-2"
          />
        </div>

        <div className="space-y-3 flex-1">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Modules
          </Label>
          <div className="grid gap-2">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module, idx) => (
                <div
                  key={module._id || idx}
                  className="flex items-center justify-between p-3 rounded-lg border bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-slate-700">
                      {module.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      ₹{(module.amount || module.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground italic">
                No specific modules listed
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border mt-auto">
          <div className="text-center space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
              Total
            </Label>
            <div className="font-bold text-lg text-slate-900">
              ₹{course.totalFees.toLocaleString()}
            </div>
          </div>
          <div className="text-center space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
              Paid
            </Label>
            <div className="font-bold text-lg text-green-600">
              ₹{course.amountPaid.toLocaleString()}
            </div>
          </div>
          <div className="text-center space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
              Remaining
            </Label>
            <div className="font-bold text-lg text-orange-600">
              ₹{course.remainingFees.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InvoiceTimelineCard = ({
  history,
}: {
  history: APIPaymentHistory[];
}) => (
  <Card className="mb-6 shadow-sm">
    <CardHeader className="pb-4 border-b">
      <CardTitle className="flex items-center gap-2 text-lg">
        <Receipt className="w-5 h-5" />
        Payment History
      </CardTitle>
      <CardDescription>
        Complete timeline of all invoice payments and transactions
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-6">
      <div className="space-y-6">
        {history.length > 0 ? (
          history.map((payment, index) => (
            <div key={index} className="relative pl-6 last:pb-0">
              {index !== history.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-slate-200"></div>
              )}

              <div className="flex items-start gap-4">
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>

                <div className="flex-1 bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="font-bold text-xl text-slate-900">
                      ₹{payment.amount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 px-2 py-1 rounded">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(payment.paymentDate).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-sm text-slate-800">
                      {payment.courseName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Modules: </span>
                      {Array.isArray(payment.modules)
                        ? payment.modules.join(", ")
                        : payment.modules}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <Badge
                      variant="outline"
                      className="capitalize gap-1 pl-1 pr-2"
                    >
                      <PaymentMethodIcon method={payment.mode} />
                      {payment.mode}
                    </Badge>
                    {payment.notes && (
                      <div className="text-xs text-muted-foreground italic">
                        {payment.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No payment history found.
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

interface InvoiceDetailsProps {
  data: InvoiceData;
}

const InvoiceDetails = ({ data }: InvoiceDetailsProps) => {
  // Ideally, you would re-fetch data or use server actions to update
  const [currentData, setCurrentData] = useState<InvoiceData>(data);

  const handleCreateInvoice = (invoice: InvoiceData) => {
    setCurrentData(invoice);
    console.log("New invoice created", invoice);
  };


  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center w-full bg-slate-50/50 p-4 md:p-6">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <Button variant={'ghost'} size={'icon'} onClick={()=> handleCreateInvoice(currentData)} className="opacity-0 h-0 w-0">s</Button>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Invoice Details
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage student payments and generate invoices
            </p>
          </div>
          <div className="flex gap-3">
            {/* <CreateInvoiceDialog
              student={currentData as any}
              onSubmit={handleCreateInvoice}
            /> */}
          </div>
        </div>

        <div className="space-y-6">
          <StudentInfoCard student={currentData.student} />
          <FeeSummaryCard summary={currentData.summary} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentData.courses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>

          <InvoiceTimelineCard history={currentData.paymentHistory} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
