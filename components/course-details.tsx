"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";

import { Course, DummyBatches, DummyInstructors } from "@/lib/types";
import { Toaster, toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RefreshCcw, Save, X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type CourseDetailsProps = {
  mode: "view" | "edit";
  course: Course | undefined;
  dummyBatches: DummyBatches[];
  dummyInstructors: DummyInstructors[];
};

function ViewCourseName() {
  return <></>;
}
function EditCourseName({
  name,
  setName,
}: {
  name: string;
  setName: (n: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Course Name</Label>
      <Input
        placeholder="Enter Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="font-medium"
      />
    </div>
  );
}

function ViewCourseDescription() {
  return <></>;
}
function EditCourseDescription() {
  return <></>;
}

function ViewCoursePrice() {
  return <></>;
}
function EditCoursePrice({
  price,
  setPrice,
}: {
  price: number;
  setPrice: (amount: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Regular Price</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          ₹
        </span>
        <Input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="font-medium pl-8"
        />
      </div>
    </div>
  );
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
             
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetails;
