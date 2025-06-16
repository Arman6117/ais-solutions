import React from "react";
import PageContainer from "@/components/page-container";
import StudentSidebar from "./dashboard/_components/student-sidebar";
import ContactSupportButton from "@/components/contact-support-button";

const StudentDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="h-screen  bg-primary-bg">
      <StudentSidebar />
      <section className="h-full  px-2 py-2 md:py-3">
        <PageContainer>{children}
          <ContactSupportButton/>
        </PageContainer>
      </section>
    </main>
  );
};

export default StudentDashboardLayout;
