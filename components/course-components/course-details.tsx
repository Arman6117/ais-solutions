"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";

import { Course, DummyBatches, DummyInstructors } from "@/lib/types";
import {  toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RefreshCcw, Save, X } from "lucide-react";

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

type CourseDetailsProps = {
  mode: "view" | "edit";
  course: Course | undefined;
  dummyBatches: DummyBatches[];
  dummyInstructors: DummyInstructors[];
};

function ViewCourseName() {
  return <></>;
}

function ViewCourseDescription() {
  return <></>;
}

function ViewCoursePrice() {
  return <></>;
}

const CourseDetails = ({
  dummyBatches,
  course,
  dummyInstructors,
  mode,
}: CourseDetailsProps) => {
  const router = useRouter();

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
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
      <div className="w-full lg:w-2/3 flex-grow">
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex md:flex-row flex-col items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {mode === "edit" ? "Edit Course" : "View Course Details"}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  {mode === "edit"
                    ? " Edit the course details. You can update name, description, price, and more."
                    : "View the course details below"}
                </p>
              </div>
              {mode === "edit" && (
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
              ) : null}
            </div>
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
              ) : null}
            </div>
            <EditCourseDescription
              description={description}
              setDescription={setDescription}
            />
            <Separator className="my-6" />
            <CourseInstructorsCards instructors={instructors} />
            <Separator className="my-6" />

            <div>
              <CourseBatchesCards batches={batches} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/3 space-y-6">
        <EditCourseThumbnail
          setThumbnail={() => {}}
          thumbnail="https://placehold.co/600x400.png"
        />
        <CourseModulesCard modules={course.modules} />

        <CourseStatusCard batches={batches} course={course} />
      </div>
    </div>
  );
};

export default CourseDetails;
