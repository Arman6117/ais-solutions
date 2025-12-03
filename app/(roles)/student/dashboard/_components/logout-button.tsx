"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

import React, { useState } from "react";
import { toast } from "sonner";

const LogOutButton = () => {
 
  const [isLoading, setIsLoading] = useState(false);

  const handleLogOut = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // 1. Call signOut but disable internal redirect if possible
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // This callback runs when the server says "OK, session deleted"
            console.log("Session destroyed on server.");
          },
        },
      });
      
      // 2. Manually nuke the cookie (Backup for client-side stickiness)
      // Note: This won't work for HttpOnly cookies but helps clean up client state
      document.cookie = "better-auth.session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      // 3. Show success
      toast.success("Successfully logged out");

      // 4. The Nuclear Option: Force a full browser reload to the login page
      // This guarantees no stale state remains.
      window.location.href = "/auth/login/student";

    } catch (error) {
      console.error("Logout error:", error);
      // Even if error, force redirect because the user WANTS to leave
      window.location.href = "/auth/login/student";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="sm:size-10 cursor-pointer group hover:bg-destructive sm:hover:bg-muted-foreground"
      variant={"ghost"}
      onClick={handleLogOut}
      disabled={isLoading}
    >
      <LogOut className={`sm:text-white group-hover:text-white sm:size-9 ${isLoading ? 'opacity-50' : ''}`} />
    </Button>
  );
};

export default LogOutButton;

