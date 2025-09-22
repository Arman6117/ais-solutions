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
import ProfileHeaderSkeleton from "@/components/skeletons/profile-header";

const StudentProfile = () => {
  const [data,setData] = useState<StudentData | null>(null)
  const [loading,setLoading] = useState(false);
  const fetchStudentInfo = async() => {
    setLoading(true)
    try {
      const session = await authClient.getSession()
      if(!session.data) return
      const studentId = await getStudentId(session.data.user.email!)
      if(!studentId) {
        return
      }
      const res = await getStudentProfile(studentId);
      
      setData(res.data)
      toast.message(res.message)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  useEffect(()=> {
    fetchStudentInfo()
  }, [])
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

  if(loading)  <ProfileHeaderSkeleton/>
  if(!studentData) {
    return (
      <div>No student</div>
    )
  }

  console.log(studentData)
  const totalFees = studentData?.invoices?.reduce((total, invoice) => 
    total + invoice.courseDetails.reduce((courseTotal, course) => 
      courseTotal + course.totalFees, 0), 0) || 0;
  
  const amountPaid = studentData?.invoices?.reduce((total, invoice) => 
    total + invoice.courseDetails.reduce((courseTotal, course) => 
      courseTotal + course.amountPaid, 0), 0) || 0;
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

        
        <CoursesSection data={studentData} />
      </div>
    </div>
  );
};

export default StudentProfile;
