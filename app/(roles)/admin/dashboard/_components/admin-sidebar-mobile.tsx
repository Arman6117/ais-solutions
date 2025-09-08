"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSidebarLinks } from "@/lib/static";
import { cn } from "@/lib/utils";

const AdminMobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-50 shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.05)]">
      <nav className="flex items-center justify-around h-full">
        {adminSidebarLinks.map(({ label, link, icon: Icon }) => {
          // Use a more precise check for the active link
          const isActive = pathname === link || (link !== "/admin/dashboard" && pathname.startsWith(link));

          return (
            <Link
              href={link}
              key={label}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-200 ease-in-out",
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-500 hover:text-primary"
              )}
            >
              <Icon className="size-6" />
              {/* FIX: Conditionally render the label only if the link is active */}
              {isActive && <span className="text-xs">{label}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminMobileNav;