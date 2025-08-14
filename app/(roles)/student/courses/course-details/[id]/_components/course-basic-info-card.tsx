"use client";
import DisplayRating from "@/components/display-rating";
import { Separator } from "@/components/ui/separator";
import { Mode } from "@/lib/types/types";
import { Users } from "lucide-react";
import React from "react";

import { PiChalkboardTeacher } from "react-icons/pi";

//TODO:Accept course
type CourseBasicInfoCardProps = {
  mode:Mode
  rating:number
  learners:number
}
const CourseBasicInfoCard = ({learners,mode,rating}:CourseBasicInfoCardProps) => {
  return (
    <div className="w-72 mt-5  bg-white rounded-md shadow flex">
      <div className="flex flex-col justify-center rounded-tl-md rounded-bl-md p-4 items-center bg-primary-bg">
        <PiChalkboardTeacher className="text-white size-5" />
        <h3 className="font-medium text-white">{mode}</h3>
      </div>
      <div className="flex flex-col p-4 items-center">
        <h3 className="text-lg font-medium">{rating}</h3>
        <div className="flex ">
          <DisplayRating value={rating} starClassName="size-3 text-amber-700" />
        </div>
      </div>
      <div className="py-2">
        <Separator orientation="vertical" />
      </div>
      <div className="flex flex-col p-4 items-center">
        <Users className="size-4" />
        <h3 className="text-sm font-medium">{learners}</h3>
        <span className="text-sm text-muted-foreground">learners</span>
      </div>
    </div>
  );
};

export default CourseBasicInfoCard;
