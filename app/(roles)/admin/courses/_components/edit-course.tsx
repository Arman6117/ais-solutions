"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import {
  PencilIcon,
  Calendar,
  Clock,
  Users,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type EditCourseProps = {
  course: Course | undefined;
};

const dummyInstructors = [
  {
    id: 1,
    name: "John Doe",
    role: "Lead Instructor",
    avatar: "https://placehold.co/32x32.png",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Assistant Instructor",
    avatar: "/api/placeholder/32/32",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Robert Johnson",
    role: "Teaching Assistant",
    avatar: "/api/placeholder/32/32",
    email: "robert@example.com",
  },
];

const dummyBatches = [
  {
    id: 1,
    name: "Morning Batch",
    schedule: "Mon-Wed-Fri",
    time: "9:00 AM - 11:00 AM",
    students: 25,
    startDate: "May 15, 2025",
  },
  {
    id: 2,
    name: "Evening Batch",
    schedule: "Tue-Thu",
    time: "6:00 PM - 8:30 PM",
    students: 18,
    startDate: "June 1, 2025",
  },
  {
    id: 3,
    name: "Weekend Batch",
    schedule: "Sat-Sun",
    time: "10:00 AM - 2:00 PM",
    students: 22,
    startDate: "May 20, 2025",
  },
];

const EditCourse = ({ course }: EditCourseProps) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [instructors, setInstructors] = useState(dummyInstructors);
  const [batches, setBatches] = useState(dummyBatches);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (course) {
      setName(course.name || "");
      setDescription(course.description || "");
      setPrice(course.price || 0);
      setDiscount(course.discount || 0);
      setOfferPrice(price - (price * Number(course.discount)) / 100 || 0)
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [course]);

  if (!course) {
    return <div className="p-8 text-lg">No course selected.</div>;
  }

  const handleSave = () => {
    // Handle saving logic here
    console.log({ name, description, price, instructors, batches });
    toast.success("Changes saved successfully!");
  };

  const removeInstructor = (id: number) => {
    setInstructors(instructors.filter((instructor) => instructor.id !== id));
    toast.success("Instructor removed");
  };

  const removeBatch = (id: number) => {
    setBatches(batches.filter((batch) => batch.id !== id));
    toast.success("Batch removed");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-1">
      <div className="w-full lg:w-2/3 flex-grow">
        <div className="p-4 lg:p-8 space-y-6 bg-white rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Edit Course</h1>
            <p className="text-muted-foreground">
              Edit the course details. You can update name, description, price,
              and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">Name</Label>
              <Input
                placeholder="Enter Course Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base font-medium">Price</Label>
              <Input
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="font-medium"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-base font-medium">Discount</Label>
              <Input
                placeholder="Enter Discount in %"
                value={discount}
                onChange={(e) => {
                  setDiscount(Number(e.target.value));
                  setOfferPrice(price - (price * Number(e.target.value)) / 100);
                }}
                className="font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-base font-medium">Offer Price</Label>
              <Input
                type="number"
                readOnly
                placeholder="Offer Price"
                value={offerPrice}
                className="font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Description</Label>
            <Textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="font-medium min-h-[150px]"
            />
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Instructors</h2>
              <Button
                size="sm"
                
                className="flex items-center gap-1 cursor-pointer bg-primary-bg"

              >
                <Plus size={16} /> Add Instructor
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {instructors.map((instructor) => (
                <Card key={instructor.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={instructor.avatar}
                          alt={instructor.name}
                        />
                        <AvatarFallback>
                          {instructor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{instructor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {instructor.email}
                        </p>
                        <Badge variant="outline" className="mt-1">
                          {instructor.role}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        className=" h-8 w-8 p-0 cursor-pointer"
                        onClick={() => removeInstructor(instructor.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Batches</h2>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
              >
                <Plus size={16} /> Add Batch
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {batches.map((batch) => (
                <Card key={batch.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{batch.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            <span>{batch.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock size={14} />
                            <span>{batch.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar size={14} />
                            <span>Starts: {batch.startDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users size={14} />
                            <span>{batch.students} Students</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:self-start">
                        <Button size="sm" variant="outline" className="h-8 cursor-pointer">
                          <PencilIcon size={14} className="mr-1 cursor-pointer" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                           className=" h-8 w-8 p-0 cursor-pointer"
                          onClick={() => removeBatch(batch.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              className=" hover:bg-primary-bg/90 bg-primary-bg cursor-pointer"
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              variant="destructive"
              className="hover:bg-red-700"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Thumbnail</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Course Thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <Button
              className="w-full flex items-center bg-primary-bg cursor-pointer justify-center gap-2"
              
            >
              <PencilIcon size={16} /> Edit Thumbnail
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xl">Modules</CardTitle>
            <Button
              size="sm"
              className="flex bg-primary-bg cursor-pointer  items-center gap-1"
            >
              <Plus size={16} /> Add Module
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {course.modules?.map((mod, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
              >
                <span className="text-sm font-medium">{mod}</span>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <PencilIcon size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                     className=" h-8 w-8 p-0 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0">
            {course.modules?.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No modules added yet.
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EditCourse;
