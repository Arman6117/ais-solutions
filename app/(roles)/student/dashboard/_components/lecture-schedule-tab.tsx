import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import LectureScheduleCard from "./lecture-schedule-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const LectureScheduleTab = () => {
  return (
    <Tabs defaultValue="today" orientation="horizontal">
      <TabsList className="space-x-11 sm:p-7 bg-primary-bg/10 shadow">
        <TabsTrigger className="text-lg sm:p-5 cursor-pointer " value="today">
          Today
        </TabsTrigger>
        <TabsTrigger className="text-lg sm:p-5 cursor-pointer" value="tomorrow">
          Tomorrow
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="h-[500px] no-scrollbar overflow-x-hidden flex gap-6 pr-2 flex-col w-auto">
        <TabsContent value="today" className=" flex gap-6 p-3 flex-col ">
          <LectureScheduleCard day="today" />
          <LectureScheduleCard day="today" />
          <LectureScheduleCard day="today" />
        </TabsContent>

        <TabsContent value="tomorrow" className="flex flex-col gap-6 p-3">
          <LectureScheduleCard day="today" />
          <LectureScheduleCard day="today" />
          <LectureScheduleCard day="today" />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default LectureScheduleTab;
