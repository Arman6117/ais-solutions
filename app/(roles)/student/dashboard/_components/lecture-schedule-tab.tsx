import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MeetingProp } from "./lecture-schedule";
import { isToday, isTomorrow, parseISO } from "date-fns";
import LectureScheduleCard from "./lecture-schedule-card";

const LectureScheduleTab = ({ meetings }: MeetingProp) => {
  // Filter today's meetings using date-fns
  const todayMeetings = meetings.filter((meeting) => {
    const meetingDate = parseISO(meeting.date);
    return isToday(meetingDate);
  });

  // Filter tomorrow's meetings using date-fns
  const tomorrowMeetings = meetings.filter((meeting) => {
    const meetingDate = parseISO(meeting.date);
    return isTomorrow(meetingDate);
  });



  return (
    <Tabs defaultValue="today" orientation="horizontal">
      <TabsList className="inline-flex items-center w-full justify-center rounded-full bg-muted p-1 shadow-inner">
        <TabsTrigger
          value="today"
          className="text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 font-medium transition-all duration-200 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary"
        >
          Today ({todayMeetings.length})
        </TabsTrigger>
        <TabsTrigger
          value="tomorrow"
          className="text-sm sm:text-base px-6 py-2 sm:px-8 sm:py-3 font-medium transition-all duration-200 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary"
        >
          Tomorrow ({tomorrowMeetings.length})
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[500px] no-scrollbar overflow-x-hidden flex gap-6 pr-2 flex-col w-auto">
        <TabsContent value="today" className="flex gap-6 p-3 flex-col">
          {todayMeetings.length > 0 ? (
            todayMeetings.map((meeting, index) => (
              <LectureScheduleCard key={index} meeting={meeting} />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No lectures scheduled for today
            </div>
          )}
        </TabsContent>

        <TabsContent value="tomorrow" className="flex flex-col gap-6 p-3">
          {tomorrowMeetings.length > 0 ? (
            tomorrowMeetings.map((meeting, index) => (
              <LectureScheduleCard key={index} meeting={meeting} />
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No lectures scheduled for tomorrow
            </div>
          )}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default LectureScheduleTab;