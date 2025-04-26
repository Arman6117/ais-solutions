import React from "react";
import AdminPanelOverview from "../_components/admin-panel-overview";
import ScheduleCalender from "../_components/schedule-calender";
import OngoingBatches from "../_components/ongoing-batches";

const AdminDashboardPage = () => {
  return (
    <div className="ml-12 md:ml-24 flex rounded-4xl px-6 py-4 bg-white h-full">
      <div className="flex w-2/3 flex-col py-1 gap-10">
        <AdminPanelOverview />

        <div className="pr-4 w-full h-full">
          <ScheduleCalender />
        </div>
      </div>
      <div className="w-1/3 md:flex hidden h-full p-5 bg-soft-white rounded-4xl">
        <OngoingBatches/>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
