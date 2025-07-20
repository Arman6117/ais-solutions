"use client";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";


import InstructorsCards from "@/components/instructors-cards";
import AddInstructorButton from "../../../courses/_components/add-instructor-button";




export default function CreateBatch() {
  const [instructors, setInstructors] = useState<any[]>([]);
  const [modules, setModules] = useState([]);

   

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Create Batch</h1>
        <p className="text-gray-500">
          Create a new batch with all necessary details
        </p>
      </div>

      <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-6">
      
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Batch Details</CardTitle>
              <CardDescription>
                Fill in the basic information about the batch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Batch Name</Label>
                <Input id="name" placeholder="Enter batch name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter batch description"
                  className="min-h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <div className="relative">
                    <Input id="start-date" type="date" />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <div className="relative">
                    <Input id="end-date" type="date" />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center">
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    Upcoming
                  </Badge>
                </div>
              </div>

              {/* Instructors Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructors</CardTitle>
                  <CardDescription>
                    Add instructors to this batch
                  </CardDescription>
                </CardHeader>
                <CardContent className="min-h-40">
                  {instructors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md py-8">
                      <div className="text-center text-gray-500">
                        <p>No instructors added yet</p>
                      </div>
                    </div>
                  ) : (
                    // Force remount with key to ensure refresh when array changes
                    <div key={instructors.length}>
                      <InstructorsCards
                        instructors={instructors}
                        label="Batch"
                        mode="create"
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
                        setInstructors((prev) => [...prev, newInstructor]);
                      }
                      console.log("Instructor added:", newInstructor);
                    }}
                  />
                </CardFooter>
              </Card>
            </CardContent>
          </Card>

          
        </div>

        {/* Sidebar with Modules */}
        <div className="lg:col-span-1 space-y-6">
          {/* Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Modules</CardTitle>
              <CardDescription>Add modules to this batch</CardDescription>
            </CardHeader>
            <CardContent className="min-h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-md">
              {modules.length === 0 ? (
                <div className="text-center text-gray-500">
                  <p>No modules added yet</p>
                </div>
              ) : (
                <div>{/* Module list would go here */}</div>
              )}
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary-bg">Add Modules</Button>
            </CardFooter>
          </Card>

          {/* Create Batch Button */}
          <Button className="w-full bg-primary-bg" size="lg">
            Create Batch
          </Button>
        </div>
      </div>
    </div>
  );
}
