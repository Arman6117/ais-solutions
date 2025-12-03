"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { isSameDay, parseISO, addDays } from "date-fns";
import { Calendar } from "lucide-react";
import { MeetingCard } from "./meeting-card";
import ScheduleCalender from "./schedule-calender";
import Autoplay from "embla-carousel-autoplay";
import { Session } from "@/lib/types/sessions.type";

const ScheduleTabs = ({ sessions }: { sessions: Session[] }) => {
  const today = new Date();
  const tomorrow = addDays(today, 1);

  // Helper to handle string dates safely
  const safeSameDay = (dateVal: string | Date, compareDate: Date) => {
    try {
      // If it's already a Date object, use it directly
      if (dateVal instanceof Date) {
        return isSameDay(dateVal, compareDate);
      }
      // If it's a string, parse it
      if (typeof dateVal === "string") {
        return isSameDay(parseISO(dateVal), compareDate);
      }
      return false;
    } catch (e) {
      console.log(e)
      return false;
    }
  };

  // FIX: Pass m.date directly. Do NOT call .toISOString() on it.
  // If m.date comes from JSON, it is likely already a string.
  const meetingsToday = sessions.filter((m) => safeSameDay(m.date as unknown as string, today));
  const meetingsTomorrow = sessions.filter((m) => safeSameDay(m.date as unknown as string, tomorrow));

  return (
    <Tabs defaultValue="today" className="sm:w-full bg-soft-white p-2 rounded-md shadow mt-4">
      <TabsList className="mb-4">
        <TabsTrigger value="today">Today ({meetingsToday.length})</TabsTrigger>
        <TabsTrigger value="tomorrow">Tomorrow ({meetingsTomorrow.length})</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>

      <TabsContent value="today">
        {meetingsToday.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 2500 })]} className="sm:w-full sm:max-w-5xl">
            <CarouselContent className="sm:w-full">
              {meetingsToday.map((meeting, i) => (
                <CarouselItem key={i} className="sm:w-full">
                  <MeetingCard meeting={meeting} isTodayOrFuture={true} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-8">
            <Calendar className="size-12" />
            <p>No meetings today</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="tomorrow">
        {meetingsTomorrow.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 2500 })]} className="w-full sm:max-w-5xl">
            <CarouselContent className="w-full">
              {meetingsTomorrow.map((meeting, i) => (
                <CarouselItem key={i} className="w-full">
                  <MeetingCard meeting={meeting} isTodayOrFuture={true} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-8">
            <Calendar className="size-12" />
            <p>No meetings tomorrow</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="all">
        {/* FIX: Passing the sessions prop here */}
        <ScheduleCalender sessions={sessions} />
      </TabsContent>
    </Tabs>
  );
};

export default ScheduleTabs;
