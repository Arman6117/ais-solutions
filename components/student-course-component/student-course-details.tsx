import React from "react";

import Image from "next/image";

import CourseBasicInfoCard from "../../app/(roles)/student/courses/course-details/[id]/_components/course-basic-info-card";
import ModuleSelect from "../../app/(roles)/student/courses/course-details/[id]/_components/module-select";
import ModulesDescription from "./modules-description";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { AlertTriangle, Calendar, Pyramid } from "lucide-react";
// import StudentCourseReviews from "./student-course-reviews";
import { CourseDetails } from "@/lib/types/course.type";
import { format } from "date-fns";
import { getStudentId } from "@/actions/shared/get-student-id";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type StudentCourseDetailsProps = {
  course: CourseDetails | undefined;
  message?: string;
};

const StudentCourseDetails = async ({
  course,
  message,
}: StudentCourseDetailsProps) => {
  if (!course) {
    return (
      <div className="flex h-screen w-screen text-lg items-center justify-center">
        <AlertTriangle className="text-destructive" />
        <h1 className="text-destructive">{message}</h1>
      </div>
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session?.user?.email) {
    console.error("No user session found");
    return; 
  }
  
  const studentId = await getStudentId(session.user.email);
  
 


  return (
    <div className="flex flex-col w-full relative">
      <div className="h-auto bg-gradient-to-r gap-4 rounded-md from-[#16161d] to-indigo-950 p-10 flex flex-col">
        <h1 className="sm:text-[45px] text-4xl max-w-[550px] text-white font-bold">
          {course.courseName}
        </h1>
        <p className="text-white text-sm max-w-[550px]">
          {course.courseDescription}
        </p>
        <Badge className="bg-primary-bg flex gap-2 mt-5">
          <Pyramid className="text-white" />
          {course.courseLevel}
        </Badge>
        <div className="flex gap-2 items-center">
          <Calendar className="text-white size-4" />
          <span className="text-white text-sm">
            Last Updated: {format(course.createdAt, "M/y")}
          </span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col sm:p-0 p-10 justify-between">
        <div className="flex flex-col">
          <CourseBasicInfoCard
            learners={course.numberOfStudents}
            mode={course.courseMode}
            rating={course.rating}
          />
          <ModulesDescription modules={course.modules} />
          <Separator className="mt-5" />
        </div>
        <Card className="p-0 md:fixed md:right-12 md:top-20 mt-4 max-h-[550px]">
          <CardContent className="p-3 flex flex-col">
            <Image
              src={course.courseThumbnail}
              width={350}
              height={300}
              alt="thumbnail"
              className="rounded-md"
            />
            <div className="flex flex-col mt-5">
              <h1 className="text-xl font-semibold">Modules Included</h1>
              <div className="flex-flex-col mt-4">
                {course.modules.map((module, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2 items-center">
                      <h1 className="text-lg font-medium">{module.name}</h1>
                      <span className="text-sm text-muted-foreground">
                        ₹{module.price}
                      </span>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-xl font-medium">Course Price</span>
                  <div className="flex gap-3 flex-col items-center justify-center">
                    {course.courseDiscount > 0 ? (
                      <>
                        <div className="flex gap-4">
                          <span className="text-lg line-through text-muted-foreground">
                            ₹{course.coursePrice}
                          </span>
                          <span className="text-xl font-medium">
                            ₹{course.courseOfferPrice}
                          </span>
                        </div>
                        <span className="text-sm text-center text-green-600 font-light">
                          {course.courseDiscount}% Discount
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-medium">
                        ₹{course.coursePrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full border-primary-bg hover:text-primary-bg cursor-pointer hover:bg-primary-bg/10 text-primary-bg"
                  variant={"outline"}
                >
                  Request Approval
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Modules</DialogTitle>
                  <DialogDescription>
                    Only modules you want to purchase
                  </DialogDescription>
                </DialogHeader>
                
                  <ModuleSelect
                    modules={course.modules}
                    courseId={course._id}
                    discount={course.courseDiscount}
                    coursePrice={course.coursePrice}
                    courseOfferPrice={course.courseOfferPrice}
                  />
                {course.studentsEnrolled.includes(studentId!) && (
                  <Badge className="bg-amber-500">
                    You are already enrolled in the course select only modules
                    you have&apos;t  purchase
                  </Badge>
                )}
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* <StudentCourseReviews className="flex md:hidden" isEnrolled={false} /> */}
      </div>
    </div>
  );
};

export default StudentCourseDetails;
