import React from "react";
import { Building2, Users } from "lucide-react";
import SupportCardAccordion from "@/components/support-card-accordion";
import SupportCard from "@/components/support-card";
import { ICON_COMPONENTS } from "@/lib/utils";
import { getSupportDepartments } from "@/actions/admin/support/get-support-data";
import { ISupportDepartment, SupportMember } from "@/lib/types/support.type";

// This is now a Server Component (removed "use client")
const SupportCards = async () => {
  // Fetch data directly on the server
  const result = await getSupportDepartments();
  const departments = result.data || [];

  if (!departments.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-slate-50 rounded-xl border border-dashed border-slate-200">
        <Users className="h-12 w-12 mb-4 opacity-20" />
        <p className="text-lg font-medium text-slate-600">
          No support departments found
        </p>
        <p className="text-sm text-slate-400">
          Create a department to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {departments.map((department: ISupportDepartment) => {
        const Icon = ICON_COMPONENTS[department.icon] || Building2;
        const members = department.members || [];

        // Extract a base color for the card highlights from the gradient string
        // Fallback logic to map gradient classes to simple bg colors for the child cards
        let cardHighlightColor = "bg-slate-100";
        const colorStr = department.color || "";

        if (colorStr.includes("blue")) cardHighlightColor = "bg-blue-100/50";
        else if (colorStr.includes("purple"))
          cardHighlightColor = "bg-purple-100/50";
        else if (colorStr.includes("green"))
          cardHighlightColor = "bg-green-100/50";
        else if (colorStr.includes("orange"))
          cardHighlightColor = "bg-orange-100/50";
        else if (colorStr.includes("pink") || colorStr.includes("rose"))
          cardHighlightColor = "bg-rose-100/50";
        else if (colorStr.includes("teal"))
          cardHighlightColor = "bg-teal-100/50";
        else if (colorStr.includes("indigo"))
          cardHighlightColor = "bg-indigo-100/50";

        return (
          <SupportCardAccordion
            key={department._id.toString()} // Use _id from DB
            departmentId={department._id.toString()} // Pass _id needed for add member logic
            departmentName={department.name}
            description={
              members.length > 0
                ? `${members.length} Active Members`
                : "No active members"
            }
            icon={<Icon className="size-6 text-white" />}
            colorTheme={department.color}
            memberCount={members.length}
          >
            {members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-1">
                {members.map((member: SupportMember) => (
                  // ... inside SupportCards.tsx map loop

                  <SupportCard
                    key={member._id}
                    memberId={member._id!} // Pass Member ID
                    departmentId={department._id.toString()} // Pass Dept ID (needed for update logic)
                    name={member.name}
                    role={member.designation}
                    email={member.email}
                    phone={member.contact}
                    availableTime={member.availableTime}
                    assignedBatches={member.assignedBatches as unknown as { id: string; name: string }[]} // Pass batches for edit dialog
                    departmentColor={cardHighlightColor}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                  <Icon className="size-6 text-slate-400" />
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  No members added to {department.name} yet.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Click Add Member to get started.
                </p>
              </div>
            )}
          </SupportCardAccordion>
        );
      })}
    </div>
  );
};

export default SupportCards;
