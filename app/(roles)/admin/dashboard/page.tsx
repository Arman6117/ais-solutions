import React from "react";
import AdminPanelOverview from "../_components/admin-panel-overview";
import ScheduleCalender from "../_components/schedule-calender";

const AdminDashboardPage = () => {
  return (
    <div className="ml-12 md:ml-24 flex rounded-4xl px-6 py-7 bg-white h-full">
      <div className="flex flex-col gap-10">
        <AdminPanelOverview />
        <ScheduleCalender/>
      </div>
      <div className="w-[70%] md:flex hidden bg-red-100">s</div>
    </div>
  );
};

export default AdminDashboardPage;
