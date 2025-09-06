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
import { BookOpen, Download } from "lucide-react";
import Link from "next/link";
import React from "react";

type ModulesDescriptionProps = {
  modules: CourseModule[];
  className?: string;
};
const ModulesDescription = ({
  modules,
  className,
}: ModulesDescriptionProps) => {
  return (
    <div className={cn("flex gap-5 flex-col mt-5", className)}>
      <div className="flex flex-col">
        <h1 className="text-3xl font-medium text-neutral-800">
          What you will learn
        </h1>
        <p className="text-muted-foreground text-sm">
          Explore foundational and advanced concepts across multiple modules
        </p>
      </div>
      {modules.map((m, index) => (
        <div className="flex flex-col space-y" key={index}>
          <Accordion
            type="single"
            className="px-4 border py-2 mb2 rounded-md shadow"
            collapsible
          >
            <AccordionItem value={m.name}>
              <AccordionTrigger>
                <div className="flex gap-5 items-center">
                  <h1 className="text-xl font-semibold">{m.name}</h1>
                  <Badge className="border bg-transparent text-primary-bg border-primary-bg flex gap-2 items-center">
                    <BookOpen />
                    {m.chapters.length} Chapters
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col">
                <Separator />
                <div className="flex flex-col mt-5">
                  <h3 className="text-[16px] font-medium">About this Module</h3>
                  <p
                    className={cn(
                      "text-muted-foreground max-w-[400px]",
                      className
                    )}
                  >
                    {m.description}
                  </p>
                </div>
                <div className="flex gap-3 items-center mt-4">
                  <h3 className="text-[16px]  font-medium">
                    Download Module Syllabus
                  </h3>
                  <Link href={m.syllabusLink}>
                    <Button
                      className="bg-primary-bg rounded-full cursor-pointer"
                      size={"sm"}
                    >
                      <Download />
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-col mt-5 gap-4">
                  <h3 className="text-[16px] font-medium">
                    Module Content ({m.chapters.length} Chapter)
                  </h3>

                  <div className="flex  items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border">
                    {m.chapters.map((chapter, index) => (
                      <Accordion
                        type="single"
                        className="w-full py-0"
                        collapsible
                        key={index}
                      >
                        <AccordionItem value={chapter.name}>
                          <AccordionTrigger className="flex py-0 items-center  justify-between ">
                            <div className="flex items-center w-full gap-3">
                              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                {index + 1}
                              </div>
                              <h1 className="font-medium">{chapter.name}</h1>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col">
                            <p className=" ml-11 text-muted-foreground max-w-[300px]">
                              {chapter.description}
                            </p>
                            <Separator className="mt-4" />
                            {chapter.topics.length > 0 && (
                              <div className="flex flex-col gap-5">
                                {chapter.topics.map((topic, i) => (
                                  <div
                                    className="flex flex-col ml-10 mt-5  w-full g3"
                                    key={i}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                                        {index + 1}
                                      </div>
                                      <h1 className="font-medium">
                                        {topic.title}
                                      </h1>
                                    </div>
                                    <p className=" ml-11 text-muted-foreground max-w-[300px]">
                                      {topic.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default ModulesDescription;
