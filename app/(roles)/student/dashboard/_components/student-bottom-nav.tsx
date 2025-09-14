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
    <div className="fixed sm:hidden bottom-0 left-0 right-0 h-16 bg-white border-t z-50 shadow-[0_-4px_12px_-2px_rgba(0,0,0,0.1)]">
      <nav className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {studentSidebarLinks.map(({ label, link, icon: Icon }) => {
          const isActive = pathname === link || (link !== "/dashboard" && pathname.startsWith(link));
          
          return (
            <Link
              href={link}
              key={label}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors rounded-lg active:bg-gray-100",
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-500 hover:text-primary"
              )}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="text-xs leading-tight">{label}</span>
            </Link>
          );
        })}
        {/* Logout button */}
        <div className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-500 rounded-lg active:bg-gray-100">
          <LogOutButton />
          <span className="text-xs leading-tight">Logout</span>
        </div>
      </nav>
    </div>
  );
};

export default StudentBottomNav;
