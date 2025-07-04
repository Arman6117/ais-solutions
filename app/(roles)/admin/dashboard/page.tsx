import React from "react";
import AdminPanelOverview from "./_components/admin-panel-overview";
import OngoingCourses from "./_components/ongoing-courses";

import ScheduleTabs from "./_components/schedule-tabs";
import NewStudentRegistrationsChart from "./_components/graphs/new-students-registration-chart";
import RevenueOverTimeChart from "./_components/graphs/revenue-over-time";
import FeeStatusDonutChart from "./_components/graphs/fee-status-donut-chart";
import StudentDistributionPieChart from "./_components/graphs/student-distribution-pie-chart";
import SalesChart from "./_components/graphs/sales-chart";

const AdminDashboardPage = () => {
  return (
    <div className=" flex flex-col   w-full h-full">
      <div className="h-auto w-full flex">
        <div className="flex sm:justify-normal items-center   sm:w-2/3 flex-col py-1 gap-10">
          <AdminPanelOverview />

          <div className="pr-4 w-full h-full">
            <ScheduleTabs />
          </div>
        </div>
        <div className="w-1/3 md:flex hidden h-auto p-5 bg-soft-white rounded-4xl">
          <OngoingCourses />
        </div>
      </div>
      <div className=" flex flex-col pb-10 gap-10  mt-10">
        <NewStudentRegistrationsChart/>
        <SalesChart/>
        <RevenueOverTimeChart/>

        <div className="flex justify-between gap-5 md:flex-row flex-col max-w-7xl">
          <FeeStatusDonutChart/>
          <StudentDistributionPieChart/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
