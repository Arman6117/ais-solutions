"use client";
import React from "react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { adminSidebarLinks } from "@/lib/static";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AdminSignOutButton from "./admin-sign-out";

const AdminSidebar = () => {
  // const [active, setActive] = useState(false);

  const url = usePathname();



  return (
    <div className="h-full  w-12 hidden md:block md:w-24 md:fixed bg-primary-bg ">
      <div className="flex flex-col gap-17 items-center justify-center px-0 py-10 md:p-10 ">
        <div className="text-white ">Logo</div>
        <div className="flex flex-col justify-between">

        <div className="flex flex-col gap-10 ">
          {adminSidebarLinks.map(({ label, link, icon: Icon }) => {
           const isActive = url.includes(link)
            
           return (
              <div key={label} className="flex justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={link}>
                        <Icon className={cn( "transition-all" ,!isActive ? "size-5 lg:size-6 text-white/40 " : "size-6 lg:size-8 text-white")}/>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span className="">{label}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
        </div>
          {/* <AdminSignOutButton/> */}
          </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
