import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const LogOutButton = () => {
  const handleLogOut = async () => {
    try {
      const res = await authClient.signOut();
      console.log(res)
      toast.success("Successfully logged out");
      redirect('/auth/login/student')
    } catch (error) {
        
      toast.error("Failed to logout");
    }
  };
  return (
    <Button
      className="size-10 cursor-pointer hover:bg-muted-foreground"
      variant={"ghost"}
      onClick={handleLogOut}
    >
      <LogOut className="text-white size-9" />
    </Button>
  );
};

export default LogOutButton;
