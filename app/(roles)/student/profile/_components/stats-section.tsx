// components/profile/StatsSection.tsx
import React from 'react';
import { DollarSign, CheckCircle, Clock, Award } from "lucide-react";


import StatCard from './stat-card';
import { StudentData } from '@/lib/types/student';


interface StatsSectionProps {
  studentData: StudentData | null;
}

const StatsSection: React.FC<StatsSectionProps> = ({ studentData }) => {
  if(!studentData) return
  const remainingFees = (studentData.totalFees || 0) - (studentData.amountPaid || 0);
  // const completedCourses = studentData.courses.filter(
  //   (course) => course.status === "Completed"
  // ).length;

  const stats = [
    {
      icon: <DollarSign />,
      value: `₹${studentData.totalFees ?studentData.totalFees.toLocaleString() :0 }`,
      label: "Total Fees",
      color: 'blue' as const,
    },
    {
      icon: <CheckCircle />,
      value: `₹${studentData.amountPaid ?studentData.amountPaid.toLocaleString():0}`,
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
      value: "1",
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