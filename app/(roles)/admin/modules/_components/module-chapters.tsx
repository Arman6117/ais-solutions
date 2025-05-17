import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  AlignLeft,
  ExternalLink,
  PencilIcon,
  Trash2Icon,
  Video,
  FileText,
  Download,
  File,
  List,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


type VideoLink = {
  id: string;
  label: string;
  link: string;
};

type NoteFile = {
  id: string;
  fileName: string;
  fileSize?: string;
  fileType?: string;
  downloadUrl: string;
};

type ContentTopic = {
  id: number;
  title: string;
  description?: string;
};

type Chapter = {
  id: number;
  name: string;
  description: string;

  topics?: ContentTopic[];
};

type ModuleChaptersProps = {
  chapter?: Chapter[];
  mode: "view" | "edit";
};

const ModuleChapters = ({ mode, chapter }: ModuleChaptersProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full flex-col px-3 py-5 rounded-lg bg-primary-bg text-white">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <div className="w-1 h-6 bg-white rounded-full mr-2"></div>
          <Video className="mr-2" size={26} />
          Chapters
        </h1>
        <p className="text-sm text-neutral-300">Sub-topics of the module</p>
      </div>

      {chapter?.map((chap) => (
        <Accordion type="single" className="px-2" collapsible key={chap.id}>
          <AccordionItem value={chap.name}>
            <AccordionTrigger className="text-xl font-medium">
              <div className="flex items-center gap-2">
                {chap.name}
                {/* <div className="flex gap-2">
                  <Badge className="bg-primary-bg/20 text-primary-bg">
                    {chap.videoLinks?.length || 0}{" "}
                    {chap.videoLinks?.length === 1 ? "lecture" : "lectures"}
                  </Badge>
                  {chap.files && chap.files.length > 0 && (
                    <Badge className="bg-blue-100 text-blue-700">
                      {chap.files.length}{" "}
                      {chap.files.length === 1 ? "note" : "notes"}
                    </Badge>
                  )}
                </div> */}
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
                <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <List className="text-green-600" />
                          <span className="text-lg font-semibold">Content Covered</span>
                        </div>
                        
                        <div className="ml-8">
                          {chap.topics && chap.topics.length > 0 ? (
                            <div className="space-y-4">
                              {chap.topics.map((topic) => (
                                <div 
                                  key={topic.id} 
                                  className="border rounded-lg p-4 bg-green-50/50 hover:bg-green-50 transition-colors"
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-3">
                                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                                      <div>
                                        <h3 className="font-medium text-lg text-gray-900">{topic.title}</h3>
                                        {topic.description && (
                                          <p className="text-gray-600 mt-1">{topic.description}</p>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {mode === "edit" && (
                                      <div className="flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 rounded-full hover:bg-green-600 hover:text-white"
                                        >
                                          <PencilIcon size={16} />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm" 
                                          className="h-8 w-8 p-0 rounded-full hover:bg-red-500 hover:text-white"
                                        >
                                          <Trash2Icon size={16} />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                              
                              {mode === "edit" && (
                                <Button 
                                  variant="outline" 
                                  className="w-full mt-2 border-dashed border-green-600 text-green-600 hover:bg-green-50"
                                >
                                  + Add New Topic
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-6 border border-dashed rounded-lg text-gray-500">
                              {mode === "edit" ? (
                                <div className="flex flex-col items-center gap-2">
                                  <p>No topics defined for this chapter yet</p>
                                  <Button 
                                    variant="outline" 
                                    className="border-dashed border-green-600 text-green-600 hover:bg-green-50"
                                  >
                                    + Add First Topic
                                  </Button>
                                </div>
                              ) : (
                                <p>No topics available for this chapter</p>
                              )}
                            </div>
                          )}
                        </div>
                </div>
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
