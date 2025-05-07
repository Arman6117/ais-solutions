"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mail, Pencil, Plus, Trash2, Users } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import InstructorHoverCard from "../app/(roles)/admin/courses/_components/instructor-hover-card";
import EditInstructorDialog from "../app/(roles)/admin/courses/_components/edit-instructor-dialog";
import AddInstructorButton from "../app/(roles)/admin/courses/_components/add-instructor-button";

const InstructorsCards = ({
  instructors,
  mode,
  label
}: {
  instructors: any[];
  mode: "edit" | "view";
  label:string
}) => {
  const [open, setOpen] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [initialInstructors,setInstructors] = useState(instructors);

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Instructors</h2>
            <p className="text-sm text-gray-500">
              {initialInstructors.length} instructor{initialInstructors.length !== 1 && "s"}{" "}
           {label}
            </p>
          </div>
          {mode === "edit" && <AddInstructorButton setInstructor ={setInstructors} />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {initialInstructors.map((instructor) => (
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
                        {/* <div className="flex gap-2 mt-2">
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
                        </div> */}
                      </div>
                      {mode === "edit" && (
                        <div className="flex gap-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0  cursor-pointer absolute -top-10 right-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() =>
                              toast.success(
                                `${instructor.name} removed from course`
                              )
                            }
                          >
                            <Trash2 size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0  cursor-pointer absolute -top-10 right-10 text-gray-400 hover:text-violet-600 hover:bg-violet-50"
                            onClick={() => {
                              setOpen(true);
                              setInstructor(instructor);
                            }}
                          >
                            <Pencil size={16} />
                          </Button>
                        </div>
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
                  <InstructorHoverCard instructor={instructor} />
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </div>

        {initialInstructors.length === 0 && (
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
            <Button className="bg-violet-600 cursor-pointer hover:bg-violet-700 text-white">
              <Plus size={16} className="mr-2" /> Add Your First Instructor
            </Button>
          </div>
        )}
      </div>

      <EditInstructorDialog
        open={open}
        onClose={() => setOpen(false)}
        instructor={instructor}
      />
    </>
  );
};

export default InstructorsCards;
