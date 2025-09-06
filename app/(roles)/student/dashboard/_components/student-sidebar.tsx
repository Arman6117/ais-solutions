"use client";
import React from "react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { studentSidebarLinks } from "@/lib/static";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { IoExit } from "react-icons/io5";
import LogOutButton from "./logout-button";
const StudentSidebar = () => {
  // const [active, setActive] = useState(false);

  const url = usePathname();

  return (
    <div className="h-full  w-12 hidden md:block md:w-24 md:fixed bg-primary-bg ">
      <div className="flex flex-col h-full gap-17 items-center justify-center px-0 py-10 md:p-10 ">
        <div className="text-white ">Logo</div>
        <div className="flex h-full justify-between flex-col">
          <div className="flex flex-col gap-10">
            {studentSidebarLinks.map(({ label, link, icon: Icon }) => {
              const isActive = url.includes(link);

              return (
                <div key={label} className="flex justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={link}>
                          <Icon
                            className={cn(
                              "transition-all",
                              !isActive
                                ? "size-5 lg:size-6 text-white/40 "
                                : "size-6 lg:size-8 text-white"
                            )}
                          />
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
        <LogOutButton/>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
