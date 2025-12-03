import React from "react";
import Sessions from "./_components/sessions";
import { auth } from "@/lib/auth"; // Assuming this is your server-side auth instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getStudentId } from "@/actions/shared/get-student-id";
import { getStudentSessions } from "@/actions/shared/get-sessions";
import { getStudentModules } from "@/actions/student/sessions/get-student-modules";

// Helper function to filter past sessions (Moved from client)
const isSessionPast = (sessionDate: Date | string, sessionTime: string) => {
  const currentDateTime = new Date();
  const sessionDateObj = new Date(sessionDate);

  if (sessionTime && sessionTime.includes(":")) {
    const [hours, minutes] = sessionTime
      .split(":")
      .map((num) => parseInt(num, 10));
    sessionDateObj.setHours(hours, minutes, 0, 0);
  } else {
    sessionDateObj.setHours(23, 59, 59, 999);
  }

  return sessionDateObj < currentDateTime;
};

const SessionsPage = async () => {
  // 1. Server-side Authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/auth/login/student"); 
  }

  // 2. Fetch Student ID
  const studentId = await getStudentId(session.user.email);

  if (!studentId) {
    // Handle edge case where user exists but has no student profile
    return <div>Student profile not found.</div>;
  }

  // 3. Fetch Sessions and Modules in parallel
  const [sessionsRes, modulesRes] = await Promise.all([
    getStudentSessions(studentId),
    getStudentModules(studentId),
  ]);

  // 4. Pre-filter for "Past" sessions on the server
  // This reduces the payload sent to the client
  const pastSessions = sessionsRes.data ? sessionsRes.data.filter((session) => 
    isSessionPast(session.date, session.time)
  ) : [];

  const modules = modulesRes.data || [];

  return (
    <>
      <Sessions 
        initialSessions={pastSessions} 
        initialModules={modules} 
        studentId={studentId} 
      />
    </>
  );
};

export default SessionsPage;
