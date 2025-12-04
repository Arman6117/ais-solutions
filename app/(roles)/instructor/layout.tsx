import React from "react";
import PageContainer from "@/components/page-container";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import InstructorSidebar from "./_components/instructor-sidebar";

const InstructorDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session) {
      redirect("/auth/login/instructor");
    }
    // Optional: strict role check
    // if (session.user.role !== "instructor") redirect("/");
    
  } catch (err) {
    console.log(err);
    redirect("/auth/login/instructor");
  }

  return (
    <main className="h-screen bg-primary-bg">
      <InstructorSidebar />
      <section className="h-full px-2 py-2 md:py-3">
        {/* Adjust margin-left to match sidebar width (md:ml-24) if PageContainer doesn't handle it */}
        <PageContainer>
          {children}
        </PageContainer>
      </section>
    </main>
  );
};

export default InstructorDashboardLayout;
