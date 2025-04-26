import React from "react";
import AdminSidebar from "./_components/admin-sidebar";
import PageContainer from "@/components/page-container";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen  bg-primary-bg">
      <AdminSidebar />
      <section className="h-full  px-2 py-2 md:py-3">
        <PageContainer>{children}</PageContainer>
      </section>
    </main>
  );
};

export default AdminDashboardLayout;
