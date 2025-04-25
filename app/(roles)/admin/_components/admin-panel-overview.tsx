import React from "react";

import AdminOverviewCard from "./admin-overview-card";
import Greetings from "@/components/greetings";

import { FaChalkboardTeacher } from "react-icons/fa";
import { RiArtboardLine } from "react-icons/ri";
import {  BookOpen, Users } from "lucide-react";

const AdminPanelOverview = () => {
  return (
    <div className="w-[90%] flex flex-col gap-10">
      <Greetings>Admin</Greetings>
      <div className="flex gap-10 md:flex-row flex-col items-center ">
        <AdminOverviewCard
          value="1,000"
          label="TOTAL STUDENTS"
          icon={<Users size={20} />}
          variant="students"
        />
        <AdminOverviewCard
          value="42"
          label="TOTAL COURSES"
          icon={<BookOpen size={20} />}
          variant="courses"
        />
      </div>
      <div className="flex  gap-10 md:flex-row flex-col items-center ">
        <AdminOverviewCard
          value="300"
          label="TOTAL BATCHES"
          icon={<RiArtboardLine size={20} />}
          variant="batches"
        />
        <AdminOverviewCard
          value="325"
          label="LECTURES CONDUCTED"
          icon={<FaChalkboardTeacher size={20} />}
          variant="lectures"
        />
      </div>
    </div>
  );
};

export default AdminPanelOverview;
