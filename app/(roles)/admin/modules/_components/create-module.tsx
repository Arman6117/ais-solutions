"use client";

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
import React, { useState } from "react";
import ModuleChapters from "./module-chapters";
import AddModuleChapterButton from "./add-module-chapter-button";
import { Button } from "@/components/ui/button";
import { createModule } from "@/actions/admin/modules/create-module";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ContentTopic = {
  id: number;
  title: string;
  description: string;
};

type Chapter = {
  id: number;
  name: string;
  description: string;
  topics: ContentTopic[];
};

const CreateModule = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [name, setName] = useState("");
  const [syllabusLabel, setSyllabusLabel] = useState(  "" );
  const [syllabusLink, setSyllabusLink] = useState( "");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const router = useRouter();

  const handleSubmit = async () => {

    try {
      const res = await createModule({
        name,
        description,
        price,
        discount,
        chapters: chapters.map((chap) => ({
          id:chap.id,
          name: chap.name,
          description: chap.description,
          topics: chap.topics.map((t) => ({
            id: t.id,
            title: t.title,
            description: t.description,
          })),
        })),
      });

      if (res.success) {
        toast.success("Module created successfully!");
        router.push("/admin/modules");
      } else {
        console.log(res)
      }
    } catch (err) {
      console.error(err );
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Create a Module</h1>
        <p className="text-gray-500">
          Create a new module with all necessary details
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Module Details</CardTitle>
              <CardDescription>
                Fill in the basic information about the module
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <Label htmlFor="name">Module Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter module name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter module description"
                    className="min-h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex w-full gap-10 mt-5">
                <div className="space-y-2">
                  <Label htmlFor="linkLabel">Syllabus file name</Label>
                  <Input
                    id="linkLabel"
                    placeholder="Enter module name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                    </div>
                <div className="space-y-2">
                  <Label htmlFor="linkLabel">Syllabus file name</Label>
                  <Input
                    id="linkLabel"
                    placeholder="Enter module name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                </div>

                <div className="flex w-full gap-10 mt-5">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      placeholder="Enter module price"
                      type="number"
                      className="w-64"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(+e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount</Label>
                    <div className="relative w-full">
                      <Input
                        type="number"
                        placeholder="Enter Discount in %"
                        className="font-medium pr-8 w-64"
                        max={100}
                        min={0}
                        value={discount}
                        onChange={(e) => setDiscount(+e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <Card>
                  <CardHeader className="flex justify-between">
                    <div>
                      <CardTitle>Module Chapters</CardTitle>
                      <CardDescription>
                        Sub topics of the module
                      </CardDescription>
                    </div>
                    <AddModuleChapterButton
                      chapter={chapters}
                      setChapter={setChapters}
                    />
                  </CardHeader>
                  <CardContent>
                    <ModuleChapters
                      chapter={chapters}
                      mode="create"
                      setChapter={setChapters}
                    />
                  </CardContent>
                </Card>

                <CardFooter className="float-right flex gap-7 mt-5">
                  <Button type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button variant="ghost" type="button">
                    Cancel
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateModule;
