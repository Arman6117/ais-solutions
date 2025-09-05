import { getAllModulesNames } from "@/actions/admin/modules/get-modules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CourseModule } from "@/lib/types/course.type";
import { cn } from "@/lib/utils";
import { BookOpen, Download, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AddModuleButton from "../add-module-button";
import { addModulesToCourse } from "@/actions/admin/course/add-modules-course";

// --- Component Props ---
type CourseModulesProps = {
  initialModules: CourseModule[];
  courseId: string;
  mode: "view" | "edit";
  className?: string;
};

const CourseModules = ({
  initialModules,
  courseId,
  mode,
  className,
}: CourseModulesProps) => {
  const [modules, setModules] = useState<CourseModule[]>([]);
  useEffect(() => {
    setModules(initialModules);
  
  }, [initialModules]);
 

  const [availableModules, setAvailableModules] = useState<CourseModule[]>([]);

  const fetchAvailableModules = async () => {
    try {
      const res = await getAllModulesNames(); // This should return CourseModule[]
      if (res.success && res.data) {
        const currentModuleIds = new Set(modules.map((m) => m._id));
        const filtered = res.data.filter(
          (mod) => !currentModuleIds.has(String(mod._id))
        );
        setAvailableModules(filtered);
      } else {
        setAvailableModules([]);
      }
    } catch (error) {
      console.error("Failed to fetch available modules:", error);
      toast.error("Could not load modules to add.");
    }
  };

  useEffect(() => {
    fetchAvailableModules();
  }, []);

  // --- MODIFIED LOGIC ---
  // This handler now updates the UI state optimistically.
  const handleAddModules = async (moduleIds: string[]) => {
    try {
      // Step 1: Call the server action. It should only return a success status.
      const res = await addModulesToCourse(moduleIds, courseId);

      if (!res.success) {
        toast.error(res.message || "Failed to add modules.");
        return; // Stop if the database operation failed
      }

      // Step 2: On success, update the client state manually.
      // Find the full module objects from the already-fetched `availableModules`.
      const modulesToAdd = availableModules.filter((mod) =>
        moduleIds.includes(mod._id)
      );

      // Update the state by appending the new modules.
      setModules((prevModules) => [...prevModules, ...modulesToAdd]);

      toast.success(res.message);
    } catch (error) {
      console.error("Error adding modules:", error);
      toast.error("Something went wrong while adding modules.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-5 mt-5 ", className)}>
      <div className="flex items-center p-4 rounded-md bg-primary-bg justify-between">
        <div className="flex flex-col  text-white">
          <h1 className="text-3xl font-medium ">What you will learn</h1>
          <p className=" text-sm">
            Explore foundational and advanced concepts across multiple modules
          </p>
        </div>

        <AddModuleButton
          className="bg-white hover:bg-black hover:text-white text-black"
          modules={availableModules}
          onAddModules={handleAddModules}
        />
      </div>

      {/* Renders the list of modules */}
      {modules.map((m) => (
        <div className="flex flex-col" key={m._id}>
          <Accordion
            type="single"
            className="px-4 border py-2 mb-2 rounded-md shadow-sm"
            collapsible
          >
            <AccordionItem value={m.name} className="border-b-0">
              <AccordionTrigger>
                <div className="flex justify-between w-full items-center">
                  <div className="flex gap-5 items-center">
                    <h1 className="text-xl font-semibold">{m.name}</h1>
                    <Badge
                      variant="outline"
                      className="flex gap-2 items-center"
                    >
                      <BookOpen size={16} />
                      {m.chapters.length} Chapters
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              {/* ... rest of the component remains the same ... */}
              <AccordionContent className="flex flex-col">
                <Separator />
                {/* About Module Section */}
                <div className="flex flex-col mt-5">
                  <h3 className="text-lg font-medium">About this Module</h3>
                  <p className="text-muted-foreground max-w-prose mt-1">
                    {m.description}
                  </p>
                </div>

                {/* Syllabus Download Section */}
                {m.syllabusLink && (
                  <div className="flex gap-3 items-center mt-4">
                    <h3 className="text-lg font-medium">
                      Download Module Syllabus
                    </h3>
                    <Link href={m.syllabusLink} target="_blank">
                      <Button
                        className="bg-primary-bg rounded-full cursor-pointer"
                        size={"icon"}
                      >
                        <Download size={20} />
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Module Content Section */}
                <div className="flex flex-col mt-5 gap-4">
                  <h3 className="text-lg font-medium">
                    Module Content ({m.chapters.length} Chapters)
                  </h3>
                  <div className="space-y-3">
                    {m.chapters.map((chapter, chapterIndex) => (
                      <div
                        key={chapterIndex} // Note: Prefer chapter._id if available
                        className="p-3 rounded-lg border"
                      >
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem
                            value={chapter.name}
                            className="border-b-0"
                          >
                            <AccordionTrigger className="py-1">
                              <div className="flex items-center w-full gap-3">
                                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                  {chapterIndex + 1}
                                </div>
                                <h1 className="font-medium text-left">
                                  {chapter.name}
                                </h1>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-4 pb-0">
                              <p className="ml-11 text-muted-foreground max-w-prose">
                                {chapter.description}
                              </p>
                              {chapter.topics.length > 0 && (
                                <div className="flex flex-col gap-4 ml-11 mt-4 border-l-2 pl-6">
                                  {chapter.topics.map((topic, topicIndex) => (
                                    <div key={topicIndex}>
                                      {" "}
                                      {/* Note: Prefer topic._id if available */}
                                      <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                                          {topicIndex + 1}
                                        </div>
                                        <h1 className="font-medium text-sm">
                                          {topic.title}
                                        </h1>
                                      </div>
                                      <p className="ml-9 text-muted-foreground text-sm">
                                        {topic.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}

      {modules.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No modules have been added to this course yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseModules;
