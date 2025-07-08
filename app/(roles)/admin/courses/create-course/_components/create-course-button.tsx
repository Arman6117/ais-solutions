"use client";
import { Button } from "@/components/ui/button";
import { useCreateCourseStore } from "@/store/use-create-course-store";
import React, { useState } from "react";

const CreateCourseButton = () => {
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

  const handleClick = async () => {
    try {
        const res = await CreateCourse()
    } catch (error) {
      console.error("Error creating course:", error);
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
