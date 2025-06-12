"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type VideoPlayerProps = {
  videoUrl: string;
  title: string;
};

const getYouTubeEmbedUrl = (url: string) => {
  try {
    const videoIdMatch = url.match(/(?:v=|\/embed\/|youtu\.be\/)([\w-]+)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
  } catch {
    return "";
  }
};

const VideoPlayer = ({ videoUrl, title }: VideoPlayerProps) => {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invalid Video URL</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Please provide a valid YouTube video link.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-xl border border-slate-200">
      <div className="aspect-video w-full">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Card>
  );
};

export default VideoPlayer;
