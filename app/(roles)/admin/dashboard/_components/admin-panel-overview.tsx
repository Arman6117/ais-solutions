import React from "react";

import AdminOverviewCard from "./admin-overview-card";
import Greetings from "@/components/greetings";

import { FaChalkboardTeacher } from "react-icons/fa";
import { RiArtboardLine } from "react-icons/ri";
import { BookOpen, Users } from "lucide-react";
import MeetingsPanel from "./meetings-panel";
import NotificationPanel from "./notification-panel";
import QuickActionPanel from "./quick-action-panel";
import GlobalSearchBar from "./global-search-bar";

const AdminPanelOverview = () => {
  return (
    <div className="w-[90%] flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <Greetings>Admin</Greetings>
        <NotificationPanel />
        <QuickActionPanel/>
      </div>
        <GlobalSearchBar/>
      <div className="flex gap-10 md:flex-row flex-col items-center ">
        <AdminOverviewCard
          value="1,000"
          label="TOTAL STUDENTS"
          // icon={<Users size={20} />}
          variant="students"
        />
        {/*//TODO:Make dynamic */}
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
