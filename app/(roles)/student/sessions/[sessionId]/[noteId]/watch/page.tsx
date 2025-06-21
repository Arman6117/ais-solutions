import React from "react";
import WatchVideo from "./_components/watch-video";

type watchPageProps = {
  params: Promise<{ sessionId: string; noteId: string }>;
};
const WatchPage = async ({ params }: watchPageProps) => {
  const sessionId = (await params).sessionId;
  const noteId = (await params).noteId;
  return (
    <>
      <WatchVideo noteId={noteId} />
    </>
  );
};

export default WatchPage;
