import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookCopy, Calendar, Mail, Plus, Trash2, Users } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

const CourseInstructorsCards = ({
  instructors,
  mode,
}: {
  instructors: any[];
  mode: "edit" | "view";
}) => {
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Instructors</h2>
            <p className="text-sm text-gray-500">
              {instructors.length} instructor{instructors.length !== 1 && "s"}{" "}
              assigned to this course
            </p>
          </div>
          {mode === "edit" && (
            <Button
              size="sm"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
            >
              <Plus size={16} /> Add Instructor
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {instructors.map((instructor) => (
            <HoverCard key={instructor.id}>
              <HoverCardTrigger asChild>
                <Card
                  className={cn(
                    "border border-gray-200 bg-white hover:shadow-md transition-all duration-300",
                    mode === "view" &&
                      "cursor-pointer hover:border-violet-300 hover:scale-102 hover:shadow-lg hover:shadow-violet-100"
                  )}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4 relative">
                      <Avatar className="size-16 border-2 border-violet-100">
                        <AvatarImage
                          className="object-cover"
                          src={instructor.avatar}
                          alt={instructor.name}
                        />
                        <AvatarFallback className="bg-violet-100 text-violet-600 font-medium">
                          {instructor.name.charAt(0) +
                            instructor.name.split(" ")[1]?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {instructor.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Mail size={14} className="text-gray-400" />
                          <span>{instructor.email}</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="bg-violet-50 border-violet-200 text-violet-700 font-medium"
                          >
                            {instructor.role || "Instructor"}
                          </Badge>
                          {instructor.isLead && (
                            <Badge
                              variant="outline"
                              className="bg-amber-50 border-amber-200 text-amber-700 font-medium"
                            >
                              Lead
                            </Badge>
                          )}
                        </div>
                      </div>
                      {mode === "edit" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 absolute top-0 right-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() =>
                            toast.success(
                              `${instructor.name} removed from course`
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              {mode === "view" && (
                <HoverCardContent
                  align="start"
                  className="md:w-96 w-64 max-h-96 bg-white border border-gray-200 p-0 rounded-lg shadow-lg overflow-auto no-scrollbar"
                >
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
                          <h1 className="text-xl font-bold">
                            {instructor.name}
                          </h1>
                          <div className="flex items-center gap-1 text-white/80 text-sm">
                            <Mail size={14} />
                            <span>{instructor.email}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                              {instructor.role || "Instructor"}
                            </Badge>
                            {instructor.isLead && (
                              <Badge className="bg-amber-500/80 hover:bg-amber-500/90 text-white border-none">
                                Lead
                              </Badge>
                            )}
                          </div>
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
                              <span className="text-xs text-gray-500">
                                {batch.period}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="bg-violet-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-violet-700">
                            8
                          </div>
                          <div className="text-xs text-violet-600">Courses</div>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-indigo-700">
                            2
                          </div>
                          <div className="text-xs text-indigo-600">Batches</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-blue-700">
                            4.8
                          </div>
                          <div className="text-xs text-blue-600">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </div>

        {instructors.length === 0 && (
          <div className="text-center p-10 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="flex justify-center mb-4">
              <div className="bg-violet-100 p-3 rounded-full">
                <Users size={24} className="text-violet-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No instructors yet
            </h3>
            <p className="text-gray-500 mb-4">
              No instructors have been assigned to this course yet.
            </p>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white">
              <Plus size={16} className="mr-2" /> Add Your First Instructor
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CourseInstructorsCards;
