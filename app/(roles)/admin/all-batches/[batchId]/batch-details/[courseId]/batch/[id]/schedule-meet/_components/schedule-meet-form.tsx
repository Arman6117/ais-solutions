"use client";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

import { format } from "date-fns";

import {
  BookCheck,
  CalendarClock,
  Clock,
  Link,
  PackageCheckIcon,
  Text,
} from "lucide-react";
import { PiChalkboardTeacher } from "react-icons/pi";


export const modulesWithSubtopics = [
  {
    id: "react-basics",
    name: "React Basics",
    subtopics: ["JSX & Components", "Props & State", "Hooks", "Routing"],
  },
  {
    id: "node-auth",
    name: "Node.js Auth",
    subtopics: ["JWT", "Session", "OAuth", "Rate Limiting"],
  },
  {
    id: "mongodb-crud",
    name: "MongoDB CRUD",
    subtopics: ["Insert", "Find", "Update", "Delete"],
  },
];

export default function ScheduleMeetingForm() {
  const [meetingName, setMeetingName] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [instructor, setInstructor] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("");

  const instructors = ["John Doe", "Jane Smith", "Prajyot Patil"];

  const selectedModule = modulesWithSubtopics.find(
    (m) => m.id === selectedModuleId
  );

  const toggleSubtopic = (sub: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleSubmit = () => {
    const payload = {
      meetingName,
      meetingLink,
      module: selectedModule?.name || "",
      subtopics: selectedSubtopics,
      instructor,
      date: format(date as Date, "yyyy-MM-dd"),
      time,
    };
    console.log("🚀 Scheduling Meeting:", payload);
    // Send to backend here
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-5">
      <CardHeader>
        <CardTitle className="text-2xl">Schedule a Meeting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-3 justify-center">
          <Label className="text-lg flex gap-2 items-center">
            <Text />
            Meeting Name
          </Label>
          <Input
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
            placeholder="Enter meeting name"
            className="focus  ml-6 w-64  sm:w-96 relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
          />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <Label className="text-lg flex gap-2 items-center">
            <Link />
            Meeting Name
          </Label>
          <Input
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="Enter meeting link"
            className="focus ml-6 w-64  sm:w-96 relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
          />
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <Label className="text-lg flex gap-2 items-center">
            <PackageCheckIcon />
            Select Module
          </Label>
          <Select
            onValueChange={(val) => {
              setSelectedModuleId(val);
              setSelectedSubtopics([]); // Reset subtopics when module changes
            }}
          >
            <SelectTrigger className="ml-6">
              <SelectValue placeholder="Choose a module" />
            </SelectTrigger>
            <SelectContent>
              {modulesWithSubtopics.map((mod) => (
                <SelectItem key={mod.id} value={mod.id}>
                  {mod.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedModule && (
          <div className="flex flex-col gap-3 justify-center">
            <Label className="text-lg flex gap-2 items-center">
              <BookCheck />
              Select Subtopics
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {selectedModule.subtopics.map((sub) => (
                <Label key={sub} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedSubtopics.includes(sub)}
                    onCheckedChange={() => toggleSubtopic(sub)}
                  />
                  {sub}
                </Label>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 justify-center">
          <Label className="text-lg flex gap-2 items-center">
            <PiChalkboardTeacher />
            Instructor
          </Label>
          <Select onValueChange={setInstructor}>
            <SelectTrigger className="ml-6">
              <SelectValue placeholder="Choose an instructor" />
            </SelectTrigger>
            <SelectContent>
              {instructors.map((inst) => (
                <SelectItem key={inst} value={inst}>
                  {inst}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-lg flex gap-2 items-center">
              <CalendarClock />
              Select Date
            </Label>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
          <div className="flex flex-col gap-3 justify-center">
            <Label className="text-lg flex gap-2 items-center">
              <Clock />
              Time (HH:MM)
            </Label>
            <Input
              type="time"
              className="ml-6"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={handleSubmit} className="ml-auto bg-primary-bg">
          Schedule
        </Button>
      </CardFooter>
    </Card>
  );
}
