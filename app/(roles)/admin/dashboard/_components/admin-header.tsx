"use client";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminHeaderProps = {
  onMenuClick: () => void;
};

const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  return (
    // <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b">
      <div className="container sm:hidden mx-auto h-14 flex items-center">
        {/* Burger menu button, only visible on mobile */}
        <Button
          variant="ghost"
          size="lg"
          className="md:hidden"
          onClick={onMenuClick}
        >
          <Menu className="size-7" />
          <span className="sr-only">Open Menu</span>
        </Button>

        {/* You can add a page title or breadcrumbs here */}
        {/* <div className="flex-1 ml-4">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div> */}
      </div>
    // </header>
  );
};

export default AdminHeader;