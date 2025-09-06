"use server";

import { cookies } from "next/headers";

export const adminSignOut = async () => {
  const cookieStore =await cookies();

  // Clear the session cookie
  cookieStore.set("admin_session", "", {
    maxAge: 0,
    path: "/",
  });

  return { success: true, message: "Logged out successfully" };
};
