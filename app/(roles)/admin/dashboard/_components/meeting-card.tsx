"use client";


import { Button } from "@/components/ui/button";

export const MeetingCard = ({
  meeting,
  isTodayOrFuture,
}: {
  meeting: {
    course: string;
    module: string;
    batch: string;
    instructor?: string;
    chapters?: string;
    time: string;
    date: string;
  };
  isTodayOrFuture: boolean;
}) => {
  return (
    <div className="bg-white mb-2 p-3 rounded shadow-sm border border-gray-100 hover:border-violet-300 transition-colors duration-200">
      <div className="flex items-center mb-2">
        <div className="w-1 h-8 bg-violet-500 rounded-full mr-2"></div>
        <h3 className="font-bold text-gray-800">{meeting.course}</h3>
      </div>

      <div className="flex  gap-28 mt-4">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-gray-500 ">Module</p>
            <p className="font-medium">{meeting.module}</p>
          </div>
          <div >
            <p className="text-gray-500 ">Chapters</p>
            <p className="font-medium">Intro</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 ">Batch</p>
          <p className="font-medium">{meeting.batch}</p>
          <p className="text-gray-500  mt-2">Instructor</p>
          <p className="font-medium">John Doe</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500 ">Time</p>
          <p className="font-medium">{meeting.time}</p>
        </div>
      </div>

      {isTodayOrFuture && (
        <div className="flex justify-end gap-2 mt-3">
          <Button
            size="sm"
            variant="outline"
            className=" px-2 py-1 h-auto"
            onClick={() => console.log("Edit", meeting)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className=" px-2 py-1 h-auto"
            onClick={() => console.log("Delete", meeting)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
