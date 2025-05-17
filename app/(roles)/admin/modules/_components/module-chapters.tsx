import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { AlignLeft, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import ModuleChapterTopics from "./module-chapter-topics";
import AddModuleChapterButton from "./add-module-chapter-button";

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

type ModuleChaptersProps = {
  chapter: Chapter[];
  setChapter: (chapter: Chapter[]) => void;
  mode: "view" | "edit";
};

const ModuleChapters = ({ mode, chapter, setChapter }: ModuleChaptersProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-between px-3 py-5 rounded-lg bg-primary-bg text-white">
        <div className="flex w-full flex-col ">
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <div className="w-1 h-6 bg-white rounded-full mr-2"></div>
            <Video className="mr-2" size={26} />
            Chapters
          </h1>
          <p className="text-sm text-neutral-300">Sub-topics of the module</p>
        </div>
        {mode === "edit" && (
          <AddModuleChapterButton chapter={chapter} setChapter={setChapter} />
        )}
      </div>

      {chapter?.map((chap) => (
        <Accordion type="single" className="px-2" collapsible key={chap.id}>
          <AccordionItem value={chap.name}>
            <AccordionTrigger className="text-xl font-medium">
              <div className="flex items-center gap-2">
                {chap.name}
                <div className="flex gap-2">
                  <Badge className="bg-primary-bg/20 text-primary-bg">
                    {chap.topics?.length || 0}{" "}
                    {chap.topics?.length === 1 ? "topic" : "topics"}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t px-2 py-4">
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <AlignLeft className="text-primary-bg" />
                    <span className="text-lg font-semibold">Description</span>
                  </div>
                  <p className="ml-8 font-medium">{chap.description}</p>
                </div>

                {/* <div className="flex flex-col gap-4">
                  <Tabs defaultValue="lectures" className="w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <TabsList className="bg-gray-100">
                        <TabsTrigger
                          value="lectures"
                          className="data-[state=active]:bg-primary-bg data-[state=active]:text-white"
                        >
                          <Video className="mr-2 h-4 w-4" />
                          Lectures
                        </TabsTrigger>
                        <TabsTrigger
                          value="notes"
                          className="data-[state=active]:bg-primary-bg data-[state=active]:text-white"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Notes
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="lectures" className="mt-0">
                      <div className="flex flex-col gap-4">
                        <ModuleChapterVideoLinks chapter={chap} mode={mode} />
                      </div>
                    </TabsContent>

                    <TabsContent value="notes" className="mt-0">
                      <div className="flex flex-col gap-4">
                        <ModuleChapterNotesFiles mode={mode} chap={chap} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div> */}
                <div className="">
                  <ModuleChapterTopics mode={mode} topics={chap.topics} />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* <Separator className="my-1" /> */}
        </Accordion>
      ))}

      {(!chapter || chapter.length === 0) && (
        <div className="text-center py-8 border border-dashed rounded-lg text-gray-500">
          No chapters available for this module
        </div>
      )}
    </div>
  );
};

export default ModuleChapters;
