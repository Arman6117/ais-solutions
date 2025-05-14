"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { DummyBatches, DummyInstructors, DummyStudent } from "@/lib/types";
import { cn, getStatusColor } from "@/lib/utils";

import {
  PencilIcon,
  RefreshCcw,
  Save,
  X,
  Users,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BatchInfoWrapper from "@/components/batch-components/btach-info-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BatchStudentTable from "./batch-student-table";

import InstructorsCards from "../../../../../../components/instructors-cards";
import ModulesCard from "../../../../../../components/modules-card";
import StatusCard from "../../../../../../components/status-card";
import EditBatchInfo from "@/components/batch-components/edit-batch-info";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { PiChalkboardTeacher } from "react-icons/pi";
import BatchMeetings from "./batch-meetings";
import BatchStatusSelector from "./batch-status-selector";
import BatchNotesTable from "./batch-notes-table";

type BatchDetailsProps = {
  batch: DummyBatches | undefined;
  dummyModules: string[];
  dummyInstructors: DummyInstructors[];
  dummyStudents: DummyStudent[] | undefined;
  courseId: string;
};

const BatchDetails = ({
  batch,
  dummyInstructors,
  dummyModules,
  dummyStudents,
  courseId,
}: BatchDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMode = searchParams.get("mode") === "edit" ? "edit" : "view" ;
  const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  if (!batch) {
    return (
      <div className="p-8 flex w-full items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Batch Selected</h2>
          <p className="text-muted-foreground">
            Please select a batch to view or edit
          </p>
          <Button className="mt-4 bg-primary-bg" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  const [name, setName] = useState(batch.name || "");
  const [status, setStatus] = useState<
    "Ongoing" | "Upcoming" | "Completed" | string
  >(batch.status || "");

  const [students, setStudents] = useState(dummyStudents || []);
  const [startDate, setStartDate] = useState(batch.startDate || "");
  const [endDate, setEndDate] = useState(batch.endDate || "");

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: string) => format(date, "PP");
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    //TODO:Handle saving logic and API call here
    setIsLoading(true);
    toast.success("Changes saved successfully!");
    setIsLoading(false);
    setMode("view");
  };


  const statusColor = getStatusColor(status);

  return (
    <div className="w-full p mb-4 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
        <div className="w-full lg:w-2/3 flex-grow">
          <Card className="border-0 shadow-md p-0 overflow-hidden">
            <CardHeader
              className={cn(
                "px-8 py-6",
                mode === "view"
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                  : "bg-gray-50 border-b"
              )}
            >
              <div className="flex md:flex-row flex-col items-center justify-between">
                <div>
                  <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                    {mode === "edit" ? "Edit Batch" : "View Batch Details"}
                  </CardTitle>
                  <p
                    className={cn(
                      "mt-1",
                      mode === "view"
                        ? "text-indigo-100"
                        : "text-muted-foreground"
                    )}
                  >
                    {mode === "edit"
                      ? "Make changes to batch information below"
                      : "View the complete batch information"}
                  </p>
                </div>
                {mode === "edit" ? (
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-700 gap-2 cursor-pointer"
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <RefreshCcw size={16} className="animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 cursor-pointer bg-white"
                      onClick={() => router.back()}
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 cursor-pointer mt-4 md:mt-0"
                    onClick={() => setMode("edit")}
                  >
                    <PencilIcon size={16} className="mr-2" /> Edit
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              <div className="flex flex-col gap-14">
                {mode === "view" ? (
                  <>
                    <BatchInfoWrapper
                      className="max-w-full"
                      label="Name"
                      icon={<Users className="text-indigo-600" size={20} />}
                    >
                      {name}
                    </BatchInfoWrapper>
                  </>
                ) : (
                  <EditBatchInfo
                    label="Name"
                    icon={<Users className="text-indigo-600" size={20} />}
                  >
                    <Input
                      placeholder="Enter batch name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="focus-visible:ring-0"
                    />
                  </EditBatchInfo>
                )}
                {/* <div className="grid md:grid-cols-2 gap-7"> */}
                {mode === "view" ? (
                  <div className="grid md:grid-cols-2 gap-7">
                    <BatchInfoWrapper
                      label="Start Date"
                      icon={<Calendar className="text-indigo-600" size={20} />}
                    >
                      {formatDate(startDate)}
                    </BatchInfoWrapper>

                    <BatchInfoWrapper
                      label="End Date"
                      icon={<Calendar className="text-indigo-600" size={20} />}
                    >
                      {formatDate(endDate)}
                    </BatchInfoWrapper>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-7">
                    <EditBatchInfo
                      label="Start Date"
                      icon={<Calendar className="text-indigo-600" size={20} />}
                    >
                      <Input
                        placeholder="Enter batch starting date"
                        onChange={(e) => setStartDate(e.target.value)}
                        value={format(startDate, "yyyy-MM-dd")}
                        type="date"
                        className="focus-visible:ring-0"
                      />
                    </EditBatchInfo>
                    <EditBatchInfo
                      label="End Date"
                      icon={<Calendar className="text-indigo-600" size={20} />}
                    >
                      <Input
                        placeholder="Enter batch ending date"
                        onChange={(e) => setEndDate(e.target.value)}
                        value={format(endDate, "yyyy-MM-dd")}
                        type="date"
                        className="focus-visible:ring-0"
                      />
                    </EditBatchInfo>
                  </div>
                )}
                {/* </div> */}
                {mode === "view" ? (
                  <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-bold text-neutral-800 mb-2 flex items-center">
                      <div className="w-1 h-6 bg-indigo-600 rounded-full mr-2"></div>
                      <CheckCircle className="text-indigo-600 mr-2" size={20} />
                      Status
                    </h1>
                    <Badge
                      className={cn(
                        "flex gap-2 items-center text-lg w-fit px-4 py-2",
                        statusColor.bg,
                        statusColor.text,
                        statusColor.border
                      )}
                    >
                      <div
                        className={cn("size-3 rounded-full", statusColor.dot)}
                      ></div>
                      {status}
                    </Badge>
                  </div>
                ) : (
                  <BatchStatusSelector setStatus={setStatus} status={status} />
                )}
                <Separator />
                <div className="flex flex-col gap-6">
                  <h1 className="text-xl font-bold text-neutral-800 mb-2 flex items-center">
                    <div className="w-1 h-6 bg-indigo-600 rounded-full mr-2"></div>
                    <PiChalkboardTeacher
                      className="text-indigo-600 mr-2"
                      size={20}
                    />
                    Instructors
                  </h1>
                  <InstructorsCards
                    label={` are assigned to this batch`}
                    instructors={dummyInstructors}
                    mode={mode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3 space-y-6 ">
          <ModulesCard name="Batch" mode={mode} modules={dummyModules} />
          <BatchMeetings
            mode={mode}
            courseId={courseId}
            batch={batch.name}
            modules={dummyModules}
          />
          <StatusCard name="Batch" />
        </div>
      </div>
      <div className="w-full">
        <BatchNotesTable mode={mode} batchId={batch.id as string} />
        <BatchStudentTable
          mode={mode}
          dummyStudents={dummyStudents!}
          courseId={courseId}
          batchId={batch.id as string}
        />
      </div>
    </div>
  );
};

export default BatchDetails;
