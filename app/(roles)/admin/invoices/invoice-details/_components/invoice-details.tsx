'use client'
import React, { useState } from 'react';
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
  
  Building
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import CreateInvoiceDialog from './create-invoice-dialog';
import { CourseInvoice, Invoice, Mode, PaymentMode, Student } from '@/lib/types/types';
import { mockStudentData } from '@/lib/static';

// Type definitions
interface BatchTypeIconProps {
    type: Mode;
  }
  
  interface PaymentMethodIconProps {
    method: PaymentMode;
  }
  
  interface StudentInfoCardProps {
    student: Student;
  }
  
  interface CourseCardProps {
    course: CourseInvoice;
  }
  
  interface FeeSummaryCardProps {
    courses: CourseInvoice[];
  }
  
  interface InvoiceTimelineCardProps {
    invoices: Invoice[];
  }

// Mock data


const BatchTypeIcon: React.FC<BatchTypeIconProps> = ({ type }) => {
  const config = {
    online: { icon: Monitor, color: "bg-blue-100 text-blue-700", label: "Online" },
    hybrid: { icon: Wifi, color: "bg-purple-100 text-purple-700", label: "Hybrid" },
    offline: { icon: Building, color: "bg-green-100 text-green-700", label: "Offline" }
  };
  
  const { icon: Icon, color, label } = config[type] || config.offline;
  return (
    <Badge variant="secondary" className={`${color} font-medium`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
};

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ method }) => {
  const config = {
    upi: { icon: Smartphone, color: "text-orange-600" },
    card: { icon: CreditCard, color: "text-blue-600" },
    cash: { icon: Banknote, color: "text-green-600" },
    other: { icon: Receipt, color: "text-gray-600" }
  };
  
  const { icon: Icon, color } = config[method] || config.other;
  return <Icon className={`w-4 h-4 ${color}`} />;
};

const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ student }) => (
  <Card className="mb-6">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2">
        <User className="w-5 h-5" />
        Student Information
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{student.name}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{student.email}</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{student.phone}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const progressPercentage = (course.paidFees / course.totalFees) * 100;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {course.name}
          </CardTitle>
          <BatchTypeIcon type={course.batchType} />
        </div>
        <CardDescription className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.batch}
          </span>
          {course.nextDueDate && (
            <span className="flex items-center gap-1 text-orange-600">
              <Clock className="w-4 h-4" />
              Due: {new Date(course.nextDueDate).toLocaleDateString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Payment Progress</Label>
            <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <Label className="text-sm font-medium">Modules</Label>
          <div className="grid gap-2">
            {course.modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  {/* {module.paid ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                  )} */}
                  <span className="font-medium">{module.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">₹{module.price.toLocaleString()}</span>
                  {/* <Badge variant={module.paid ? "default" : "secondary"} className={module.paid ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                    {module.paid ? 'Paid' : 'Pending'}
                  </Badge> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
          <div className="text-center space-y-1">
            <Label className="text-xs text-muted-foreground">Total Fees</Label>
            <div className="font-bold text-lg">₹{course.totalFees.toLocaleString()}</div>
          </div>
          <div className="text-center space-y-1">
            <Label className="text-xs text-muted-foreground">Paid Amount</Label>
            <div className="font-bold text-lg text-green-600">₹{course.paidFees.toLocaleString()}</div>
          </div>
          <div className="text-center space-y-1">
            <Label className="text-xs text-muted-foreground">Remaining</Label>
            <div className="font-bold text-lg text-orange-600">₹{course.remainingFees.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeeSummaryCard: React.FC<FeeSummaryCardProps> = ({ courses }) => {
  const totalFees = courses.reduce((sum, course) => sum + course.totalFees, 0);
  const paidFees = courses.reduce((sum, course) => sum + course.paidFees, 0);
  const remainingFees = courses.reduce((sum, course) => sum + course.remainingFees, 0);
  const overallProgress = (paidFees / totalFees) * 100;

  return (
    <Card className="mb-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5" />
          Overall Fee Summary
        </CardTitle>
        <CardDescription className="text-slate-300">
          Complete financial overview across all enrolled courses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-300">Payment Progress</Label>
            <span className="text-sm text-slate-300">{overallProgress.toFixed(1)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2 bg-slate-700" />
        </div>
        
        <div className="flex gap-6 items-center justify-between">
          <div className="flex flex-col items-center space-y-2">
            <Label className="text-sm text-slate-300">Total Fees</Label>
            <div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div>
          </div>
          <div className="text-center space-y-2">
            <Label className="text-sm text-slate-300">Amount Paid</Label>
            <div className="text-2xl font-bold text-green-400">₹{paidFees.toLocaleString()}</div>
          </div>
          <div className="text-center space-y-2">
            <Label className="text-sm text-slate-300">Outstanding</Label>
            <div className="text-2xl font-bold text-orange-400">₹{remainingFees.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InvoiceTimelineCard = ({ invoices }:InvoiceTimelineCardProps) => (
  <Card className="mb-6">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-2">
        <Receipt className="w-5 h-5" />
        Payment History
      </CardTitle>
      <CardDescription>
        Complete timeline of all invoice payments and transactions
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {invoices.map((invoice, index) => (
          <div key={invoice.id}>
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card">
              <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <PaymentMethodIcon method={invoice.paymentMethod} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">₹{invoice.amount.toLocaleString()}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(invoice.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-sm">{invoice.course}</div>
                  <div className="text-sm text-muted-foreground">Modules: {invoice.module}</div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    <PaymentMethodIcon method={invoice.paymentMethod} />
                    <span className="ml-1">{invoice.paymentMethod}</span>
                  </Badge>
                  {invoice.notes && (
                    <div className="text-xs text-muted-foreground italic max-w-xs">
                      {invoice.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {index < invoices.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);


const InvoiceDetails = () => {
  const [studentData, setStudentData] = useState<Student>(mockStudentData);

  const handleCreateInvoice = (invoice: Invoice): void => {
    setStudentData(prev => ({
      ...prev,
      invoiceHistory: [invoice, ...prev.invoiceHistory]
    }));
  };

  // const handleSendEmail = (): void => {
  //   alert('Invoice email sent successfully!');
  // };

  // const handleDownloadPDF = (): void => {
  //   alert('Invoice PDF downloaded!');
  // };

  return (
    <div className="min-h-screen flex justify-center max-w-full  bg-background p-6">
      <div className="max-w-7xl  mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Invoice Details</h1>
            <p className="text-muted-foreground mt-1">
              Manage student payments and generate invoices
            </p>
          </div>
          <div className="flex gap-3">
            {/* <Button variant="outline" onClick={handleSendEmail}>
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button> */}
            <CreateInvoiceDialog

              student={studentData}
              onSubmit={handleCreateInvoice}
            />
          </div>
        </div>

        <div className="space-y-6">
          <StudentInfoCard student={studentData} />
          <FeeSummaryCard courses={studentData.courses} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studentData.courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <InvoiceTimelineCard invoices={studentData.invoiceHistory} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;