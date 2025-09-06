import React from "react";
import WatchPageComponent from "./_components/watch-page";


type watchPageProps = {
  params: Promise<{ sessionId: string; noteId: string }>;
};
const WatchPage = async ({ params }: watchPageProps) => {
  const sessionId = (await params).sessionId;
  
  return (
    <>
    <WatchPageComponent  sessionId={sessionId}/>
    </>
  );
};

export default WatchPage;
