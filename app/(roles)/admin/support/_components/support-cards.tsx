"use client";
import React from "react";
import { Building2 } from "lucide-react";
import SupportCardAccordion from "@/components/support-card-accordion";
import { dummySupportCards } from "@/lib/static";
import SupportCard from "@/components/support-card";
import { useSupportDepartmentStore } from "@/store/use-support-deparment-store";
import { ICON_COMPONENTS } from "@/lib/utils"; // <-- make sure it's exporting component map

const SupportCards = () => {
  const { departments } = useSupportDepartmentStore();

  return (
    <div className="flex flex-col gap-7">
      {departments.map((department) => {
        const Icon = ICON_COMPONENTS[department.icon] || Building2;
        const filteredMembers = dummySupportCards.filter(
          (member) => member.department.toLowerCase() === department.name
        );

        return (
          <SupportCardAccordion
            key={department.id}
            departmentId={department.name.toLowerCase().replace(/\s+/g, "-")}
            departmentName={department.name.toLocaleUpperCase()}
            icon={<Icon className="size-6 text-white" />}
            colorTheme={department.color}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredMembers.map((member) => (
                <SupportCard
                  key={member.id}
                  name={member.name}
                  role={member.designation}
                  email={member.email}
                  phone={member.contact}
                  availableTime={member.availableTime}
                />
              ))}
            </div>
          </SupportCardAccordion>
        );
      })}
    </div>
  );
};

export default SupportCards;
