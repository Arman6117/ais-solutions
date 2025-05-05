"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { DummyBatches, DummyInstructors, DummyStudent } from "@/lib/types";
import { cn } from "@/lib/utils";

import { PencilIcon, RefreshCcw, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BatchInfoWrapper from "@/components/batch-components/btach-info-wrapper";

type BatchDetailsProps = {
  // mode: "view" | "edit";
  batch: DummyBatches | undefined;
  dummyModules: string[];
  dummyInstructors: DummyInstructors[];
  dummyStudents: DummyStudent[] | undefined;
};

const BatchDetails = ({
  batch,
  dummyInstructors,
  dummyModules,
  dummyStudents,
}: BatchDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMode = searchParams.get("mode") === "edit" ? "edit" : "view";
  const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  if (!batch) {
    return (
      <div className="p-8 flex w-full items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Batchbatch Selected</h2>
          <p className="text-muted-foreground">Please select a batch to edit</p>
          <Button className="mt-4 bg-primary-bg" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  const [name, setName] = useState(batch.name || "");
  const [instructors, setInstructors] = useState(dummyInstructors || []);
  const [students, setStudents] = useState(dummyStudents || []);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    //TODO:Handle saving logic and API call here
    setIsLoading(true);
    toast.success("Changes saved successfully!");
    setIsLoading(false);
    setMode("view");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
      <div className="w-full lg:w-2/3 flex-grow">
        <Card className="border-0 shadow-md p-0">
          <CardHeader
            className={cn(
              "bg-gray-50 border-b",
              mode === "view" && "bg-primary-bg rounded-lg  text-white h-full"
            )}
          >
            <div className="flex md:flex-row flex-col items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {mode === "edit" ? (
                    "Edit Batch"
                  ) : (
                    <p className="mt-7">View Batch Details</p>
                  )}
                </CardTitle>
                {mode === "edit" ? (
                  <p className="text-muted-foreground mt-1 text-center">
                    Edit the batch details.
                  </p>
                ) : (
                  <p className="mt-1 ml-1">View the batch details below</p>
                )}
              </div>
              {mode === "edit" ? (
                <div className="flex gap-2">
                  <Button
                    className="bg-primary-bg hover:bg-primary-bg/90 gap-2 cursor-pointer"
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
                    className="border-gray-300 cursor-pointer"
                    onClick={() => router.back()}
                  >
                    <X size={16} className="mr-1" /> Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  className="bg-white  text-black hover:text-white cursor-pointer"
                  onClick={() => setMode("edit")}
                >
                  <PencilIcon size={16} className="mr-1" /> Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col gap-7">
              {mode === "view" ? (
                <div className="flex flex-col gap-10">
                  <BatchInfoWrapper label="Name">{batch.name}</BatchInfoWrapper>
                  <div className="flex gap-14">
                  <BatchInfoWrapper label="Start Date">{batch.startDate}</BatchInfoWrapper>
                  <BatchInfoWrapper label="End Date">{batch.endDate}</BatchInfoWrapper>
                  </div>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/3 space-y-6"></div>
    </div>
  );
};

export default BatchDetails;
