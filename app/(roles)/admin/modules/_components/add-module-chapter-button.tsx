import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

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
  return <Dialog>AddModuleChapterButton</Dialog>;
};

export default AddModuleChapterButton;
