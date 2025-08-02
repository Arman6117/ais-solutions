"use client";
import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

import {  Modules, prModule } from "@/lib/types/types";
import { getModuleById } from "@/actions/admin/modules/get-modules";
type Props = {
  data: Modules[];
};

const SelectedModulesAccordion = ({ data }: Props) => {
  if (data.length === 0) return null;
  const [modules, setModules] = useState<prModule[]>([]);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const results = await Promise.all(
          data.map(async (m) => {
            const res = await getModuleById(m._id);
            return res.success ? res.data : null;
          })
        );
        setModules(results.filter((mod): mod is prModule => mod != null));
      } catch (error) {
        console.log("Failed to fetch modules: ", error);
      }
    };

    if (data.length > 0) {
      fetchModule();
    }
  }, [data]);
  return (
    <Accordion type="multiple" className="w-full">
      {modules.map((module) => (
        <AccordionItem value={module._id.toString()} key={module._id}>
          <AccordionTrigger className="text-lg font-medium">
            {module.name}
          </AccordionTrigger>
          <AccordionContent>
            <Card className="mb-3 bg-muted/30 border">
              <CardContent className="p-4 flex flex-col gap-2">
                <p className="text-sm text-gray-700">
                  <strong>Description:</strong> {module.description}
                </p>
                <div className="mt-2">
                  <p className="font-semibold mb-1">Chapters:</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {module.chapters.map((chap) => (
                      <li key={chap.id}>{chap.name}</li>
                    ))}
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
