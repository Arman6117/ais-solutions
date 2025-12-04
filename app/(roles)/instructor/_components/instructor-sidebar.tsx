"use client";
import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import LogOutButton from "@/app/(roles)/student/dashboard/_components/logout-button"; // Reusing your existing logout button
import Image from "next/image";
import { Layers } from "lucide-react"; // Icon for Batches

const instructorLinks = [
  {
    label: "All Batches",
    link: "/instructor/all-batches",
    icon: Layers,
  },
];

const InstructorSidebar = () => {
  const pathname = usePathname();

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
            {instructorLinks.map(({ label, link, icon: Icon }) => {
              const isActive = pathname.startsWith(link);

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
                      <TooltipContent side="right">
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

export default InstructorSidebar;
