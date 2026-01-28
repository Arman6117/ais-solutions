"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { AlertTriangle, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

import { BatchMeetings, ModulesForSession } from "@/lib/types/sessions.type";
import { updateSession } from "@/actions/admin/sessions/update-session";
import { getModulesWithSubtopics } from "@/actions/shared/get-modules-with-subtopics";

// Imported Components
import MeetingDetailsSection from "../schedule-meet/_components/meetings-details-section";
import ModuleSelectionSection from "../schedule-meet/_components/module-selection-section";
import SubtopicsSelectionSection from "../schedule-meet/_components/subtopic-selection-section";
import InstructorSelectionSection from "../schedule-meet/_components/instructor-selection-section";
import ScheduleSection from "../schedule-meet/_components/schedule-section";
import { instructors } from "../schedule-meet/_components/data/mockdata";

// --- Types ---
type MeetingEditDialogProps = {
  meetingData: BatchMeetings;
  onSave: () => void;
  batchId: string;
};

interface MeetingFormValues {
  meetingName: string;
  meetingLink: string;
  selectedModuleId: string;
  selectedSubtopics: string[];
  instructor: string;
  date: Date | undefined;
  time: string;
  // Custom fields kept in state to avoid complex syncing
  customModuleName: string;
  customChaptersText: string;
}

// --- Custom Hook for Logic ---
function useMeetingEditForm(
  meetingData: BatchMeetings, 
  batchId: string, 
  open: boolean, 
  onSave: () => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<ModulesForSession[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<MeetingFormValues>({
    meetingName: "",
    meetingLink: "",
    selectedModuleId: "",
    selectedSubtopics: [],
    instructor: "",
    date: undefined,
    time: "",
    customModuleName: "",
    customChaptersText: "",
  });

  // 1. Fetch Modules
  useEffect(() => {
    if (!batchId || !open) return;
    getModulesWithSubtopics(batchId)
      .then((res) => res.success && setModules(res.data))
      .catch((err) => console.error("Error fetching modules:", err));
  }, [batchId, open]);

  // 2. Initialize Form when Dialog Opens
  useEffect(() => {
    if (!open || modules.length === 0) return;

    // Logic to determine if the saved module is "Custom" or "Existing"
    const savedModuleName = String(meetingData.module || "").trim();
    const exactModuleMatch = modules.find(
      (m) => m.name?.trim().toLowerCase() === savedModuleName.toLowerCase()
    );

    let initialModuleId = "other";
    let initialCustomName = "";
    
    if (exactModuleMatch) {
      initialModuleId = exactModuleMatch._id;
      // Edge case: If the module is actually named "Other" in the DB
      if (exactModuleMatch.name.toLowerCase() === "other") {
         initialCustomName = "Other";
      }
    } else if (savedModuleName) {
      // It's a custom name not found in the list
      initialModuleId = "other";
      initialCustomName = savedModuleName;
    }

    setForm({
      meetingName: meetingData.meetingName || "",
      meetingLink: meetingData.meetingLink || "",
      selectedModuleId: initialModuleId,
      selectedSubtopics: meetingData.chapters || [],
      instructor: meetingData.instructor || "",
      date: meetingData.date ? new Date(meetingData.date) : undefined,
      time: meetingData.time || "",
      customModuleName: initialCustomName,
      customChaptersText: (meetingData.chapters || []).join("\n"),
    });
    setErrors({});
  }, [open, meetingData, modules]);

  // 3. Derived Values
  const selectedModule = useMemo(
    () => modules.find((m) => m._id === form.selectedModuleId),
    [modules, form.selectedModuleId]
  );

  const isCustomModule = 
    form.selectedModuleId === "other" || 
    selectedModule?.name.trim().toLowerCase() === "other";

  const showRescheduleWarning = useMemo(() => {
    if (!open) return false;
    const originalDate = meetingData.date ? format(new Date(meetingData.date), "yyyy-MM-dd") : "";
    const newDate = form.date ? format(form.date, "yyyy-MM-dd") : "";
    const isDateChanged = originalDate !== newDate;
    const isTimeChanged = (meetingData.time || "") !== (form.time || "");
    return isDateChanged || isTimeChanged;
  }, [form.date, form.time, meetingData.date, meetingData.time, open]);

  // 4. Handlers
  const updateForm = useCallback((updates: Partial<MeetingFormValues>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleModuleChange = (moduleId: string) => {
    const mod = modules.find((m) => m._id === moduleId);
    const isNowCustom = moduleId === "other" || mod?.name.toLowerCase() === "other";
    
    setForm((prev) => ({
      ...prev,
      selectedModuleId: moduleId,
      selectedSubtopics: [], // Clear standard subtopics
      // Clear custom fields if switching TO a standard module
      customModuleName: isNowCustom ? prev.customModuleName : "",
      customChaptersText: isNowCustom ? prev.customChaptersText : "",
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.meetingName.trim()) newErrors.meetingName = "Meeting name is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";

    if (isCustomModule) {
      if (!form.customModuleName.trim()) newErrors.customName = "Module name is required";
      if (!form.customChaptersText.trim()) newErrors.chapters = "Please add at least one topic";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setIsLoading(true);

    try {
      // Prepare payload
      const moduleNameToSend = isCustomModule 
        ? form.customModuleName.trim() 
        : selectedModule?.name;
      
      const chaptersToSend = isCustomModule 
        ? form.customChaptersText.split("\n").map(s => s.trim()).filter(Boolean)
        : form.selectedSubtopics;

      const payload = {
        meetingName: form.meetingName.trim(),
        meetingLink: form.meetingLink.trim() || undefined,
        module: moduleNameToSend,
        chapters: chaptersToSend,
        instructor: form.instructor.trim() || undefined,
        date: format(form.date as Date, "yyyy-MM-dd"),
        time: form.time,
      };

      const res = await updateSession(meetingData._id, payload);
      
      if (res.success) {
        toast.success(res.message);
        onSave(); // Close dialog via parent callback
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error updating meeting:", error);
      toast.error("Failed to update meeting.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    modules,
    errors,
    isLoading,
    isCustomModule,
    selectedModule,
    showRescheduleWarning,
    updateForm,
    handleModuleChange,
    submit
  };
}

// --- Main Component ---
const MeetingEditDialog = ({ meetingData, batchId, onSave }: MeetingEditDialogProps) => {
  const [open, setOpen] = useState(false);

  // Use the custom hook
  const {
    form,
    modules,
    errors,
    isLoading,
    isCustomModule,
    selectedModule,
    showRescheduleWarning,
    updateForm,
    handleModuleChange,
    submit
  } = useMeetingEditForm(
    meetingData, 
    batchId, 
    open, 
    () => {
      setOpen(false);
      onSave();
    }
  );

  console.log(form);
  console.log(meetingData)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full bg-primary-bg opacity-0 group-hover:opacity-100 transition-opacity">
          <Edit className="size-4 text-white" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" key={meetingData._id}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Meeting</DialogTitle>
          <DialogDescription>Update meeting details.</DialogDescription>
        </DialogHeader>

        {showRescheduleWarning && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertTriangle className="size-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">Meeting will be marked as rescheduled</p>
              <p className="text-sm text-yellow-700 mt-1">
                Original: {meetingData.date ? format(new Date(meetingData.date), "MMM dd, yyyy") : "—"} at {meetingData.time || "—"}
              </p>
            </div>
          </div>
        )}

        <Card className="border-0 shadow-none">
          <CardContent className="space-y-6 pt-6">
            <MeetingDetailsSection
              meetingName={form.meetingName}
              meetingLink={form.meetingLink}
              errors={errors}
              onUpdate={updateForm}
            />

            <ModuleSelectionSection
              selectedModuleId={form.selectedModuleId}
              modules={modules}
              errors={errors}
              // Custom fields
              customModuleName={form.customModuleName}
              customChaptersText={form.customChaptersText}
              // Allow topic input editing if it's a custom module
              enableTopicInput={true} 
              // Handlers
              onModuleChange={handleModuleChange}
              onCustomNameChange={(val) => updateForm({ customModuleName: val })}
              onCustomTopicsChange={(val) => updateForm({ customChaptersText: val })}
            />

            {/* Standard Subtopics (Only show if NOT custom and a module is selected) */}
            {!isCustomModule && selectedModule && (
              <SubtopicsSelectionSection
                selectedModule={selectedModule}
                selectedSubtopics={form.selectedSubtopics}
                errors={errors}
                onUpdate={updateForm}
              />
            )}

            <InstructorSelectionSection
              instructor={form.instructor}
              instructors={instructors}
              errors={errors}
              onUpdate={updateForm}
            />

            <ScheduleSection
              date={form.date}
              time={form.time}
              errors={errors}
              onUpdate={updateForm}
              multipleMode={false} // Disable multiple mode for editing single meeting
            />
          </CardContent>
        </Card>

        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={submit}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingEditDialog;