import { BookCopy, Calendar, Mail, Users } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const InstructorHoverCard = ({ instructor }: { instructor: any }) => {
  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-5">
        <div className="flex items-center gap-4">
          <Avatar className="size-20 border-4 border-white/30">
            <AvatarImage
              className="object-cover"
              src={instructor.avatar}
              alt={instructor.name}
            />
            <AvatarFallback className="bg-white/20 text-white font-medium text-xl">
              {instructor.name.charAt(0) +
                instructor.name.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">{instructor.name}</h1>
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <Mail size={14} />
              <span>{instructor.email}</span>
            </div>
            {/* <div className="flex gap-2 mt-2">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                {instructor.role || "Instructor"}
              </Badge>
              {instructor.isLead && (
                <Badge className="bg-amber-500/80 hover:bg-amber-500/90 text-white border-none">
                  Lead
                </Badge>
              )}
            </div> */}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <BookCopy size={18} className="text-violet-600" />
            <h3>Teaching Modules</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Introduction to React",
              "Advanced React Patterns",
              "State Management",
              "React Performance",
            ].map((module, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-violet-50 text-violet-700 border-violet-200 py-1 px-2 justify-center"
              >
                {module}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Calendar size={18} className="text-violet-600" />
            <h3>Active Batches</h3>
          </div>
          <div className="space-y-2">
            {[
              {
                name: "Morning Batch",
                students: 25,
                period: "May - Aug 2025",
              },
              {
                name: "Weekend Batch",
                students: 18,
                period: "Jun - Oct 2025",
              },
            ].map((batch, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-50 rounded-md p-2 text-sm"
              >
                <span className="font-medium">{batch.name}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Users size={14} />
                  <span>{batch.students} students</span>
                </div>
                <span className="text-xs text-gray-500">{batch.period}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-violet-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-violet-700">8</div>
            <div className="text-xs text-violet-600">Courses</div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-indigo-700">2</div>
            <div className="text-xs text-indigo-600">Batches</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">4.8</div>
            <div className="text-xs text-blue-600">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorHoverCard;
