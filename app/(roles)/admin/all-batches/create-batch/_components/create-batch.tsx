"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import InstructorsCards from "@/components/instructors-cards";
import AddInstructorButton from "../../../courses/_components/add-instructor-button";
import { getCourses } from "@/actions/admin/course/get-courses";
import AddModuleButton from "@/components/add-module-button";
import { Modules } from "@/lib/types";
import SelectedModulesAccordion from "../../../courses/create-course/_components/selected-modules-accoridian";

import CourseSelector from "./course-selector";


type CreateBatchProps = {
  courses: {
    id: string;
    name: string;
  }[];
};
export default function CreateBatch({ courses }: CreateBatchProps) {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [modules, setModules] = useState<Modules[]>([]);
  const [availableModules, setAvailableModules] = useState<Modules[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  // const [courseList, setCourseList] = useState<{ id: string; name: string }[]>(
  //   []
  // );

  const [batchData, setBatchData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "upcoming",
    courseId: "",
  });
  // const fetchCourses = async () => {
  //   const res = await getCourses();
  //   console.log(res);
  //   setCourseList(res);
  // };
  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  useEffect(() => {
    const fetchModules = async () => {
      const res = await fetch(`/api/modules?courseId=${courseId}`);
      const result = await res.json();
      console.log(result)
      if (result.success) {
        setAvailableModules(result.data!);
      } else {
        setAvailableModules([]);
      }
    };
    fetchModules();
  }, [courseId]);
  const handleInputChange = (field: string, value: string) => {
    setBatchData((prev) => ({ ...prev, [field]: value }));
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
              {/* Course Selector */}
              <CourseSelector
                courseList={courses}
                handleInputChange={handleInputChange}
                setCourseId={setCourseId}
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

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center">
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    {batchData.status}
                  </Badge>
                </div>
              </div>

              {/* Instructors */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructors</CardTitle>
                  <CardDescription>
                    Add instructors to this batch
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-40">
                  {instructors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md py-8">
                      <div className="text-center text-gray-500">
                        <p>No instructors added yet</p>
                      </div>
                    </div>
                  ) : (
                    <InstructorsCards
                      key={instructors.length}
                      instructors={instructors}
                      label="Batch"
                      mode="create"
                    />
                  )}
                </CardContent>
                <CardFooter>
                  <AddInstructorButton
                    setInstructor={(newInstructor) => {
                      if (typeof newInstructor === "function") {
                        setInstructors(newInstructor);
                      } else {
                        setInstructors((prev) => [...prev, newInstructor]);
                      }
                    }}
                  />
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* Modules Sidebar */}
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

          <Button className="w-full bg-primary-bg" size="lg">
            Create Batch
          </Button>
        </div>
      </div>
    </div>
  );
}
