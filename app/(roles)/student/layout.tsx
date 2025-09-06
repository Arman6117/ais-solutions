import React from "react";
import PageContainer from "@/components/page-container";
import StudentSidebar from "./dashboard/_components/student-sidebar";
import ContactSupportButton from "@/components/contact-support-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const StudentDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    // await getStudentCourses(session?.user.id as string);
   
    if (!session) {
      redirect("/auth/login/student");
    }
  } catch (err) {
    console.log(err)
    redirect("/auth/login/student");
  }

  return (
    <main className="h-screen  bg-primary-bg">
      <StudentSidebar />
      <section className="h-full  px-2 py-2 md:py-3">
        <PageContainer>
          {children}
          <ContactSupportButton />
        </PageContainer>
      </section>
    </main>
  );
};

export default StudentDashboardLayout;
