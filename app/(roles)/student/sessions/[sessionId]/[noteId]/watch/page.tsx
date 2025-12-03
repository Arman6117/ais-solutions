import React, { Suspense } from "react";
import WatchPageComponent from "./_components/watch-page";
import { getNotesById } from "@/actions/admin/notes/get-notes";
import { Loader2 } from "lucide-react";

type WatchPageProps = {
  params: Promise<{ sessionId: string; noteId: string }>;
};

// Helper for loading state
const LoadingSkeleton = () => (
  <div className="flex h-[50vh] w-full items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary-bg" />
  </div>
);

const WatchPage = async ({ params }: WatchPageProps) => {
  const { sessionId } = await params;

  // 1. Fetch data directly on the server
  const response = await getNotesById(sessionId);
  
  // 2. Handle the response data safely
  const initialNotes = response.success && response.data ? response.data : [];

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <WatchPageComponent 
        sessionId={sessionId} 
        initialNotes={initialNotes}
      />
    </Suspense>
  );
};

export default WatchPage;
