import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const LogOutButton = () => {
  const handleLogOut = async () => {
    try {
      await authClient.signOut();

      toast.success("Successfully logged out");
      redirect("/auth/login/student");
    } catch (error) {
      console.log(error)
      toast.error("Failed to logout");
    }
  };
  return (
    <Button
      className="sm:size-10 cursor-pointer group hover:bg-destructive sm:hover:bg-muted-foreground"
      variant={"ghost"}
      onClick={handleLogOut}
    >
      <LogOut className="sm:text-white group-hover:text-white   sm:size-9" />
    </Button>
  );
};

export default LogOutButton;
