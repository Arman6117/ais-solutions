"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Play,
  Lock,
  FileText,
  Video,
  ChevronDown,
  ChevronRight,
  Download,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ModuleAccordion from "./module-accordion";

// Mock data - replace with your actual data
const courseData = {
  id: 1,
  name: "Advanced React Development",
  description:
    "Master advanced React concepts including hooks, context, performance optimization, and modern patterns. Build production-ready applications with confidence.",
  progress: 65,
  modules: [
    {
      id: 1,
      name: "React Fundamentals",
      isPurchased: true,
      isCompleted: true,

      chapters: [
        {
          id: 1,
          name: "Introduction to React",
          isCompleted: true,
          duration: "25m",
          notes: [
            {
              id: 1,
              title: "React Basics Overview",
              videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA",
              files: [
                { name: "React_Basics.pdf", size: "2.1 MB" },
                { name: "Code_Examples.zip", size: "1.5 MB" },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Components and JSX",
          isCompleted: true,

          notes: [
            {
              id: 2,
              title: "Understanding JSX",
              videoUrl: "https://www.youtube.com/embed/7fPXI_MnBOY",
              files: [{ name: "JSX_Guide.pdf", size: "1.8 MB" }],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Advanced Hooks",
      isPurchased: true,
      isCompleted: false,

      chapters: [
        {
          id: 3,
          name: "useState and useEffect",
          isCompleted: false,
          duration: "45m",
          notes: [
            {
              id: 3,
              title: "State Management with Hooks",
              videoUrl: "https://www.youtube.com/embed/O6P86uwfdR0",
              files: [
                { name: "Hooks_Examples.pdf", size: "2.5 MB" },
                { name: "Practice_Code.zip", size: "3.2 MB" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Performance Optimization",
      isPurchased: false,
      isCompleted: false,

      chapters: [
        {
          id: 4,
          name: "React.memo and useMemo",
          isCompleted: false,
          duration: "40m",
          notes: [],
        },
      ],
    },
  ],
};

const VideoPlayer = ({ videoUrl, title }) => {
  return (
    <div className=" aspect-video w-full rounded-lg overflow-hidden bg-black">
      <iframe
        src={videoUrl}
        title={title}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const FileDownload = ({ file }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-purple-500" />
        <div>
          <p className="font-medium text-sm">{file.name}</p>
          <p className="text-xs text-gray-500">{file.size}</p>
        </div>
      </div>
      <Button variant="outline" size="sm">
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

const NotesViewer = ({ note, courseName }) => {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="space-y-6 w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{courseName}</h2>
          <p className="text-gray-600">{note.title}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="next">Next Chapter</TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="space-y-4 w-ful">
          <VideoPlayer videoUrl={note.videoUrl} title={note.title} />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Title:</strong> {note.title}
                </p>
                <p>
                  <strong>Duration:</strong> 25 minutes
                </p>
                <p>
                  <strong>Quality:</strong> 1080p HD
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">Frontend</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Course Materials
              </CardTitle>
              <CardDescription>
                Download the following files to supplement your learning
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {note.files.map((file, index) => (
                <FileDownload key={index} file={file} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="next" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Next: Components and JSX</CardTitle>
              <CardDescription>Continue your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Understanding JSX Syntax</h3>
                  <p className="text-sm text-gray-600">
                    Learn how JSX works under the hood
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Duration: 35 minutes
                  </p>
                </div>
                <Button>
                  Start Next Chapter
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

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
            <ModuleAccordion key={module.id} module={module} />
          ))}
        </Accordion>

        {/* Additional Course Actions */}
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
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourse;
