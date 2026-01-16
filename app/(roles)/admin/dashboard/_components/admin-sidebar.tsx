"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminSidebarLinks } from "@/lib/static";
import { cn } from "@/lib/utils";
import { LogOut, X } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { adminSignOut } from "@/actions/admin/admin-sign-out";

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {

  const router = useRouter()
  const handleSignOut = async () => {
    const res = await adminSignOut();
    if (res.success) {
      router.push("/auth/login/admin"); // redirect to login page
    }
  };
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      {/* --- Overlay (for mobile) --- */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* --- Sidebar --- */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-primary-bg z-50 transition-transform duration-300 ease-in-out",
          "w-64 md:w-24", // Width for mobile drawer and desktop sidebar
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full items-center py-8">
          {/* Header with Logo and Close button (mobile) */}
          <div className="flex items-center justify-between w-full px-6 md:justify-center md:px-0 mb-16">
            <Link href="/admin/dashboard">
              <Image
                src={"/AISLogoWhite.png"}
                alt="logo"
                className="scale"
                width={150}
                height={200}
              />
            </Link>
            <button className="md:hidden text-white/80" onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-stretch md:items-center w-full gap-4">
            {adminSidebarLinks.map(({ label, link, icon: Icon }) => {
              const isActive = pathname.includes(link);
              return (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={link}
                      onClick={onClose} // Close sidebar on link click for mobile
                      className={cn(
                        "flex items-center gap-4 text-white/60 hover:text-white hover:bg-white/10 p-3 rounded-md transition-colors",
                        "md:justify-center md:p-2", // Desktop-specific styles
                        isActive && "text-white bg-white/10"
                      )}
                    >
                      <Icon className="size-6 flex-shrink-0" />
                      <span className="md:hidden">{label}</span>{" "}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden md:block">
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>

          {/* Sign Out Button (at the bottom) */}
          <div className="mt-auto w-full px-3 md:px-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleSignOut} className="flex items-center w-full gap-4 text-white/60 hover:text-white hover:bg-white/10 p-3 rounded-md transition-colors md:justify-center md:p-2">
                  <LogOut className="size-6 flex-shrink-0" />
                  <span className="md:hidden">Sign Out</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block">
                <p>Sign Out</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default AdminSidebar;