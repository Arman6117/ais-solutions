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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleChapterVideoLinks from "./module-chapter-video-links";

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

type Chapter = {
  id: number;
  name: string;
  description: string;
  videoLinks: VideoLink[];
  files?: NoteFile[];
};

type ModuleChaptersProps = {
  chapter?: Chapter[];
  mode: "view" | "edit";
};

const ModuleChapters = ({ mode, chapter }: ModuleChaptersProps) => {
  const handleFileChange = (fileId: string) => {
    console.log(`Changing file with ID: ${fileId}`);
  };

  const handleFileDelete = (fileId: string) => {
    console.log(`Deleting file with ID: ${fileId}`);
  };

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
                <div className="flex gap-2">
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

                <div className="flex flex-col gap-4">
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
                        <div className="flex items-center gap-2">
                          <FileText className="text-primary-bg" />
                          <span className="text-lg font-semibold">
                            Lecture Notes
                          </span>
                        </div>

                        <div className="ml-8">
                          {chap.files && chap.files.length > 0 ? (
                            <div className="border rounded-lg overflow-hidden">
                              <div className="grid grid-cols-12 bg-gray-50 p-3 border-b font-medium text-gray-600">
                                <div className="col-span-7 flex items-center">
                                  File Name
                                </div>
                                <div className="col-span-2">Size</div>
                                <div className="col-span-3">Actions</div>
                              </div>

                              {chap.files.map((file, index) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-12 p-3 border-b last:border-b-0 hover:bg-gray-50"
                                >
                                  <div className="col-span-7 flex items-center">
                                    <File className="mr-2 h-4 w-4 text-gray-500" />
                                    <span className="font-medium truncate">
                                      {file.fileName}
                                    </span>
                                  </div>
                                  <div className="col-span-2 flex items-center text-sm text-gray-500">
                                    {file.fileSize || "-"}
                                  </div>
                                  <div className="col-span-3 flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 rounded-full text-blue-600 hover:bg-blue-50"
                                      onClick={() =>
                                        window.open(file.downloadUrl, "_blank")
                                      }
                                      title="Download"
                                    >
                                      <Download size={16} />
                                    </Button>

                                    {mode === "edit" && (
                                      <>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 rounded-full hover:bg-primary-bg hover:text-white"
                                          title="Change File"
                                          onClick={() =>
                                            handleFileChange(file.id)
                                          }
                                        >
                                          <PencilIcon size={16} />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 rounded-full hover:bg-red-500 hover:text-white"
                                          title="Remove File"
                                          onClick={() =>
                                            handleFileDelete(file.id)
                                          }
                                        >
                                          <Trash2Icon size={16} />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-6 border border-dashed rounded-lg text-gray-500">
                              No notes available for this chapter
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <Separator className="my-1" />
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
