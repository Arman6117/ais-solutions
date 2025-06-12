"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  
  Download,


} from "lucide-react";
import {
  Accordion,

} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ModuleAccordion from "./module-accordion";
import { dummyEnrolledCourseData as courseData } from "@/lib/static";
// Mock data - replace with your actual data
const EnrolledCourse = () => {
  return (
    <div className="min-h-screen">
      <div className="h-auto bg-gradient-to-r gap-4 w-full rounded-md from-[#16161d] to-indigo-950 p-6 md:p-10 flex flex-col">
        <Button className="bg-gradient-to-r mt-1 w-16 h-10 from-purple-500 to-indigo-500 cursor-pointer text-white hover:from-purple-600 hover:to-indigo-600 transition-colors duration-300">
          <ArrowLeft className="size-5" />
        </Button>

        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-purple-500/20 text-purple-300"
              >
                Course
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-300"
              >
                {courseData.progress}% Complete
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl text-white font-semibold leading-tight">
              {courseData.name}
            </h1>
            <p className="text-sm md:text-base max-w-2xl text-gray-300 leading-relaxed">
              {courseData.description}
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Course Progress</span>
                <span className="text-sm text-white font-medium">
                  {courseData.progress}%
                </span>
              </div>
              <Progress
                value={courseData.progress}
                className="h-2 [&>div]:bg-white bg-neutral-900"
              />
            </div>
          </div>

          <div className="lg:w-72">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Course Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Total Modules</span>
                  <span className="text-white font-medium">
                    {courseData.modules.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Purchased</span>
                  <span className="text-white font-medium">
                    {courseData.modules.filter((m) => m.isPurchased).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Completed</span>
                  <span className="text-white font-medium">
                    {courseData.modules.filter((m) => m.isCompleted).length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Course Modules
          </h2>
          <Button variant="outline" className="w-fit">
            <Download className="w-4 h-4 mr-2" />
            Download All Materials
          </Button>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {courseData.modules.map((module) => (
            <ModuleAccordion key={module.id} module={module} courseName={courseData.name} />
          ))}
        </Accordion>

        {/* Additional Course Actions
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                Course Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Complete all modules to earn your certificate
              </p>
              <Button
                variant="outline"
                disabled={courseData.progress < 100}
                className="w-full"
              >
                {courseData.progress < 100
                  ? "Complete Course First"
                  : "Download Certificate"}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-500" />
                Discussion Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Ask questions and connect with other students
              </p>
              <Button variant="outline" className="w-full">
                Join Discussion
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                Study Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Create a personalized study plan
              </p>
              <Button variant="outline" className="w-full">
                Create Schedule
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default EnrolledCourse;
