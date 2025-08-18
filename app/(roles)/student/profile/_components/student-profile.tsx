"use client";

import React from "react";
import { dummyStudentProfile } from "@/lib/static";
import { useStudentProfile } from "@/hooks/use-student-profile";
import ProfileHeader from "./profile-header";
import StatsSection from "./stats-section";
import PaymentProgress from "./payment-progress";
import CoursesSection from "./course-section";

const StudentProfile: React.FC = () => {
  const {
    studentData,
    editData,
    isEditing,
    handleEditToggle,
    handleSave,
    handleCancel,
    handleEditDataChange,
    handleImageUpload,
  } = useStudentProfile(dummyStudentProfile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        {/* Profile Header with Edit Functionality */}
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

        {/* Statistics Cards */}
        <StatsSection studentData={studentData} />

        {/* Payment Progress */}
        <PaymentProgress
          totalFees={studentData.totalFees}
          paidFees={studentData.paidFees}
        />

        {/* Enrolled Courses Section */}
        <CoursesSection courses={studentData.courses} />
      </div>
    </div>
  );
};

export default StudentProfile;
