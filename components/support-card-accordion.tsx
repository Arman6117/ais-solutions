"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddSupportMemberDialog from "./add-support-member-dialog";
import { Users } from "lucide-react";
import { addSupportMember } from "@/actions/admin/support/support-card-member";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Type for the data received from the Add Member dialog
type NewMemberData = {
  name: string;
  designation: string;
  email: string;
  contact: string;
  availableTime: string;
  assignedBatches?: (string | number)[]; // Allow mixed ID types from dialog state
};

type SupportCardAccordionProps = {
  departmentId: string;
  departmentName: string;
  description?: string;
  icon: React.ReactNode;
  colorTheme?: string; // Expecting classes like "bg-gradient-to-r from-blue-600 to-blue-800"
  children?: React.ReactNode;
  memberCount?: number; // Optional: to show count in header
};

const SupportCardAccordion = ({
  departmentId,
  departmentName,
  description = "Support Team",
  icon,
  colorTheme = "bg-slate-800", // Default fallback
  children,
  memberCount,
}: SupportCardAccordionProps) => {
  const router = useRouter();

  // Explicitly typed handler
  const handleAddMember = async (memberData: NewMemberData) => {
    try {
      // Ensure we have clean strings for batch IDs
      const cleanAssignedBatches = (memberData.assignedBatches || []).map(
        (id) => (typeof id === "string" ? id : id.toString())
      );

      const payload = {
        departmentId: departmentId,
        name: memberData.name,
        designation: memberData.designation,
        email: memberData.email,
        contact: memberData.contact,
        availableTime: memberData.availableTime,
        assignedBatches: cleanAssignedBatches,
      };

      const result = await addSupportMember(payload);

      if (result.success) {
        toast.success(result.message);
        router.refresh(); // Refresh server data
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Something went wrong adding the member");
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white"
    >
      <AccordionItem value={departmentId} className="border-none">
        <AccordionTrigger
          className={`px-6 py-5 hover:no-underline relative transition-all group
            ${colorTheme} text-white data-[state=open]:rounded-t-lg data-[state=closed]:rounded-lg`}
        >
          <div className="flex items-center justify-between w-full pr-4 z-10 relative">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-inner border border-white/10">
                {icon}
              </div>
              <div className="flex flex-col items-start text-left">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-none">
                  {departmentName}
                </h3>
                <p className="text-sm text-blue-100/90 font-medium mt-1">
                  {description}
                </p>
              </div>
            </div>

            {typeof memberCount === "number" && (
              <div className="hidden sm:flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/10">
                <Users className="w-3.5 h-3.5" />
                <span>{memberCount} Members</span>
              </div>
            )}
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl pointer-events-none"></div>
        </AccordionTrigger>

        <AccordionContent className="bg-slate-50/50 p-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Team Members
              <span className="text-sm font-normal text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200 shadow-sm">
                {React.Children.count(children) || 0}
              </span>
            </h4>
            <AddSupportMemberDialog
              triggerLabel="Add Member"
              // We need to cast or ensure Dialog expects NewMemberData
              // Since Dialog is generic or flexible, this passes type check if fields align
              onSubmit={handleAddMember} 
            />
          </div>

          {children ? (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              {children}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-slate-400">
              <Users className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-sm font-medium">No members in this department yet</p>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SupportCardAccordion;
