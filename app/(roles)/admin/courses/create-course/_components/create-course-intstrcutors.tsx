"use client";
import React, { useState } from "react";

import InstructorsCards from "@/components/instructors-cards";
import AddInstructorButton from "../../_components/add-instructor-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DummyInstructors } from "@/lib/types/types";
import { useCreateCourseStore } from "@/store/use-create-course-store";

const CreateCourseInstructors = () => {
  const { instructors, setInstructors } = useCreateCourseStore();

  return (
    <Card className="px-5 mt-7 w-full h-auto py-3">
      <CardContent className="p-2 w-full">
        {instructors.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md py-8">
            <div className="text-center text-gray-500">
              <p>No instructors added yet</p>
            </div>
          </div>
        ) : (
          <div key={instructors.length}>
            <InstructorsCards
              instructors={instructors}
              label="Course"
              mode="view"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <AddInstructorButton
          setInstructor={(newInstructor) => {
            // Use object for single instructor, array updater for array
            if (typeof newInstructor === "function") {
              setInstructors(newInstructor);
            } else {
              setInstructors((prev:DummyInstructors[]) => [...prev, newInstructor]);
            }
            console.log("Instructor added:", newInstructor);
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default CreateCourseInstructors;
