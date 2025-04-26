import React from "react";
import AdminPanelOverview from "../_components/admin-panel-overview";
import ScheduleCalender from "../_components/schedule-calender";
import OngoingBatches from "../_components/ongoing-batches";
import PageContainer from "@/components/page-container";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="flex w-2/3 flex-col py-1 gap-10">
        <AdminPanelOverview />

        <div className="pr-4 w-full h-full">
          <ScheduleCalender />
        </div>
      </div>
      <div className="w-1/3 md:flex hiddenh-full p-5 bg-soft-white rounded-4xl">
        <OngoingBatches />
      </div>
    </>
  );
};

export default AdminDashboardPage;
