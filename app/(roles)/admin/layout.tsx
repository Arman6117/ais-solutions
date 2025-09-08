"use client"; // This layout now needs state, so it must be a client component

import React, { useState } from "react";

import PageContainer from "@/components/page-container";
import AdminSidebar from "./dashboard/_components/admin-sidebar";
import AdminHeader from "./dashboard/_components/admin-header";


const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className=" sm:bg-primary-bg ">
      {/* The sidebar is now controlled by state on mobile */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* The main content area */}
      <div className=" transition-all duration-300 ">
        {/* The header contains the burger button for mobile */}
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <section className="px-2 h-screen py-3">
          <PageContainer>{children}</PageContainer>
        </section>
      </div>
    </main>
  );
};

export default AdminDashboardLayout;