"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import React from "react";

const CoursesTable = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex gap-7">
        <div className="flex gap-3 w-full">
          <Input
            placeholder="Search by Course Name...."
            className="max-w-sm text-lg font-medium focus-visible:ring-1 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200"
          />
          {/* <Button className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80">
            <ArrowRight />
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default CoursesTable;
