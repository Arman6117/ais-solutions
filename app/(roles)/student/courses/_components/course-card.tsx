import React from "react";
import Image from "next/image";
import { formatDistance } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { LucidePyramid, Star } from "lucide-react";
import Link from "next/link";
import { CourseCards } from "@/lib/types/course.type";

type CourseCardProps = {
  course: CourseCards;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const durationText = formatDistance(
    new Date(course.courseStartDate),
    new Date(course.courseEndDate),
    { addSuffix: false } // removes "in" or "ago"
  );

  return (
    <Link href={`/student/courses/course-details/${course._id}`}>
      <Card className="shadow-none p-0 hover:bg-accent transition-colors">
        <CardContent className="flex p-4 flex-col gap-2 cursor-pointer">
          <Image
            src={course.courseThumbnail}
            width={350}
            height={300}
            alt="thumbnail"
            className="rounded-md"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-indigo-950">
              {course.courseName}
            </h1>
            <p className="text-sm text-neutral-800 line-clamp-2">
              {course.courseDescription}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap mt-3">
            <Badge className="flex rounded p-1 gap-2 items-center bg-primary-bg">
              <LucidePyramid />
              <span>{course.courseLevel}</span>
            </Badge>
            <Badge className="flex gap-1 rounded py-1 px-2 border border-gray-300 bg-transparent items-center">
              <Star className="fill-amber-600 text-amber-600" />
              <span className="text-muted-foreground">{course.rating}</span>
            </Badge>
            <Badge className="flex gap-2 rounded py-1 px-2 border border-gray-300 bg-transparent items-center">
              <span className="text-muted-foreground">
                {course.modules.length} Modules
              </span>
            </Badge>
            <Badge className="flex gap-2 rounded py-1 px-2 border border-gray-300 bg-transparent items-center">
              <span className="text-muted-foreground">{durationText}</span>
            </Badge>
            <Badge className="flex gap-2 rounded py-1 px-2 border border-gray-300 bg-transparent items-center">
              <span className="text-muted-foreground">{course.courseMode}</span>
            </Badge>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center mt-2">
              {course.courseOfferPrice !== course.coursePrice ? (
                <>
                  <span className="text-xl font-bold">
                    ₹{course.courseOfferPrice}
                  </span>
                  <span className="line-through text-muted-foreground">
                    ₹{course.coursePrice}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold">₹{course.coursePrice}</span>
              )}
            </div>
            <Button
              className="border-primary-bg cursor-pointer text-primary-bg hover:bg-primary-bg/10 hover:text-primary-bg"
              size={"sm"}
              variant={"outline"}
            >
              Add To My Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
