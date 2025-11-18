"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Edit, AlertTriangle } from "lucide-react";

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
import MeetingDetailsSection from "../schedule-meet/_components/meetings-details-section";
import ModuleSelectionSection from "../schedule-meet/_components/module-selection-section";
import SubtopicsSelectionSection from "../schedule-meet/_components/subtopic-selection-section";
import InstructorSelectionSection from "../schedule-meet/_components/instructor-selection-section";
import ScheduleSection from "../schedule-meet/_components/schedule-section";
import { instructors } from "../schedule-meet/_components/data/mockdata";

// import { instructors } from "./data/mockdata";

type MeetingEditDialogProps = {
  meetingData: BatchMeetings;
   onSave:() => void;
  batchId: string;
};

interface EditFormData {
  meetingName: string;
  meetingLink: string;
  selectedModuleId: string;
  selectedSubtopics: string[];
  instructor: string;
  date: Date | undefined;
  time: string;
}

const MeetingEditDialog = ({
  meetingData,
  batchId,
  onSave
}: MeetingEditDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modules, setModules] = useState<ModulesForSession[]>([]);
  const [showRescheduleWarning, setShowRescheduleWarning] = useState(false);

  const [formData, setFormData] = useState<EditFormData>({
    meetingName: meetingData.meetingName,
    meetingLink: "",
    selectedModuleId: "",
    selectedSubtopics: meetingData.chapters,
    instructor: "",
    date: new Date(meetingData.date),
    time: meetingData.time,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (open && meetingData._id) {
      // Fetch modules when dialog opens
      const fetchModules = async () => {
        try {
          const res = await getModulesWithSubtopics(batchId);
          if (res.success) {
            setModules(res.data);
          }
        } catch (error) {
          console.error("Error fetching modules:", error);
          toast.error("Failed to load modules");
        }
      };
      fetchModules();
    }
  }, [open, meetingData._id]);

  
  useEffect(() => {
    const originalDate = format(new Date(meetingData.date), "yyyy-MM-dd");
    const newDate = formData.date ? format(formData.date, "yyyy-MM-dd") : "";

    const isDateChanged = originalDate !== newDate;
    const isTimeChanged = meetingData.time !== formData.time;

    setShowRescheduleWarning(isDateChanged || isTimeChanged);
  }, [formData.date, formData.time, meetingData.date, meetingData.time]);

  const updateFormData = (updates: Partial<EditFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const selectedModule = modules.find(
    (m) => m._id === formData.selectedModuleId
  );

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.meetingName.trim()) {
      newErrors.meetingName = "Meeting name is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
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
        module: selectedModule?.name,
        chapters: formData.selectedSubtopics,
        instructor: formData.instructor || undefined,
        date: format(formData.date as Date, "yyyy-MM-dd"),
        time: formData.time,
      };

      const res = await updateSession(meetingData._id, payload);

      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        onSave()
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error updating meeting:", error);
      toast.error("Failed to update meeting. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"

          className="rounded-full bg-primary-bg  opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Edit className="size-4 text-white " />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Meeting</DialogTitle>
          <DialogDescription>
            Update meeting details. Students will be notified of any changes.
          </DialogDescription>
        </DialogHeader>

        {/* Reschedule Warning */}
        {showRescheduleWarning && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="size-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900">
                Meeting will be marked as rescheduled
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                All enrolled students will be notified about the date/time
                change. Original schedule:{" "}
                {format(new Date(meetingData.date), "MMM dd, yyyy")} at{" "}
                {meetingData.time}
              </p>
            </div>
          </div>
        )}

        
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-6 pt-6">
            <MeetingDetailsSection
              meetingName={formData.meetingName}
              meetingLink={formData.meetingLink}
              errors={errors}
              onUpdate={updateFormData}
            />

            <ModuleSelectionSection
              selectedModuleId={formData.selectedModuleId}
              modules={modules}
              errors={errors}
              onUpdate={(moduleId: string) => {
                updateFormData({
                  selectedModuleId: moduleId,
                  selectedSubtopics: [],
                });
              }}
            />

            {selectedModule && (
              <SubtopicsSelectionSection
                selectedModule={selectedModule}
                selectedSubtopics={formData.selectedSubtopics}
                errors={errors}
                onUpdate={updateFormData}
              />
            )}

            <InstructorSelectionSection
              instructor={formData.instructor}
              instructors={instructors}
              errors={errors}
              onUpdate={updateFormData}
            />

            <ScheduleSection
              date={formData.date}
              time={formData.time}
              errors={errors}
              onUpdate={updateFormData}
            />
          </CardContent>
        </Card>

        <DialogFooter className="flex gap-3 sm:gap-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingEditDialog;
