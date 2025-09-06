import React from "react";
import { User } from "lucide-react";
import StatsCard from "../_components/stats-card";
import UpcomingSessions from "../_components/upcoming-sessions";
import InstructorInfoCard from "../_components/instructor-info-card";
import BatchGrid from "../_components/batch-grid";
import ModuleCard from "../_components/module-card";

// Mock data
const instructorData = {
  id: 1,
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@academy.com",
  phone: "+1 (555) 123-4567",
  joinDate: "2022-03-15",
  profileBadge: "Senior Instructor",
  avatar: null,
  stats: {
    totalStudents: 284,
    averageFeedback: 4.8,
    totalSessions: 152,
    completionRate: 94,
  },
};

const assignedModules: {
  id: number;
  name: string;
  totalBatches: number;
  totalStudents: number;
  progress: number;
  color: "blue" | "emerald" | "orange";
}[] = [
  {
    id: 1,
    name: "Advanced React Development",
    totalBatches: 4,
    totalStudents: 89,
    progress: 75,
    color: "blue",
  },
  {
    id: 2,
    name: "JavaScript Fundamentals",
    totalBatches: 6,
    totalStudents: 142,
    progress: 92,
    color: "emerald",
  },
  {
    id: 3,
    name: "Node.js Backend Development",
    totalBatches: 3,
    totalStudents: 53,
    progress: 68,
    color: "orange",
  },
];

const assignedBatches: {
  id: number;
  name: string;
  courseName: string;
  mode: "online" | "offline" | "hybrid";
  studentsCount: number;
  startDate: string;
  endDate: string;
}[] = [
  {
    id: 1,
    name: "React Batch 2024-A",
    courseName: "Advanced React Development",
    mode: "online",
    studentsCount: 24,
    startDate: "2024-01-15",
    endDate: "2024-04-15",
  },
  {
    id: 2,
    name: "JS Fundamentals Batch-12",
    courseName: "JavaScript Fundamentals",
    mode: "hybrid",
    studentsCount: 32,
    startDate: "2024-02-01",
    endDate: "2024-05-01",
  },
  {
    id: 3,
    name: "Node.js Backend-08",
    courseName: "Node.js Backend Development",
    mode: "offline",
    studentsCount: 18,
    startDate: "2024-03-01",
    endDate: "2024-06-01",
  },
  {
    id: 4,
    name: "React Advanced-15",
    courseName: "Advanced React Development",
    mode: "online",
    studentsCount: 28,
    startDate: "2024-02-15",
    endDate: "2024-05-15",
  },
];

const upcomingSessions: {
  id: number;
  title: string;
  batchName: string;
  date: string;
  time: string;
  mode: "online" | "offline" | "hybrid";
}[] = [
  {
    id: 1,
    title: "React Hooks Deep Dive",
    batchName: "React Batch 2024-A",
    date: "2024-07-05",
    time: "10:00 AM",
    mode: "online",
  },
  {
    id: 2,
    title: "Async/Await in JavaScript",
    batchName: "JS Fundamentals Batch-12",
    date: "2024-07-06",
    time: "2:00 PM",
    mode: "hybrid",
  },
  {
    id: 3,
    title: "Express.js Middleware",
    batchName: "Node.js Backend-08",
    date: "2024-07-07",
    time: "11:00 AM",
    mode: "offline",
  },
];

// Main Component
const InstructorDetailsPage = () => {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br w-full ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Instructor Details
          </h1>
        </div>
       
      </div>

      <div className="flex flex-col gap-6">
        <InstructorInfoCard instructor={instructorData} />
        <StatsCard stats={instructorData.stats} />

        <ModuleCard modules={assignedModules} />
        <UpcomingSessions sessions={upcomingSessions} />

        <BatchGrid batches={assignedBatches} />
      </div>
    </div>
  );
};

export default InstructorDetailsPage;
