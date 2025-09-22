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
import LogOutButton from "./logout-button";

import { useCourseStore } from "@/store/use-course-store";
import Image from "next/image";

const StudentSidebar = () => {
  const pathname = usePathname();

  const { selectedCourse } = useCourseStore();

  return (
    <div className="h-full w-12 hidden md:block md:w-24 md:fixed bg-primary-bg ">
      <div className="flex flex-col h-full gap-17 items-center justify-center px-0 py-10 md:p-10 ">
        <Image
          src={"/AISLogoWhite.png"}
          alt="logo"
          className="scale-[5] mb-10"
          width={150}
          height={200}
        />

        <div className="flex h-full justify-between flex-col">
          <div className="flex flex-col gap-10">
            {studentSidebarLinks.map(({ label, link, icon: Icon }) => {
              let href = link;
              if (label === "Dashboard") {
                href = selectedCourse?._id
                  ? `${link}?courseId=${selectedCourse._id}`
                  : link;
              }

              const isActive = pathname.startsWith(link);

              return (
                <div key={label} className="flex justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Link href={href}>
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
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
