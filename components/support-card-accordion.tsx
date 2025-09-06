"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddSupportMemberDialog from "./add-support-member-dialog";

type SupportCardAccordionProps = {
  departmentId: string;
  departmentName: string;
  description?: string;
  icon: React.ReactNode;
  colorTheme?: string;
  children?: React.ReactNode;
};

// const getGradient = (color: string) => {
//   switch (color) {
//     case "blue":
//       return "from-gray-800 to-gray-900";
//     case "green":
//       return "from-green-600 to-green-900";
//     case "purple":
//       return "from-purple-600 to-purple-900";
//     case "orange":
//       return "from-orange-500 to-orange-800";
//     case "red":
//       return "from-rose-600 to-rose-900";
//     default:
//       return "from-primary-bg to-gray-900";
//   }
// };

const SupportCardAccordion = ({
  departmentId,
  departmentName,
  description = "Support Department",
  icon,
  colorTheme = "blue",
  children,
}: SupportCardAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="max-w-4xl w-full">
      <AccordionItem value={departmentId}>
        <AccordionTrigger
          className={`p-6 hover:no-underline relative bg-gradient-to-br 
            ${colorTheme} rounded-md text-white`}
        >
          <div className="flex gap-2 items-center w-full">
            <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
              {icon}
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{departmentName}</span>
              <span className="text-lg text-neutral-300">{description}</span>
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
          </div>
        </AccordionTrigger>

        {/* <AccordionContent className="bg-gray-100 p-5 rounded-b-md"> */}
        <AccordionContent className="bg-gray-100 p-5 rounded-b-md">
          <div className="flex justify-end mb-4">
            <AddSupportMemberDialog
              onSubmit={(member) => {
                console.log("New member added to", departmentName, member);
                // 👉 Store or backend logic here
              }}
            />
          </div>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SupportCardAccordion;
