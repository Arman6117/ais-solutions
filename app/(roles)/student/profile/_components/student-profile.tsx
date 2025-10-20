"use client";
import React, { useEffect, useState } from "react";
import { useStudentProfile } from "@/hooks/use-student-profile";
import ProfileHeader from "./profile-header";
import StatsSection from "./stats-section";
import PaymentProgress from "./payment-progress";
import CoursesSection from "./course-section";
import { authClient } from "@/lib/auth-client";
import { getStudentId } from "@/actions/shared/get-student-id";
import { getStudentProfile } from "@/actions/student/profile/get-student-profile";
import { StudentData } from "@/lib/types/student";
import { toast } from "sonner";
import { AlertTriangle, Loader2 } from "lucide-react";

const StudentProfile = () => {
  const [data, setData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchStudentInfo = async () => {
    setLoading(true);
    try {
      const session = await authClient.getSession();
      if (!session) {
        return;
      }

      const userEmail = session.data?.user?.email;
      if (!userEmail) {
        toast.error("User email not found");
        return;
      }

      const studentId = await getStudentId(userEmail);
      if (!studentId) {
        toast.error("Student ID not found");
        return;
      }

      const res = await getStudentProfile(studentId);
      setData(res.data);
      toast.message(res.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentInfo();
  }, []);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader2 className="text-primary-bg h-7 w-7 animate-spin" />
      </div>
    );
  }
 
  const totalFees = studentData?.invoices
    .map((invoice) => {
      return invoice.courseDetails.reduce(
        (total, course) => total + (course.totalFees || 0),
        0
      );
    })
    .reduce((sum, current) => sum + current, 0);

  const amountPaid = studentData?.invoices
    .map((invoice) => {
      return invoice.courseDetails.reduce(
        (paid, course) => paid + (course.amountPaid || 0),
        0
      );
    })
    .reduce((sum, current) => sum + current, 0);
    if (!studentData) {
      return (
        <div className="flex flex-col gap-4 items-center justify-center h-full w-full">
          <AlertTriangle className="text-primary-bg h-7 w-7 " />
          <h1>Something went wrong</h1>
        </div>
      );
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
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
        <PaymentProgress
          totalFees={totalFees || 0}
          paidFees={amountPaid || 0}
        />
        <CoursesSection
          invoices={studentData.invoices}
          courses={studentData?.courses || []}
        />
      </div>
    </div>
  );
};

export default StudentProfile;
