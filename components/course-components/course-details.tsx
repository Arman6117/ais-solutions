"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  EditCourseDescription,
  EditCourseDiscount,
  EditCourseName,
  EditCourseOfferPrice,
  EditCoursePrice,
  EditCourseThumbnail,
} from "./edit-course-components";
import { Separator } from "../ui/separator";
import CourseInstructorsCards from "@/components/course-components/course-instructors-cards";
import CourseBatchesCards from "@/components/course-components/course-batches-cards";
import CourseModulesCard from "@/components/course-components/course-modules-card";
import CourseStatusCard from "@/components/course-components/course-status-card";
import {
  ViewCourseDescription,
  ViewCourseDiscountAndOfferPrice,
  ViewCourseNameAndPrice,
  ViewCourseThumbnail,
} from "./view-course-components";

import { Course, DummyBatches, DummyInstructors } from "@/lib/types";
import { cn } from "@/lib/utils";

import { PencilIcon, RefreshCcw, Save, X } from "lucide-react";

type CourseDetailsProps = {
  // mode: "view" | "edit";
  course: Course | undefined;
  dummyBatches: DummyBatches[];
  dummyInstructors: DummyInstructors[];
};

const CourseDetails = ({
  dummyBatches,
  course,
  dummyInstructors,
}:
CourseDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMode = searchParams.get("mode") === "edit" ? "edit" : "view";
  const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  if (!course) {
    return (
      <div className="p-8 flex w-full items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Course Selected</h2>
          <p className="text-muted-foreground">
            Please select a course to edit
          </p>
          <Button className="mt-4 bg-primary-bg" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  const [name, setName] = useState(course.name || "");
  const [description, setDescription] = useState(course.description || "");
  const [price, setPrice] = useState(course.price || 0);
  const [discount, setDiscount] = useState(course.discount || 0);
  const [offerPrice, setOfferPrice] = useState(
    price - (price * discount) / 100 || 0
  );
  const [instructors, setInstructors] = useState(dummyInstructors || []);
  const [batches, setBatches] = useState(dummyBatches || []);
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

  useEffect(() => {
    setOfferPrice(price - (price * discount) / 100);
  }, [price, discount]);

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
                    "Edit Course"
                  ) : (
                    <p className="mt-7">View Course Details</p>
                  )}
                </CardTitle>
                {mode === "edit" ? (
                  <p className="text-muted-foreground mt-1 text-center">
                    Edit the course details. You can update name, description,
                    price, and more.
                  </p>
                ) : (
                  <p className="mt-1 ml-1">View the course details below</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mode === "edit" ? (
                <>
                  <EditCourseName name={name} setName={setName} />
                  <EditCoursePrice price={price} setPrice={setPrice} />
                </>
              ) : (
                <>
                  <ViewCourseNameAndPrice name={name} price={price} />
                </>
              )}
            </div>
            {mode === "view" && <Separator className="w-full mt-10" />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mode === "edit" ? (
                <>
                  <EditCourseDiscount
                    discount={discount}
                    setDiscount={setDiscount}
                  />
                  <EditCourseOfferPrice
                    discount={discount}
                    offerPrice={offerPrice}
                    price={price}
                  />
                </>
              ) : (
                <ViewCourseDiscountAndOfferPrice
                  discount={discount}
                  offerPrice={offerPrice}
                />
              )}
            </div>
            {mode === "edit" ? (
              <EditCourseDescription
                description={description}
                setDescription={setDescription}
              />
            ) : (
              <>
                <Separator className="my-6" />
                <ViewCourseDescription description={description} />
              </>
            )}
            <Separator className="my-6" />
            <CourseInstructorsCards mode={mode} instructors={instructors} />
            <Separator className="my-6" />

            <div>
              <CourseBatchesCards batches={batches} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/3 space-y-6">
        {mode === "edit" ? (
          <EditCourseThumbnail
            setThumbnail={() => {}}
            thumbnail="https://placehold.co/600x400.png"
          />
        ) : (
          <ViewCourseThumbnail thumbnail="https://placehold.co/600x400.png" />
        )}
        <CourseModulesCard modules={course.modules} />

        <CourseStatusCard batches={batches} course={course} />
      </div>
    </div>
  );
};

export default CourseDetails;
