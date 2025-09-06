import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateCourseButton = () => {
  return (
    <>
      <Link href={`/admin/courses/create-course`}>
        <Button
          size="sm"
          className="flex bg-primary-bg cursor-pointer hover:bg-primary-bg/90 items-center gap-1"
        >
          <Plus size={16} /> Create a New Course
        </Button>
      </Link>
    </>
  );
};

export default CreateCourseButton;
