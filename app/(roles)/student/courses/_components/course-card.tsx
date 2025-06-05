import React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { LucidePyramid, Star } from "lucide-react";
import Link from "next/link";

type Course = {
  id: number;
  title: string;
  level: string;
  price: number;
  createdAt: Date;
};
type CourseCardProps = {
  course: Course;
};
const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={`/student/courses/course-details/${course.id}`}>
    <Card className="shadow-none p-0 hover:bg-accent transition-colors">
      <CardContent className="flex p-4   flex-col gap-2 cursor-pointer ">
        <Image
          src={"https://placehold.co/200x120"}
          width={350}
          height={300}
          alt="thumbnail"
          className="rounded-md"
          />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold text-indigo-950">
            {course.title}
          </h1>
          <p className="text-sm text-neutral-800  line-clamp-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
            facere libero repudiandae laudantium quisquam blanditiis possimus
            debitis{" "}
          </p>
          <span className="text-xs text-muted-foreground ">John Doe</span>
        </div>
        <div className="flex gap-3 flex-wrap mt-3">
          <Badge className="flex rounded p-1 gap-2 items-center bg-primary-bg">
            <LucidePyramid />
            <span>{course.level}</span>
          </Badge>
          <Badge className="flex gap-1 rounded py-1 px-2 border border-gray-300 bg-transparent  items-center ">
            <Star className="fill-amber-600 text-amber-600" />
            <span className="text-muted-foreground">4.5</span>
          </Badge>
          <Badge className="flex gap-2 rounded py-1 px-2 border border-gray-300 bg-transparent  items-center ">
            <span className="text-muted-foreground ">10 Modules</span>
          </Badge>
          <Badge className="flex gap-2 rounded py-1 px-2 border border-gray-300 bg-transparent  items-center ">
            <span className="text-muted-foreground ">3 Months</span>
          </Badge>
          <Badge className="flex gap-2 rounded py-1 px-2 border border-gray-300 bg-transparent  items-center ">
            <span className="text-muted-foreground ">Offline</span>
          </Badge>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center mt-2">
            <span className="text-xl font-bold">₹{course.price}</span>
            <span className="line-through text-muted-foreground ">₹2000</span>
          </div>
          <Button
            className="border-primary-bg cursor-pointer text-primary-bg hover:bg-primary-bg/10 hover:text-primary-bg "
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
