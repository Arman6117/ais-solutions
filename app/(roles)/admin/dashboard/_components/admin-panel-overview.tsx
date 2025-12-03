"use client"; // Can be server component if no interaction, but keeping client for flexibility

import React from "react";
import AdminOverviewCard from "./admin-overview-card";
import Greetings from "@/components/greetings";
// import NotificationPanel from "./notification-panel";
import QuickActionPanel from "./quick-action-panel";
import GlobalSearchBar from "./global-search-bar";
import AdminSignOutButton from "./admin-sign-out";

type Stats = {
  totalStudents: number;
  totalModules: number;
  totalBatches: number;
  activeBatches: number;
  totalRevenue: number;
  pendingFees: number;
};

const AdminPanelOverview = ({ stats }: { stats: Stats }) => {
  return (
    <div className="w-[90%] flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <Greetings>Admin</Greetings>
        {/* <NotificationPanel /> */}
        <QuickActionPanel />
        <AdminSignOutButton />
      </div>
      <GlobalSearchBar />
      
      <div className="flex gap-10 md:flex-row flex-col items-center">
        <AdminOverviewCard
          value={stats.totalStudents.toString()}
          label="TOTAL STUDENTS"
          variant="students"
        />
        <AdminOverviewCard
          value={stats.totalModules.toString()}
          label="TOTAL MODULES"
          variant="courses"
        />
      </div>
      
      <div className="flex drop-shadow-xl drop-shadow-indigo-600/10 gap-10 md:flex-row flex-col items-center">
        <AdminOverviewCard
          value={stats.totalBatches.toString()}
          label="TOTAL BATCHES"
          variant="batches"
        />
        <AdminOverviewCard
          value={stats.activeBatches.toString()}
          label="ACTIVE BATCHES"
          variant="activeBatches"
        />
      </div>
      
      <div className="flex drop-shadow-xl drop-shadow-indigo-600/10 gap-10 md:flex-row flex-col items-center">
        <AdminOverviewCard
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          label="TOTAL REVENUE"
          variant="revenue"
        />
        <AdminOverviewCard
          value={`₹${stats.pendingFees.toLocaleString()}`}
          label="PENDING FEES"
          variant="pendingFees"
        />
      </div>
    </div>
  );
};

export default AdminPanelOverview;
