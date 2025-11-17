"use client";

import React, { useState, useMemo, useCallback } from "react";
import YouTube from "react-youtube";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, BookOpen, Layers } from "lucide-react";
import { NoteData } from "@/lib/types/types";
import { Badge } from "@/components/ui/badge";

type NoteContentPlayerProps = {
  note: NoteData;
  sessionId: string;
};

const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const NoteContentPlayer = ({ note }: NoteContentPlayerProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const currentVideoId = useMemo(() => {
    if (note.videoLinks && note.videoLinks.length > 0) {
      return getYouTubeVideoId(note.videoLinks[currentVideoIndex].link);
    }
    return null;
  }, [note.videoLinks, currentVideoIndex]);

  const handleNextVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) =>
      Math.min(prevIndex + 1, note.videoLinks.length - 1)
    );
  }, [note.videoLinks.length]);

  const handlePrevVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const hasMultipleVideos = note.videoLinks && note.videoLinks.length > 1;
  const hasFiles = note.files && note.files.length > 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Section: Video Player */}
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold mb-4 text-neutral-800">
          {note.session.meetingName}
        </h1>

        {/* Video Player */}
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl aspect-video w-full">
          {currentVideoId ? (
            <YouTube
            
              videoId={currentVideoId}
              opts={{ ...opts, width: "100%", height: "100%" }}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white text-lg">
              No video available for this note.
            </div>
          )}
        </div>

        {/* Video Navigation */}
        {hasMultipleVideos && (
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={handlePrevVideo}
              disabled={currentVideoIndex === 0}
              variant="outline"
              className="gap-2"
            >
              <ChevronLeft size={18} /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Video {currentVideoIndex + 1} of {note.videoLinks.length}
            </span>
            <Button
              onClick={handleNextVideo}
              disabled={currentVideoIndex === note.videoLinks.length - 1}
              variant="outline"
              className="gap-2"
            >
              Next <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>

      {/* Right Section: Video Cards / Files Tab */}
      <div className="lg:w-96 flex-shrink-0">
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="videos" className="gap-2">
              <BookOpen size={18} /> Videos ({note.videoLinks?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="files" disabled={!hasFiles} className="gap-2">
              <FileText size={18} /> Files ({note.files?.length || 0})
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab - Show Module/Chapter/Topics Cards */}
          <TabsContent value="videos" className="mt-4">
            <h3 className="text-xl font-semibold mb-3">Video Content</h3>
            {note.videoLinks && note.videoLinks.length > 0 ? (
              <div className="space-y-3">
                {note.videoLinks.map((video, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      index === currentVideoIndex
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentVideoIndex(index)}
                  >
                    {/* Video Number */}
                    <div className="flex items-center gap-2 mb-3">
                     
                      {index === currentVideoIndex && (
                        <Badge className="bg-blue-600">Now Playing</Badge>
                      )}
                    </div>

                    {/* Module */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Layers size={16} className="text-purple-600" />
                        <span className="text-xs font-medium text-gray-600 uppercase">
                          Module
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {note.module}
                      </p>
                    </div>

                    {/* Chapter */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen size={16} className="text-blue-600" />
                        <span className="text-xs font-medium text-gray-600 uppercase">
                          Chapter
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {note.chapter}
                      </p>
                    </div>

                    {/* Topics */}
                    {note.topics && note.topics.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <FileText size={16} className="text-green-600" />
                          <span className="text-xs font-medium text-gray-600 uppercase">
                            Topics Covered
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {note.topics.map((topic, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-800 border-green-200"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No videos available for this note.</p>
            )}
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="mt-4">
            <h3 className="text-xl font-semibold mb-3">Associated Files</h3>
            {hasFiles ? (
              <div className="space-y-3">
                {note.files.map((file, index) => (
                  <a
                    key={file._id || index}
                    href={file.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <FileText size={20} className="text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{file.label}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {file.link}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No files associated with this note.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NoteContentPlayer;
