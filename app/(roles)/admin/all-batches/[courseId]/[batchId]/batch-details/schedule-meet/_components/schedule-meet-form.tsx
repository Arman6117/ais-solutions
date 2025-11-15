"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { createSession } from "@/actions/admin/sessions/create-session";
import {
  BatchesIdsNames,
  getBatchesIds,
} from "@/actions/shared/get-batches-ids";
import MeetingDetailsSection from "./meetings-details-section";
import BatchSelectionSection from "./batch-selection-section";
import ModuleSelectionSection from "./module-selection-section";
import SubtopicsSelectionSection from "./subtopic-selection-section";
import InstructorSelectionSection from "./instructor-selection-section";
import ScheduleSection from "./schedule-section";
import { instructors } from "./data/mockdata";
import { validateForm } from "./validation";
import { ModulesForSession } from "@/lib/types/sessions.type";
import { getModulesWithSubtopics } from "@/actions/shared/get-modules-with-subtopics";

export interface FormData {
  meetingName: string;
  meetingLink: string;
  selectedBatchId: string;
  selectedModuleId: string;
  selectedSubtopics: string[];
  instructor: string;
  date: Date | undefined;
  dates: Date[]; // Add this for multiple dates
  time: string;
  isMultipleMode: boolean; // Add this flag
}

export interface FormErrors {
  [key: string]: string;
}

export default function ScheduleMeetingForm() {
  const params = useParams();

  // Form states
  const [formData, setFormData] = useState<FormData>({
    meetingName: "",
    meetingLink: "",
    selectedBatchId: "",
    selectedModuleId: "",
    selectedSubtopics: [],
    instructor: "",
    date: new Date(),
    dates: [], // Initialize empty array
    time: "",
    isMultipleMode: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [batches, setBatches] = useState<BatchesIdsNames[]>([]);
  const [modules, setModules] = useState<ModulesForSession[]>([]);
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const courseId = params.courseId as string;

        if (!courseId) return;
        const res = await getBatchesIds(courseId);
        if (res.success) {
          toast.success(res.message);
          setBatches(res.data);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchBatches();
  }, [params.courseId]);
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModulesWithSubtopics(formData.selectedBatchId);
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        if (res.success) {
          toast.success(res.message);
          setModules(res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchModules();
  }, [formData.selectedBatchId]);
  useEffect(() => {
    const batchIdFromUrl = params.batchId as string;
    if (batchIdFromUrl && batches.find((b) => b._id === batchIdFromUrl)) {
      setFormData((prev) => ({ ...prev, selectedBatchId: batchIdFromUrl }));
    } else if (batches.length > 0) {
      setFormData((prev) => ({ ...prev, selectedBatchId: batches[0]._id }));
    }
  }, [params, batches]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const selectedModule = modules.find(
    (m) => m._id === formData.selectedModuleId
  );

  const selectedBatch = batches.find((b) => b._id === formData.selectedBatchId);

  const handleSubmit = async () => {
    const validation = validateForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) return;

    setIsLoading(true);

    try {
      const datesToSchedule = formData.isMultipleMode
        ? formData.dates
        : [formData.date as Date];

      // Create sessions for all selected dates
      const promises = datesToSchedule.map((scheduleDate) => {
        const payload = {
          meetingName: formData.meetingName.trim(),
          meetingLink: formData.meetingLink.trim(),
          batchId: formData.selectedBatchId,
          batchName: selectedBatch?.name,
          module: selectedModule?.name || "",
          moduleId: formData.selectedModuleId,
          chapters: formData.selectedSubtopics,
          instructor: formData.instructor,
          date: format(scheduleDate, "yyyy-MM-dd"),
          time: formData.time,
        };

        return createSession(payload);
      });

      const results = await Promise.all(promises);

      const successCount = results.filter((r) => r.success).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        toast.success(
          `${successCount} meeting${successCount > 1 ? "s" : ""} scheduled successfully!`
        );

        // Reset form
        setFormData({
          meetingName: "",
          meetingLink: "",
          selectedBatchId: batches.length > 0 ? batches[0]._id : "",
          selectedModuleId: "",
          selectedSubtopics: [],
          instructor: "",
          date: new Date(),
          dates: [],
          time: "",
          isMultipleMode: false,
        });
      }

      if (failCount > 0) {
        toast.error(
          `Failed to schedule ${failCount} meeting${failCount > 1 ? "s" : ""}`
        );
      }
    } catch (error) {
      console.error("Error scheduling meetings:", error);
      toast.error("Failed to schedule meetings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-black rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-center">
            Schedule a Meeting
          </CardTitle>
          <p className="text-purple-900 text-center mt-2">
            Create and schedule a new meeting session for your batch
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          <MeetingDetailsSection
            meetingName={formData.meetingName}
            meetingLink={formData.meetingLink}
            errors={errors}
            onUpdate={updateFormData}
          />

          <BatchSelectionSection
            selectedBatchId={formData.selectedBatchId}
            batches={batches}
            selectedBatch={selectedBatch}
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
            dates={formData.dates}
            time={formData.time}
            errors={errors}
            onUpdate={updateFormData}
            multipleMode={formData.isMultipleMode}
            onMultipleModeToggle={(enabled) =>
              updateFormData({ isMultipleMode: enabled })
            }
          />
        </CardContent>

        <CardFooter className="bg-gray-50 p-8 rounded-b-lg">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-gray-600">* Required fields</p>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-2 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                "Schedule Meeting"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
