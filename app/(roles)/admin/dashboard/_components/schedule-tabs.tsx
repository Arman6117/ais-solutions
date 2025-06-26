"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { sampleMeetings } from "@/lib/static";

import { isSameDay } from "date-fns";
import { Calendar } from "lucide-react";
import { MeetingCard } from "./meeting-card";
import ScheduleCalender from "./schedule-calender";
import Autoplay from "embla-carousel-autoplay";

const ScheduleTabs = () => {
  const today = new Date();

  const meetingsToday = sampleMeetings.filter((m) =>
    isSameDay(m.date, today)
  );

  const meetingsTomorrow = sampleMeetings.filter((m) =>
    isSameDay(m.date, new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1))
  );

  return (
    <Tabs defaultValue="today" className="sm:w-full mt-4">
      <TabsList className="mb-4">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>

      <TabsContent value="today">
        {meetingsToday.length > 0 ? (
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 2500 })]}
            className="sm:w-full sm:max-w-5xl"
          >
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
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 2500 })]}
            className="w-full sm:max-w-5xl "
          >
            <CarouselContent className="w-full">
              {meetingsTomorrow.map((meeting, i) => (
                <CarouselItem key={i}  className="w-full">
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
        <ScheduleCalender />
      </TabsContent>
    </Tabs>
  );
};

export default ScheduleTabs;
