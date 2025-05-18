"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
type ContentTopic = {
  id: number;
  title: string;
  description: string;
};

type AddModuleChapterTopicButtonProps = {
  topics:ContentTopic[]
  setChapTopics: (newTopic: ContentTopic[]) => void;
  chapterId: number;
  addTopicToChapter: (chapterId: number, newTopic: ContentTopic) => void;
};
const AddModuleChapterTopicButton = ({
  addTopicToChapter,
  chapterId,
  topics,
  setChapTopics
}: AddModuleChapterTopicButtonProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create new topic with a unique ID
    const newTopic = {
      id: Date.now(),
      title,
      description,
    };

    // Add the topic directly to the parent's state
    addTopicToChapter(chapterId, newTopic);
    setChapTopics([...( topics|| []), { ...newTopic }]);

    // Reset form fields
    setTitle("");
    setDescription("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mt-2 border-dashed border-green-600 text-green-600 hover:bg-green-50"
        >
          + Add New Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-none">
        <DialogHeader className="bg-green-600 p-6 text-white font-medium rounded-lg">
          <DialogTitle>Add a new topic to chapter</DialogTitle>
        </DialogHeader>
        <form className=" h-full bg-white p-5 rounded-lg" onSubmit={onSubmit}>
          <div className="flex flex-col gap-7 ">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center ">
                <div className="w-1.5 h-6 rounded-full bg-green-300" />
                <span className="text-lg font-medium">Title</span>
              </div>
              <Input
                required
                placeholder="Title of the topic.."
                className="focus-visible:ring-0 ml-4 max-w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center ">
                <div className="w-1.5 h-6 rounded-full bg-green-300" />
                <span className="text-lg font-medium">Description</span>
              </div>
              <Textarea
                required
                placeholder="Title of the topic.."
                className="focus-visible:ring-0 ml-4 max-w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button className="bg-emerald-500 cursor-pointer" type="submit">
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

export default AddModuleChapterTopicButton;
