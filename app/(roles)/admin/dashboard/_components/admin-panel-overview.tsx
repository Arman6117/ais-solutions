import React from "react";

import AdminOverviewCard from "./admin-overview-card";
import Greetings from "@/components/greetings";

import NotificationPanel from "./notification-panel";
import QuickActionPanel from "./quick-action-panel";
import GlobalSearchBar from "./global-search-bar";
import AdminSignOutButton from "./admin-sign-out";
import { getAdminDashboardStats } from "@/actions/admin/get-admin-dashboard-stats";

const AdminPanelOverview = async () => {
  const { totalStudents } = await getAdminDashboardStats();
  return (
    <div className="w-[90%] flex flex-col gap-10">
      <div className="flex  items-center gap-4">
        <Greetings>Admin</Greetings>
        <NotificationPanel />
        <QuickActionPanel />
        <AdminSignOutButton />
      </div>
      <GlobalSearchBar />
      <div className="flex gap-10 md:flex-row flex-col items-center ">
        {/*//TODO:Make dynamic */}
        <AdminOverviewCard
          value={totalStudents}
          label="TOTAL STUDENTS"
          // icon={<Users size={20} />}
          variant="students"
        />
        <AdminOverviewCard
          value="42"
          label="TOTAL Modules"
          // icon={<BookOpen size={20} />}
          variant="courses"
        />
      </div>
      <div className="flex  drop-shadow-xl drop-shadow-indigo-600/10  gap-10 md:flex-row flex-col items-center ">
        <AdminOverviewCard
          value="300"
          label="TOTAL BATCHES"
          // icon={<RiArtboardLine size={20} />}
          variant="batches"
        />
        <AdminOverviewCard
          value="100"
          label="Active Batches"
          // icon={<FaChalkboardTeacher size={20} />}
          variant="activeBatches"
        />
        {/*//TODO:Make dynamic */}
      </div>
      <div className="flex  drop-shadow-xl drop-shadow-indigo-600/10  gap-10 md:flex-row flex-col items-center ">
        <AdminOverviewCard
          value="₹30000"
          label="Total Revenue"
          // icon={<FaChalkboardTeacher size={20} />}
          variant="revenue"
        />
        <AdminOverviewCard
          value="₹10000"
          label="Pending Fees"
          // icon={<FaChalkboardTeacher size={20} />}
          variant="pendingFees"
        />
      </div>
    </div>
  );
};

export default AdminPanelOverview;
