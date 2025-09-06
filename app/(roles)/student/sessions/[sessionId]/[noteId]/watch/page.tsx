import React from "react";
import WatchPageForTesting from "./_components/watch-page";

type watchPageProps = {
  params: Promise<{ sessionId: string; noteId: string }>;
};
const WatchPage = async ({ params }: watchPageProps) => {
  const sessionId = (await params).sessionId;
  const noteId = (await params).noteId;
  return (
    <>
    <WatchPageForTesting/>
    </>
  );
};

export default WatchPage;
