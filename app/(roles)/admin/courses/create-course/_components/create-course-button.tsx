"use client";
import { createCourse } from "@/actions/admin/create-course";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "@/lib/helpers/upload-to-cloudinary";
import { useCreateCourseStore } from "@/store/use-create-course-store";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

const CreateCourseButton = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const {
    courseName,
    courseDescription,
    coursePrice,
    courseDiscount,
    courseOfferPrice,
    courseStartDate,
    courseEndDate,
    courseMode,
    instructors,
    modules,
    courseThumbnail,
  } = useCreateCourseStore();

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const mid = modules.map((module) =>
        typeof module === "string" ? module : module.id
      );

      const data = {
        courseName,
        courseDescription,
        coursePrice,
        courseDiscount,
        courseOfferPrice,
        courseStartDate: courseStartDate?.toISOString(), // Convert Date to string
        courseEndDate: courseEndDate?.toISOString(), // Convert Date to string
        courseMode,
        modules: mid, // Stringify array of ids
        courseThumbnail: courseThumbnail as File,
        // Extract url if it's an object
      };

      const res = await createCourse(data);
      if (!res.success) {
        toast.error(res.message || "Failed to create course");
      }
      if (res.errors) {
        toast.custom(() => (
          <div className="bg-red-500 text-white p-4 rounded">
            <span>{Object.values(res.errors).join(", ")}</span>
          </div>
        ));
      }
      if (res.success) {
        toast.success("Course created successfully");
        useCreateCourseStore.getState().resetCourseForm();
        router.push("/admin/courses");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      className="bg-primary-bg mb-5"
      disabled={isCreating}
      onClick={handleClick}
    >
      {isCreating ? "Creating..." : "Create Course"}
    </Button>
  );
};

export default CreateCourseButton;
