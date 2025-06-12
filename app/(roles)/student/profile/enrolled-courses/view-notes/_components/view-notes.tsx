'use client'

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Award, ChevronRight, Clock, FileText, Play, Star, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from "./video-player";
import FileDownload from "./file-download";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Files = {
  name: string;
  size: string;
};

type Note = {
  id: number;
  title: string;
  videoUrl: string[];
  files: Files[];
};

type ViewNotesProps = {
  notes: Note[];
  courseName: string;
};

const ViewNotes = ({ notes, courseName }: ViewNotesProps) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
   
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-6 mb-6">
            <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md transition-shadow">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {courseName || "Advanced React Development"}
              </h1>
              <p className="text-gray-600 mt-1">Master modern React development with hands-on projects</p>
            </div>
          </div>
          
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Videos</p>
                <p className="text-lg font-bold text-blue-800">24</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="p-2 bg-green-500 rounded-lg">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Duration</p>
                <p className="text-lg font-bold text-green-800">8.5 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Students</p>
                <p className="text-lg font-bold text-purple-800">12,459</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-amber-600 font-medium">Rating</p>
                <p className="text-lg font-bold text-amber-800">4.9/5</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chapter Notes</h2>
          <p className="text-gray-600">Expand each chapter to access videos, notes, and resources</p>
        </div>

        <Accordion type="multiple" className="space-y-4">
          {notes.map((note, index) => (
            <AccordionItem 
              key={note.id} 
              value={`note-${note.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-500">{note.videoUrl.length} video{note.videoUrl.length > 1 ? 's' : ''}</span>
                      <span className="text-sm text-gray-500">{note.files.length} file{note.files.length > 1 ? 's' : ''}</span>
                      <Badge variant="secondary" className="text-xs">25 min</Badge>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <Tabs defaultValue="video" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger 
                      value="video" 
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Videos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notes"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Resources
                    </TabsTrigger>
                    <TabsTrigger 
                      value="next"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Next
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="video" className="space-y-6">
                    {/* Video Selection */}
                    {note.videoUrl.length > 1 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {note.videoUrl.map((_, idx) => (
                          <Button
                            key={idx}
                            variant={idx === activeVideoIndex ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveVideoIndex(idx)}
                            className="shadow-sm hover:shadow-md transition-shadow"
                          >
                            Video {idx + 1}
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* Video Player */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <VideoPlayer
                        videoUrl={note.videoUrl[activeVideoIndex]}
                        title={note.title}
                      />
                    </div>

                    {/* Video Details Card */}
                    <Card className="shadow-sm border-gray-200">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                            <Video className="w-4 h-4 text-white" />
                          </div>
                          Video Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Title</p>
                            <p className="font-medium text-gray-900">{note.title}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Duration</p>
                            <p className="font-medium text-gray-900">25 minutes</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Quality</p>
                            <p className="font-medium text-gray-900">1080p HD</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm text-gray-500 mb-2">Topics Covered</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">React</Badge>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">JavaScript</Badge>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800">Frontend</Badge>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">Components</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes" className="space-y-4">
                    <Card className="shadow-sm border-gray-200">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          Course Materials
                        </CardTitle>
                        <CardDescription>
                          Download the following files to supplement your learning experience
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {note.files.map((file, idx) => (
                          <FileDownload key={idx} file={file} />
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="next" className="space-y-4">
                    <Card className="shadow-sm border-gray-200 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">Next: Components and JSX</CardTitle>
                        <CardDescription>Continue your learning journey with advanced concepts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">Understanding JSX Syntax</h3>
                            <p className="text-gray-600 mt-1">
                              Deep dive into JSX fundamentals and best practices
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                35 minutes
                              </span>
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                Intermediate
                              </span>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all">
                            Start Next Chapter
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
export default ViewNotes;
