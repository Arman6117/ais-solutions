'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronRight, FileText, Play, Video } from "lucide-react";
import VideoPlayer from "./video-player";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FileDownload from "./file-download";
import { useRouter } from "next/navigation";

type Files = {
  name: string;
  size: string;
};

type Notes = {
  id: number;
  title: string;
  videoUrl: string;
  files: Files[];
};

type ViewNotesProps = {
  notes: Notes[];
  courseName: string;
};

const ViewNotes = ({ notes, courseName }: ViewNotesProps) => {
  const [activeTab, setActiveTab] = useState("video");
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const router  = useRouter()
  const note = notes[currentNoteIndex];

  return (
    <div className="space-y-6 w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" className="cursor-pointer" size="sm" onClick={()=>router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{courseName}</h2>
          <p className="text-gray-600">{note.title}</p>
        </div>
        <select
          className="border px-3 py-2 rounded-md text-sm"
          value={currentNoteIndex}
          onChange={(e) => setCurrentNoteIndex(Number(e.target.value))}
        >
          {notes.map((n, index) => (
            <option key={n.id} value={index}>
              {n.title}
            </option>
          ))}
        </select>
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
                <p><strong>Title:</strong> {note.title}</p>
                <p><strong>Duration:</strong> 25 minutes</p>
                <p><strong>Quality:</strong> 1080p HD</p>
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

export default ViewNotes;
