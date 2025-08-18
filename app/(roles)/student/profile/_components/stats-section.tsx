// components/profile/StatsSection.tsx
import React from 'react';
import { DollarSign, CheckCircle, Clock, Award } from "lucide-react";

import { StudentProfile } from '@/lib/types/student-profile.type';
import StatCard from './stat-card';


interface StatsSectionProps {
  studentData: StudentProfile;
}

const StatsSection: React.FC<StatsSectionProps> = ({ studentData }) => {
  const remainingFees = studentData.totalFees - studentData.paidFees;
  const completedCourses = studentData.courses.filter(
    (course) => course.status === "Completed"
  ).length;

  const stats = [
    {
      icon: <DollarSign />,
      value: `₹${studentData.totalFees.toLocaleString()}`,
      label: "Total Fees",
      color: 'blue' as const,
    },
    {
      icon: <CheckCircle />,
      value: `₹${studentData.paidFees.toLocaleString()}`,
      label: "Paid Amount",
      color: 'emerald' as const,
    },
    {
      icon: <Clock />,
      value: `₹${remainingFees.toLocaleString()}`,
      label: "Remaining",
      color: 'orange' as const,
    },
    {
      icon: <Award />,
      value: completedCourses,
      label: "Completed",
      color: 'purple' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsSection;