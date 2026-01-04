"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { BatchMeetings, ModulesForSession } from "@/lib/types/sessions.type";
import { updateSession } from "@/actions/admin/sessions/update-session";
import { getModulesWithSubtopics } from "@/actions/shared/get-modules-with-subtopics";

import MeetingDetailsSection from "../schedule-meet/_components/meetings-details-section";
import ModuleSelectionSection from "../schedule-meet/_components/module-selection-section";
import SubtopicsSelectionSection from "../schedule-meet/_components/subtopic-selection-section";
import InstructorSelectionSection from "../schedule-meet/_components/instructor-selection-section";
import ScheduleSection from "../schedule-meet/_components/schedule-section";
import { instructors } from "../schedule-meet/_components/data/mockdata";

type MeetingEditDialogProps = {
  meetingData: BatchMeetings;
  onSave: () => void;
  batchId: string;
};

interface EditFormData {
  meetingName: string;
  meetingLink: string;
  selectedModuleId: string; // moduleId OR "__custom__"
  selectedSubtopics: string[];
  instructor: string;
  date: Date | undefined;
  time: string;
}

const CUSTOM_MODULE_ID = "__custom__";

const isCustomModuleName = (name?: string) => {
  if (!name) return false;
  const n = name.trim().toLowerCase();
  return n === "other" || n === "custom" || n === "other / custom";
};

const MeetingEditDialog = ({ meetingData, batchId, onSave }: MeetingEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [modules, setModules] = useState<ModulesForSession[]>([]);
  const [showRescheduleWarning, setShowRescheduleWarning] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // For custom module editing
  const [customChaptersText, setCustomChaptersText] = useState("");

  const [formData, setFormData] = useState<EditFormData>({
    meetingName: "",
    meetingLink: "",
    selectedModuleId: "",
    selectedSubtopics: [],
    instructor: "",
    date: undefined,
    time: "",
  });

  // Define custom module option
  const customModuleOption: ModulesForSession = useMemo(
    () => ({
      _id: CUSTOM_MODULE_ID,
      name: "Other / Custom",
      chapters: [], // conforming to your type
    }),
    []
  );

  const modulesWithCustom = useMemo<ModulesForSession[]>(
    () => [...modules, customModuleOption],
    [modules, customModuleOption]
  );

  const isCustomSelected = formData.selectedModuleId === CUSTOM_MODULE_ID;

  const updateFormData = (updates: Partial<EditFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // --- 1. Load Modules on Mount (or when batchId changes) ---
  useEffect(() => {
    if (!batchId) return;
    const fetchModules = async () => {
      try {
        const res = await getModulesWithSubtopics(batchId);
        if (res.success) {
          setModules(res.data);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModules();
  }, [batchId]);


  // --- 2. Sync Form Data when Dialog Opens (KEY FIX) ---
  useEffect(() => {
    if (!open) return;

    // Reset UI states
    setErrors({});
    setShowRescheduleWarning(false);
    setCustomChaptersText((meetingData.chapters || []).join("\n"));

    // Determine initial module ID *synchronously* if possible (or wait for modules)
    let initialModuleId = "";
    
    if (isCustomModuleName(meetingData.module)) {
      initialModuleId = CUSTOM_MODULE_ID;
    } else if (modules.length > 0) {
        // Try to find the module ID from the loaded modules list
        const matched = modules.find(
            (m) => m.name?.trim().toLowerCase() === String(meetingData.module || "").trim().toLowerCase()
        );
        if (matched?._id) initialModuleId = matched._id;
    }

    // Initialize form
    setFormData({
      meetingName: meetingData.meetingName || "",
      meetingLink: meetingData.meetingLink || "",
      selectedModuleId: initialModuleId, 
      selectedSubtopics: meetingData.chapters || [],
      instructor: meetingData.instructor || "",
      date: meetingData.date ? new Date(meetingData.date) : undefined,
      time: meetingData.time || "",
    });

  }, [open, meetingData, modules]); 
  // Added 'modules' to dependencies so if they load slightly later, the form updates.


  // --- 3. Compute Selected Module Object ---
  const selectedModule = useMemo(() => {
    if (isCustomSelected) return undefined;
    return modules.find((m) => m._id === formData.selectedModuleId);
  }, [modules, formData.selectedModuleId, isCustomSelected]);

  // --- 4. Sync Custom Textarea to Form State ---
  useEffect(() => {
    if (!isCustomSelected) return;
    const chapters = customChaptersText.split("\n").map((s) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, selectedSubtopics: chapters }));
  }, [customChaptersText, isCustomSelected]);

  // --- 5. Reschedule Warning Logic ---
  useEffect(() => {
    if (!open) return;
    const originalDate = meetingData.date ? format(new Date(meetingData.date), "yyyy-MM-dd") : "";
    const newDate = formData.date ? format(formData.date, "yyyy-MM-dd") : "";
    const isDateChanged = originalDate !== newDate;
    const isTimeChanged = (meetingData.time || "") !== (formData.time || "");
    setShowRescheduleWarning(isDateChanged || isTimeChanged);
  }, [formData.date, formData.time, meetingData.date, meetingData.time, open]);


  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.meetingName.trim()) newErrors.meetingName = "Meeting name is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (isCustomSelected && formData.selectedSubtopics.length === 0) {
      newErrors.chapters = "Please add at least one topic (one per line)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const payload = {
        meetingName: formData.meetingName.trim(),
        meetingLink: formData.meetingLink.trim() || undefined,
        module: isCustomSelected ? "Other" : selectedModule?.name,
        chapters: formData.selectedSubtopics,
        instructor: formData.instructor.trim() || undefined,
        date: format(formData.date as Date, "yyyy-MM-dd"),
        time: formData.time,
      };

      const res = await updateSession(meetingData._id, payload);
      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        onSave();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-primary-bg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit className="size-4 text-white" />
        </Button>
      </DialogTrigger>

      {/* Adding key={meetingData._id} forces a fresh mount when opening different meetings */}
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto" 
        key={meetingData._id} 
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Meeting</DialogTitle>
          <DialogDescription>
            Update meeting details. Students will be notified of any changes.
          </DialogDescription>
        </DialogHeader>

        {showRescheduleWarning && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
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
              meetingName={formData.meetingName}
              meetingLink={formData.meetingLink || ""}
              errors={errors}
              onUpdate={updateFormData}
            />

            <ModuleSelectionSection
              selectedModuleId={formData.selectedModuleId}
              modules={modulesWithCustom}
              errors={errors}
              onUpdate={(moduleId: string) => {
                updateFormData({ selectedModuleId: moduleId, selectedSubtopics: [] });
                if (moduleId === CUSTOM_MODULE_ID) setCustomChaptersText("");
              }}
            />

            {isCustomSelected ? (
              <div className="space-y-2">
                <Label>Topics (one per line)</Label>
                <Textarea
                  value={customChaptersText}
                  onChange={(e) => setCustomChaptersText(e.target.value)}
                  placeholder={`Eg:\nIntroduction\nSetup\nFirst Program`}
                  className="min-h-[100px]"
                />
                {errors.chapters && <p className="text-sm text-red-600">{errors.chapters}</p>}
              </div>
            ) : (
              selectedModule && (
                <SubtopicsSelectionSection
                  selectedModule={selectedModule}
                  selectedSubtopics={formData.selectedSubtopics}
                  errors={errors}
                  onUpdate={updateFormData}
                />
              )
            )}

            <InstructorSelectionSection
              instructor={formData.instructor || ""}
              instructors={instructors}
              errors={errors}
              onUpdate={updateFormData}
            />

            <ScheduleSection
              date={formData.date}
              time={formData.time || ""}
              errors={errors}
              onUpdate={updateFormData}
            />
          </CardContent>
        </Card>

        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
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
