"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AddModuleButton from "@/components/add-module-button";
import { BatchType, Mode, Modules } from "@/lib/types/types";
import SelectedModulesAccordion from "../../../courses/create-course/_components/selected-modules-accoridian";
import CourseSelector from "./course-selector";
import { createBatch } from "@/actions/admin/batches/create-batch";
import TypeSelector from "./type-selector";
import ModeSelector from "./mode-selector";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCourseModulesByCourse } from "@/actions/admin/batches/get-modules-by-course";

type CourseProp = {
  _id: string;
  courseName: string;
};

type CreateBatchProps = {
  courses: {
    courses: CourseProp[];
  }[];
};

export default function CreateBatch({ courses }: CreateBatchProps) {
  const [modules, setModules] = useState<Modules[]>([]);
  const [availableModules, setAvailableModules] = useState<Modules[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const [batchData, setBatchData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Upcoming",
    courseId: "",
    mode: "offline",
    type: "weekdays",
    groupLink: "",
  });

  // This formats the nested 'courses' prop into a flat array for the dropdown
  const formattedCourses = useMemo(() => {
    if (!courses) return [];
    return courses.flatMap((item) => item.courses);
  }, [courses]);

  useEffect(() => {
    const fetchModules = async () => {
      if (!courseId) return;
      try {
        const res = await getCourseModulesByCourse(courseId);
        if (res.success) {
          setAvailableModules(res.data);
        } else {
          setAvailableModules([]);
        }
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };
    fetchModules();
  }, [courseId]);

  const handleInputChange = (field: string, value: string) => {
    setBatchData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateBatch = async () => {
    setIsCreating(true);
    try {
      const res = await createBatch({
        name: batchData.name,
        description: batchData.description,
        courseId: batchData.courseId,
        startDate: batchData.startDate,
        endDate: batchData.endDate,
        groupLink: batchData.groupLink,
        mode: batchData.mode as Mode,
        type: batchData.type as BatchType,
        status: batchData.status as "Upcoming" | "Ongoing" | "Completed",
        modules,
      });

      if (res.success) {
        toast.success(res.message);
        router.push("/admin/all-batches");
      } else {
        toast.error(res.message);
      }
      if (res.errors) {
        toast.custom(() => (
          <div className="bg-destructive text-white font-semibold p-2">
            {Object.values(res.errors).join(", ")}
          </div>
        ));
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Batch creation failed:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Create Batch</h1>
        <p className="text-gray-500">
          Create a new batch with all necessary details
        </p>
      </div>

      <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Batch Details</CardTitle>
              <CardDescription>
                Fill in the basic information about the batch
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <CourseSelector
                courseList={formattedCourses}
                handleInputChange={handleInputChange}
                setCourseId={(id) => {
                  setCourseId(id);
                  handleInputChange("courseId", id);
                }}
                setCourseList={() => {}}
              />

              <div className="space-y-2">
                <Label htmlFor="name">Batch Name</Label>
                <Input
                  id="name"
                  placeholder="Enter batch name"
                  value={batchData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter batch description"
                  className="min-h-32"
                  value={batchData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupLink">Group Link</Label>
                <Input
                  id="groupLink"
                  placeholder="Enter group link"
                  value={batchData.groupLink}
                  onChange={(e) =>
                    handleInputChange("groupLink", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <div className="relative">
                    <Input
                      id="start-date"
                      type="date"
                      value={batchData.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <div className="relative">
                    <Input
                      id="end-date"
                      type="date"
                      value={batchData.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <TypeSelector handleInputChange={handleInputChange} />
              <ModeSelector handleInputChange={handleInputChange} />

              <div className="space-y-2">
                <Label>Status</Label>
                <Badge className="bg-amber-500 hover:bg-amber-600 capitalize">
                  {batchData.status}
                </Badge>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Instructors</CardTitle>
                  <CardDescription>
                    Add instructors to this batch (feature coming soon)
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-40">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md py-8">
                    <div className="text-center text-gray-500">
                      <p>No instructors added yet</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Modules</CardTitle>
              <CardDescription>Add modules to this batch</CardDescription>
            </CardHeader>
            <CardContent className="min-h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md">
              {modules.length === 0 ? (
                <div className="text-center text-gray-500">
                  <p>No modules added yet</p>
                </div>
              ) : (
                <SelectedModulesAccordion data={modules} />
              )}
            </CardContent>
            <CardFooter>
              <AddModuleButton
                className={
                  courseId
                    ? ""
                    : "cursor-not-allowed pointer-events-none bg-primary-bg/40"
                }
                modules={availableModules}
                setModules={setModules}
              />
            </CardFooter>
          </Card>

          <Button
            className="w-full bg-primary-bg"
            size="lg"
            onClick={handleCreateBatch}
            disabled={isCreating}
          >
            {isCreating ? "Creating Batch..." : "Create Batch"}
          </Button>
        </div>
      </div>
    </div>
  );
}