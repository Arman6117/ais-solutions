import React from "react";
import AdminPanelOverview from "./_components/admin-panel-overview";
import OngoingCourses from "./_components/ongoing-courses";

import ScheduleTabs from "./_components/schedule-tabs";

const AdminDashboardPage = () => {
  return (
    <>
      <div className="flex sm:justify-normal items-center   sm:w-2/3 flex-col py-1 gap-10">
        <AdminPanelOverview />

        <div className="pr-4 w-full h-full">
          <ScheduleTabs/>
          {/* <ScheduleCalender /> */}
        </div>
      </div>
      <div className="w-1/3 md:flex hidden h-full p-5 bg-soft-white rounded-4xl">
        <OngoingCourses />
      </div>
    </>
  );
};

export default AdminDashboardPage;
