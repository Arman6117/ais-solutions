"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { adminSignOut } from "@/actions/admin/admin-sign-out";
import { LogOut } from "lucide-react";

export default function AdminSignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await adminSignOut();
    if (res.success) {
      router.push("/auth/login/admin"); // redirect to login page
    }
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      <LogOut />
    </Button>
  );
}
