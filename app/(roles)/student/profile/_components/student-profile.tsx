"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useStudentProfile } from "@/hooks/use-student-profile";
import ProfileHeader from "./profile-header";
import StatsSection from "./stats-section";
import { StudentData } from "@/lib/types/student";
import { AlertTriangle } from "lucide-react";



const PaymentProgress = dynamic(() => import("./payment-progress"), {
  loading: () => (
    <div className="w-full h-32 bg-white/50 rounded-xl animate-pulse border border-slate-200" />
  ),
});

const CoursesSection = dynamic(() => import("./course-section"), {
  loading: () => (
    <div className="w-full h-64 bg-white/50 rounded-xl animate-pulse border border-slate-200" />
  ),
});

type StudentProfileProps = {
  stdData: StudentData | null;
};

const StudentProfile = ({ stdData }: StudentProfileProps) => {
  // Initialize state directly from the server prop
  const [data] = useState<StudentData | null>(stdData);

  const {
    studentData,
    editData,
    isEditing,
    handleEditToggle,
    handleSave,
    handleCancel,
    handleEditDataChange,
    handleImageUpload,
  } = useStudentProfile(data);

  if (!studentData) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full w-full min-h-[50vh]">
        <AlertTriangle className="text-purple-600 h-10 w-10 opacity-50" />
        <h2 className="text-lg font-semibold text-slate-700">Profile Not Found</h2>
        <p className="text-slate-500">We couldn&apos;t retrieve the student data.</p>
      </div>
    );
  }

  // Safely Calculate Fees
  const totalFees = (studentData.invoices || []).reduce((acc, invoice) => {
    const invoiceTotal = (invoice?.courseDetails || []).reduce(
      (total, course) => total + (course?.totalFees || 0),
      0
    );
    return acc + invoiceTotal;
  }, 0);

  const amountPaid = (studentData.invoices || []).reduce((acc, invoice) => {
    const invoicePaid = (invoice?.courseDetails || []).reduce(
      (paid, course) => paid + (course?.amountPaid || 0),
      0
    );
    return acc + invoicePaid;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        
        {/* Critical Content: Loaded Immediately */}
        <ProfileHeader
          studentData={studentData}
          isEditing={isEditing}
          editData={editData}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onCancel={handleCancel}
          onImageUpload={handleImageUpload}
          onEditDataChange={handleEditDataChange}
        />
        
        <StatsSection studentData={studentData} />
        
        {/* Non-Critical Content: Loaded Lazily */}
        <PaymentProgress totalFees={totalFees} paidFees={amountPaid} />
        
        <CoursesSection
          invoices={studentData.invoices || []}
          courses={studentData.courses || []}
        />
      </div>
    </div>
  );
};

export default StudentProfile;
