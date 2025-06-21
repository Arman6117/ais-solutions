import { fetchYouTubeDetails } from "@/actions/student/fetch-notes";
import { extractVideoId } from "@/lib/utils";
import React from "react";
import VideoPlayer from "./video-player";

type WatchVideoProps = {
  noteId: string;
};
const WatchVideo = async ({ noteId }: WatchVideoProps) => {
  const playBackId =
    "o5m4IdBVlb6xn2Ij62gN4llK01klAtKeWdPGw8K2d01oI";
  return (
    <div className="flex flex-col w-full ">
      <h1 className="text-4xl font-semibold">Session Name</h1>
      <VideoPlayer playbackId={playBackId} title="Intro to react" />
    </div>
  );
};

export default WatchVideo;
