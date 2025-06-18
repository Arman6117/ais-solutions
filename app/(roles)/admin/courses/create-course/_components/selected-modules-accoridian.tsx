"use client";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

import { DummyModules } from "@/lib/types";

type Props = {
  modules: DummyModules[];
};

const SelectedModulesAccordion = ({ modules }: Props) => {
  if (modules.length === 0) return null;

  return (
    <Accordion type="multiple" className="w-full">
      {modules.map((module) => (
        <AccordionItem value={module.id.toString()} key={module.id}>
          <AccordionTrigger className="text-lg font-medium">
            {module.name}
          </AccordionTrigger>
          <AccordionContent>
            <Card className="mb-3 bg-muted/30 border">
              <CardContent className="p-4 flex flex-col gap-2">
                <p className="text-sm text-gray-700">
                  <strong>Description:</strong> This is a sample description for the module "{module.name}" which introduces the main concepts and structure of the course content.
                </p>
                <div className="mt-2">
                  <p className="font-semibold mb-1">Chapters:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>Introduction to the Module</li>
                    <li>Core Concepts and Practice</li>
                    <li>Hands-on Projects</li>
                    <li>Final Review and Assessment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SelectedModulesAccordion;
