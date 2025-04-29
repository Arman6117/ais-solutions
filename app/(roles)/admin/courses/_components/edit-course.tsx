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
import { PencilIcon } from "lucide-react";

type EditCourseProps = {
  course: Course | undefined;
};

const EditCourse = ({ course }: EditCourseProps) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (course) {
      setName(course.name || "");
      setDescription(course.description || "");
      setPrice(course.price || 0);
    }
  }, [course]);

  if (!course) {
    return <div className="p-8 text-lg">No course selected.</div>;
  }

  const handleSave = () => {
    // 🔥 Handle saving logic here
    console.log({ name, description, price });
    // e.g., call API to update
  };

  return (
    <>
      <div className="w-[70%]">
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold">Edit Course</h1>
          <p className="text-muted-foreground">
            Edit the course details. You can update name, description, price,
            and more.
          </p>

          <div className="flex flex-col gap-10 mt-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-lg">Name</Label>
                <Input
                  placeholder="Enter Course Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-semibold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-lg">Price</Label>
                <Input
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="font-semibold"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-lg">Description</Label>
              <Textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="font-semibold min-h-[150px]"
              />
            </div>
            <div className=""></div>
          </div>

          <div className="pt-6 flex gap-4">
            <Button
              className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
              onClick={() => toast.success("Changes saved")}
            >
              Save Changes
            </Button>
            <Button
              variant={"destructive"}
              className="cursor-pointer "
              onClick={() => toast.success("Changes saved")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/3 bg-soft-white rounded-4xl p-4">
        <div className="h-full p-3 bg-white flex flex-col gap-7 w-full rounded-4xl">
          <div>
            <h1 className="text-3xl font-bold">Thumbnail</h1>
            <div className="flex flex-col  gap-3 w-full">
              <Image
                src={"https://placehold.co/600x400.png"}
                width={600}
                height={400}
                alt="Thumbnail"
                className="rounded-4xl mt-5"
              />
              <Button
                className="flex items-center  justify-center rounded-full cursor-pointer hover:bg-primary-bg hover:text-white"
                variant={"outline"}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <div className="w-2 h-7 bg-primary-bg rounded-full"></div>
              <h1 className="font-bold text-xl">Batches : {course.batches}</h1>
            </div>

            <Button className="bg-primary-bg cursor-pointer">
              View All Batches
            </Button>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2">
              <div className="w-2 h-7 bg-primary-bg rounded-full"></div>
              <h1 className="font-bold text-xl">Students : {course.students}</h1>
            </div>

            <Button className="bg-primary-bg cursor-pointer">
              View All Students
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
