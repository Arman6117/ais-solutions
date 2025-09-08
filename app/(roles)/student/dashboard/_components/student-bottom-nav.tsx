"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { studentSidebarLinks } from "@/lib/static";
import { cn } from "@/lib/utils";
import LogOutButton from "./logout-button";

const StudentBottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed sm:hidden bottom-0 left-0 right-0 h-16 bg-white border-t z-50 shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.05)]">
      <nav className="flex items-center justify-around h-full max-w-lg mx-auto">
        {studentSidebarLinks.map(({ label, link, icon: Icon }) => {
          const isActive = pathname === link || (link !== "/dashboard" && pathname.startsWith(link));
          
          return (
            <Link
              href={link}
              key={label}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-500 hover:text-primary"
              )}
            >
              <Icon className="size-6" />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
        {/* Integrate the logout button directly into the nav */}
        <div className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-500">
          <LogOutButton />
          <span className="text-xs">Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default StudentBottomNav;