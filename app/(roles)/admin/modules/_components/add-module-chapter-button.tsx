"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

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
type AddModuleChapterButtonProps = {
  chapter: Chapter[];
  setChapter: (chapter: Chapter[]) => void;
};
const AddModuleChapterButton = ({
  chapter,
  setChapter,
}: AddModuleChapterButtonProps) => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newChap = { id: Date.now(), name, description, topics: [] };
    setChapter([...(chapter || []), { ...newChap }]);
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={()=> setOpen(true)}>
        <Button className="bg-white  text-black hover:text-white cursor-pointer">
          Add Chapter
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogHeader className="bg-primary-bg rounded-lg p-5 text-white">
          <DialogTitle>Add a new chapter to the module</DialogTitle>
        </DialogHeader>
        <form className="p-5 flex flex-col gap-7" onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="h-6 w-2 rounded-full bg-primary-bg"></div>
              <span className="text-lg font-medium">Name</span>
            </div>
            <Input
              className="max-w-full ml-4 focus-visible:ring-0"
              required
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="h-6 w-2 rounded-full bg-primary-bg"></div>
              <span className="text-lg font-medium">Description</span>
            </div>
            <Textarea
              className="max-w-full ml-4 focus-visible:ring-0"
              required
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-6">
            <Button
              className="bg-primary-bg cursor-pointer"
              type="submit"
              onClick={() => setOpen(false)}
            >
              Submit
            </Button>
            <DialogClose asChild>
              <Button variant={"ghost"} className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleChapterButton;
