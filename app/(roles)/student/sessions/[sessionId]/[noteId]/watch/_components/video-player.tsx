"use client";

import { PlayIcon } from "lucide-react";
import dynamic from "next/dynamic";
import MuxPlayer from "@mux/mux-player-react";
import React from "react";

type VideoPlayerProps = {
  playbackId: string;
  title?: string;
  userId?: string;
};

const VideoPlayer = ({
  playbackId,
  title = "Session Video",
  userId = "student",
}: VideoPlayerProps) => {
  return (
    <div
      className="rounded-xl overflow-hidden"
      onContextMenu={(e) => e.preventDefault()} 
    >
      <MuxPlayer
        playbackId={playbackId}
        streamType="on-demand"
        metadata={{
          video_title: title,
          viewer_user_id: userId,
        }}
        autoPlay
        muted
        accentColor="#6b46c1" // purple
        className="w-full h-auto rounded-xl"
      />
    </div>
  );
};

export default VideoPlayer;
