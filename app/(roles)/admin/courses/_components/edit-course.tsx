"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CourseStatusCard from "../../../../../components/status-card";
import CourseModulesCard from "../../../../../components/modules-card";
import CourseBatchesCards from "./course-batches-cards";
import CourseInstructorsCards from "../../../../../components/instructors-cards";

import { dummyBatches, dummyInstructors } from "@/lib/static";

import { RefreshCcw, Save, X, Upload } from "lucide-react";
type EditCourseProps = {
  course: Course | undefined;
};

const EditCourse = ({ course }: EditCourseProps) => {
  const router = useRouter();

  if (!course) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
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
    price - (price * Number(course.discount)) / 100 || 0
  );
  const [instructors, setInstructors] = useState(dummyInstructors);
  const [batches, setBatches] = useState(dummyBatches);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [course, price, discount]);

  //! Calculate offer price whenever price or discount changes
  useEffect(() => {
    setOfferPrice(price - (price * discount) / 100);
  }, [price, discount]);

  const handleSave = () => {
    //TODO: Handle saving logic here
    setIsLoading(true);
    setTimeout(() => {
      console.log({ name, description, price, instructors, batches });
      setIsLoading(false);
      toast.success("Changes saved successfully!");
    }, 800);
  };

  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
      <div className="w-full lg:w-2/3 flex-grow">
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Edit Course
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  Edit the course details. You can update name, description,
                  price, and more.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="bg-primary-bg hover:bg-primary-bg/90 gap-2"
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
                  className="border-gray-300"
                  onClick={() => router.back()}
                >
                  <X size={16} className="mr-1" /> Cancel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">Course Name</Label>
                <Input
                  placeholder="Enter Course Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-medium"
                />
              </div>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">Discount (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter Discount in %"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="font-medium pr-8"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    %
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-base font-medium">Offer Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <Input
                    type="number"
                    readOnly
                    placeholder="Offer Price"
                    value={offerPrice}
                    className="font-medium pl-8 bg-gray-50"
                  />
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600">
                    {discount}% off ({formatCurrency(price - offerPrice)}{" "}
                    discount)
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Description</Label>
              <Textarea
                placeholder="Enter Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="font-medium min-h-[150px]"
              />
            </div>

            <Separator className="my-6" />

            <CourseInstructorsCards mode={'edit'} label="Course" instructors={instructors} />
            <Separator className="my-6" />

            <div>
              <CourseBatchesCards  mode="edit" courseId="" batches={batches} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-1/3 space-y-6">
        <Card className="overflow-hidden border-0 shadow-md">
          <CardHeader className="pb-3 bg-gray-50 border-b">
            <CardTitle className="text-xl">Course Thumbnail</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3 p-6">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg border shadow-sm">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Course Thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <Button className="w-full flex items-center bg-primary-bg hover:bg-primary-bg/90 justify-center gap-2">
              <Upload size={16} /> Change Thumbnail
            </Button>
          </CardContent>
        </Card>

        <CourseModulesCard mode="edit" name="Course" modules={course.modules} />

        <CourseStatusCard name="Course" batches={batches} course={course} />
      </div>
    </div>
  );
};

export default EditCourse;
