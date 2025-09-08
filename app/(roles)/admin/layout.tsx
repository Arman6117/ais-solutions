import React from "react";

import PageContainer from "@/components/page-container";
import AdminSidebar from "./dashboard/_components/admin-sidebar";
import AdminMobileNav from "./dashboard/_components/admin-sidebar-mobile";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen bg-primary-bg">
      {/* --- Desktop Sidebar (Visible on medium screens and up) --- */}
      <AdminSidebar />
      
      {/* --- Mobile Bottom Navigation (Visible on small screens) --- */}
      <AdminMobileNav />

     
      <section className="h-full  px-2 py-2 md:py-3">
        <PageContainer>{children}</PageContainer>
      </section>
    </main>
  );
};

export default AdminDashboardLayout;