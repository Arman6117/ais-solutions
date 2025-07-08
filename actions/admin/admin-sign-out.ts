"use server";

import { cookies } from "next/headers";

export const adminSignOut = async () => {
  const cookieStore = cookies();

  // Clear the session cookie
  cookieStore.set("admin_session", "", {
    maxAge: 0,
    path: "/",
  });

  return { success: true, message: "Logged out successfully" };
};
