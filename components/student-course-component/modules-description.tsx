import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BookOpen, Download, PlayCircle } from "lucide-react";
import React from "react";

type Module = {
  name: string;
  price: number;
};
type ModulesDescriptionProps = {
  modules: Module[];
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
                    <BookOpen />4 Chapters
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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. A
                    itaque repudiandae cumque at, cum, quibusdam corrupti
                    voluptatibus distinctio quis accusantium dignissimos maxime
                    tempore aliquid, laborum velit dolore? Tempore, ipsum
                    quaerat.
                  </p>
                </div>
                <div className="flex gap-3 items-center mt-4">
                  <h3 className="text-[16px]  font-medium">
                    Download Module Syllabus
                  </h3>
                  <Button
                    className="bg-primary-bg rounded-full cursor-pointer"
                    size={"sm"}
                  >
                    <Download />
                  </Button>
                </div>
                <div className="flex flex-col mt-5 gap-4">
                  <h3 className="text-[16px] font-medium">
                    Module Content (4 Chapter)
                  </h3>

                  <div className="flex  items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {1}
                      </div>
                      <span className="font-medium">Chapter title</span>
                    </div>
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
