"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import InfoWrapper from "@/components/info-wrapper";
import BatchStudentTable from "./batch-student-table";

import EditInfo from "@/components/edit-info";
import BatchMeetings from "./batch-meetings";
import BatchStatusSelector from "./batch-status-selector";
import BatchNotesTable from "./batch-notes-table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { PiChalkboardTeacher } from "react-icons/pi";

import {
  Batch,
  BatchType,
  DummyInstructors,
  DummyStudent,
  Mode,
  Modules,
} from "@/lib/types/types";

import { cn, getStatusColor } from "@/lib/utils";
import {
  PencilIcon,
  RefreshCcw,
  Save,
  X,
  Users,
  Calendar,
  CheckCircle,
  University,
  Text,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { MdBookOnline } from "react-icons/md";
import BatchModeSelector from "./batch-mode-selector";
import BatchTypeSelector from "./batch-type-selector";
import ModulesCard from "@/components/modules-card";
import StatusCard from "@/components/status-card";
import { updateBatchById } from "@/actions/admin/batches/update-batch";
import { deleteBatch } from "@/actions/admin/batches/delete-batch";
type BatchDetailsProps = {
  batch: Batch;
  dummyModules: string[];
  dummyInstructors: DummyInstructors[];
  dummyStudents: DummyStudent[] | undefined;
  courseId: string;
};

const BatchDetails = ({
  batch,

  dummyStudents,
  courseId,
}: BatchDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMode = searchParams.get("mode") === "edit" ? "edit" : "view";
  const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  const [name, setName] = useState(batch.name || "");
  const [description, setDescription] = useState(batch.description || "");
  const [status, setStatus] = useState<"Ongoing" | "Upcoming" | "Completed">(
    batch.status || "Upcoming"
  );
  const [whatsappLink, setWhatsappLink] = useState(batch.groupLink || "");
  const [batchModuleIds, setBatchModuleIds] = useState<Modules[]>(
    batch.modules.map((mod) => {
      return {
        _id: mod.id,
        name: mod.name,
      };
    })
  );
  console.log(batchModuleIds);

  const [startDate, setStartDate] = useState(batch.startDate || "");
  const [endDate, setEndDate] = useState(batch.endDate || "");
  const [batchMode, setBatchMode] = useState<Mode>(batch.mode);
  const [batchType, setBatchType] = useState<BatchType>(batch.type);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  console.log(isSmallScreen);
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
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateBatchById({
        batchId: batch._id,
        description,
        endDate,
        groupLink: whatsappLink,
        mode: batchMode,
        name,
        startDate,
        status,
        type: batchType,
      });
      if (res.success) {
        toast.success(res.message);
        setMode("view");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.success("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const statusColor = getStatusColor(status);
  const handleRemoveBatch = async () => {
    try {
      await deleteBatch(batch._id);
      toast.success("Batch deleted successfully");
      router.push(`/admin/all-batches`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full p mb-4 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
        <div className="w-full  flex-grow">
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
                  <div className="">
                    <InfoWrapper
                      className="max-w-full"
                      label="Name"
                      icon={<Users className="text-indigo-600" size={20} />}
                    >
                      {name}
                    </InfoWrapper>
                    <InfoWrapper
                      className="max-w-full mt-5"
                      label="Description"
                      icon={<Text className="text-indigo-600" size={20} />}
                    >
                      {description}
                    </InfoWrapper>
                  </div>
                ) : (
                  <>
                    <EditInfo
                      label="Name"
                      icon={<Users className="text-indigo-600" size={20} />}
                    >
                      <Input
                        placeholder="Enter batch name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="focus-visible:ring-0"
                      />
                    </EditInfo>
                    <EditInfo
                      label="Description"
                      icon={<Users className="text-indigo-600" size={20} />}
                    >
                      <Input
                        placeholder="Enter batch name"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="focus-visible:ring-0"
                      />
                    </EditInfo>
                  </>
                )}
                {/* <div className="grid md:grid-cols-2 gap-7"> */}
                {mode === "view" ? (
                  <div className="grid md:grid-cols-2 gap-7">
                    <InfoWrapper
                      label="Start Date"
                      icon={<Calendar className="text-indigo-600" size={20} />}
                    >
                      {formatDate(startDate)}
                    </InfoWrapper>

                    <InfoWrapper
                      label="End Date"
                      icon={<Calendar className="text-indigo-600" size={20} />}
                    >
                      {formatDate(endDate)}
                    </InfoWrapper>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-7">
                    <EditInfo
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
                    </EditInfo>
                    <EditInfo
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
                    </EditInfo>
                  </div>
                )}
                {/* </div> */}
                {mode === "view" ? (
                  <div className="grid md:grid-cols-2 gap-7">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-xl font-bold text-neutral-800 mb-2 flex items-center">
                        <div className="w-1 h-6 bg-indigo-600 rounded-full mr-2"></div>
                        <CheckCircle
                          className="text-indigo-600 mr-2"
                          size={20}
                        />
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
                    <InfoWrapper
                      label="WhatsApp Group Link"
                      icon={<FaWhatsapp className="text-green-500" size={20} />}
                    >
                      {whatsappLink ? (
                        <Link
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 underline"
                        >
                          {whatsappLink}
                        </Link>
                      ) : (
                        <span className="text-muted-foreground">
                          No link provided
                        </span>
                      )}
                    </InfoWrapper>
                    <InfoWrapper
                      label="Batch Mode"
                      icon={
                        <MdBookOnline className="text-indigo-600" size={20} />
                      }
                    >
                      {batchMode.toUpperCase()}
                    </InfoWrapper>
                    <InfoWrapper
                      label="Batch type"
                      icon={
                        <University className="text-indigo-600" size={20} />
                      }
                    >
                      {batchType.toUpperCase()}
                    </InfoWrapper>
                  </div>
                ) : (
                  <>
                    <EditInfo
                      label="WhatsApp Group Link"
                      icon={<FaWhatsapp className="text-green-500" size={20} />}
                    >
                      <Input
                        placeholder="Enter WhatsApp group invite link"
                        value={whatsappLink}
                        onChange={(e) => setWhatsappLink(e.target.value)}
                        className="focus-visible:ring-0 w-64"
                      />
                    </EditInfo>
                    <BatchStatusSelector
                      setStatus={setStatus}
                      status={status}
                    />
                    <BatchModeSelector
                      batchMode={batchMode}
                      setBatchMode={setBatchMode}
                    />
                    <BatchTypeSelector
                      batchType={batchType}
                      setBatchType={setBatchType}
                    />
                  </>
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
                  {/* <InstructorsCards
                    label={` are assigned to this batch`}
                    instructors={dummyInstructors}
                    mode={mode}
                  /> */}
                </div>
              </div>
              <BatchMeetings
                mode={mode}
                courseId={courseId}
                batch={batch._id as string}
              />
              <ModulesCard
                mode={mode}
                batchId={batch._id}
                name="Batch"
                modules={batch.modules}
                setModuleIds={setBatchModuleIds}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="w-full">
        <BatchNotesTable mode={mode} batchId={batch._id} />
        <BatchStudentTable
          mode={mode}
          dummyStudents={dummyStudents!}
          courseId={courseId}
          batchId={batch._id as string}
        />
        <StatusCard
        onRemove={handleRemoveBatch}  
          updatedAt={batch.updatedAt}
          createdAt={batch.createdAt}
          name="Batch"
        />
      </div>
    </div>
  );
};

export default BatchDetails;
