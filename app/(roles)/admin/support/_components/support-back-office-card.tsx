"use client";
import React from "react";
import { Building2 } from "lucide-react";
import SupportCardAccordion from "@/components/support-card-accordion";
import { dummySupportCards } from "@/lib/static";
import SupportCard from "@/components/support-card";


const backOfficeMembers = dummySupportCards.filter(
    (member) => member.department === "Back Office"
  );
  
const SupportBackOfficeCard = () => {
  return (
    <>
       <SupportCardAccordion
        departmentId="back-office"
        departmentName="Back Office"
        icon={<Building2 className="w-7 h-7 text-white" />}
        colorTheme="blue"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {backOfficeMembers.map((member) => (
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
    </>
  );
};

export default SupportBackOfficeCard;
