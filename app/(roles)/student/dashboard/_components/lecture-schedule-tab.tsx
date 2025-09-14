
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import LectureCardSuspense from "./lecture-card-suspense";

const LectureScheduleTab = () => {
  return (
    <Tabs defaultValue="today" orientation="horizontal">
      <TabsList className="inline-flex items-center w-full justify-center rounded-full bg-muted p-1 shadow-inner">
        <TabsTrigger
          value="today"
          className="text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 font-medium transition-all duration-200 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary"
        >
          Today
        </TabsTrigger>
        <TabsTrigger
          value="tomorrow"
          className="text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 font-medium transition-all duration-200 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary"
        >
          Tomorrow
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[500px] no-scrollbar overflow-x-hidden flex gap-6 pr-2 flex-col w-auto">
        <TabsContent value="today" className=" flex gap-6 p-3 flex-col ">
          <LectureCardSuspense />
        </TabsContent>

        <TabsContent value="tomorrow" className="flex flex-col gap-6 p-3">
          <LectureCardSuspense />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default LectureScheduleTab;
