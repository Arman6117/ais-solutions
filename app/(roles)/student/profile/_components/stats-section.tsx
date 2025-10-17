
import React from "react";
import { DollarSign, CheckCircle, Clock, Award } from "lucide-react";

import StatCard from "./stat-card";
import { StudentData } from "@/lib/types/student";

interface StatsSectionProps {
  studentData: StudentData;
}

const StatsSection: React.FC<StatsSectionProps> = ({ studentData }) => {
  const completedCourses = studentData.batches.filter(
    (batch) => batch.batchId.status === "Completed"
  ).length;

  const totalFees = studentData.invoices
    .map((invoice) => {
      return invoice.courseDetails.reduce(
        (total, course) => total + (course.totalFees || 0),
        0
      );
    })
    .reduce((sum, current) => sum + current, 0);

  const remainingFees = studentData.invoices
    .map((invoice) => {
      return invoice.courseDetails.reduce(
        (remaining, course) => remaining + (course.remainingFees || 0),
        0
      );
    })
    .reduce((sum, current) => sum + current, 0);
    
  const amountPaid = studentData.invoices
    .map((invoice) => {
      return invoice.courseDetails.reduce(
        (paid, course) => paid + (course.amountPaid || 0),
        0
      );
    })
    .reduce((sum, current) => sum + current, 0);
  const stats = [
    {
      icon: <DollarSign />,
      value: `₹${totalFees ? totalFees : 0}`,
      label: "Total Fees",
      color: "blue" as const,
    },
    {
      icon: <CheckCircle />,
      value: `₹${amountPaid ? amountPaid.toLocaleString() : 0}`,
      label: "Paid Amount",
      color: "emerald" as const,
    },
    {
      icon: <Clock />,
      value: `₹${remainingFees.toLocaleString()}`,
      label: "Remaining",
      color: "orange" as const,
    },
    {
      icon: <Award />,
      value: completedCourses,
      label: "Completed",
      color: "purple" as const,
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
