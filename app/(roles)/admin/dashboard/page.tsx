import React from "react";
import AdminPanelOverview from "./_components/admin-panel-overview";
import OngoingCourses from "./_components/ongoing-courses";
import ScheduleTabs from "./_components/schedule-tabs";

// Import Graphs
import NewStudentRegistrationsChart from "./_components/graphs/new-students-registration-chart";
import RevenueOverTimeChart from "./_components/graphs/revenue-over-time";
import FeeStatusDonutChart from "./_components/graphs/fee-status-donut-chart";
import StudentDistributionPieChart from "./_components/graphs/student-distribution-pie-chart";
import SalesChart from "./_components/graphs/sales-chart";
import { getDashboardData } from "@/actions/admin/dashboard/get-admin-dashboard-data";

const AdminDashboardPage = async () => {
  // 1. Fetch Data on the Server
  const response = await getDashboardData();
  
  // 2. Safely extract data with fallbacks
  const { stats, schedule, ongoingBatches } = response.data || {
    stats: {
      totalStudents: 0,
      totalModules: 0,
      totalBatches: 0,
      activeBatches: 0,
      totalRevenue: 0,
      pendingFees: 0,
    },
    schedule: [],
    ongoingBatches: [],
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-auto w-full flex flex-col md:flex-row gap-5">
        
        {/* Left Column: Overview & Schedule */}
        <div className="flex sm:justify-normal items-center sm:w-2/3 flex-col py-1 gap-10">
          {/* Pass stats prop */}
          <AdminPanelOverview stats={stats} />

          <div className="pr-4 w-full h-full">
            {/* Pass sessions prop */}
            <ScheduleTabs sessions={schedule} />
          </div>
        </div>

        {/* Right Column: Ongoing Courses (Hidden on small screens) */}
        <div className="w-full md:w-1/3 md:flex hidden h-auto p-5 bg-soft-white rounded-4xl">
          {/* Pass batches prop */}
          <OngoingCourses batches={ongoingBatches} />
        </div>
      </div>

      {/* Graphs Section */}
      <div className="flex flex-col pb-10 gap-10 mt-10">
        <NewStudentRegistrationsChart />
        <SalesChart />
        <RevenueOverTimeChart />

        <div className="flex justify-between gap-5 md:flex-row flex-col max-w-7xl">
          <FeeStatusDonutChart />
          <StudentDistributionPieChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
