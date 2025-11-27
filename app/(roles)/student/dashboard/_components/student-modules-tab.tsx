"use client";
import React, { useEffect, useMemo, useState } from "react";
import StudentModulesCard from "./student-modules-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import ModuleCardSkeleton from "@/components/skeletons/module-card";
import { ModuleInfo } from "@/lib/types/student-dashboard.type";

export type ModuleProp = {
  module: ModuleInfo[];
};

const StudentModulesTab = ({ module }: ModuleProp) => {
  const [filteredModules, setFilteredModules] = useState<ModuleInfo[]>(module);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filtered = module.filter((mod) => {
      const searchTerm = search.toLowerCase();
      const moduleName = mod.name.toLowerCase();
      return moduleName.includes(searchTerm);
    });
    setFilteredModules(filtered);
  }, [search, module]);

  const modulesByStatus = useMemo(() => {
    return {
      ongoing: filteredModules.filter((mod) => mod.status === "Ongoing"),
      upcoming: filteredModules.filter((mod) => mod.status === "Upcoming"),
      completed: filteredModules.filter((mod) => mod.status === "Completed"),
    };
  }, [filteredModules]);

  const {
    ongoing: onGoingModules,
    upcoming: upComingModules,
    completed: completedModules,
  } = modulesByStatus;

  const renderModuleList = (modules: ModuleInfo[]) => (
    <div className="space-y-2 sm:space-y-3 pb-24 sm:pb-4">
      {modules.length > 0 ? (
        modules.map((mod) => (
          <React.Suspense fallback={<ModuleCardSkeleton />} key={mod.id}>
            <StudentModulesCard
              status={mod.status}
              module={mod}
              // Access flags are already inside 'mod' but explicitly passing not strictly needed if types match
            />
          </React.Suspense>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No modules found
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="all" className="flex flex-col h-full">
        <div className="flex-shrink-0 mb-3">
          <Input
            placeholder="Search modules"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:w-72 w-56"
          />
        </div>

        <TabsList className="flex-shrink-0 sm:flex-nowrap flex-wrap bg-transparent text-sm md:space-x-7 md:text-lg mb-10 sm:mb-3">
          <TabsTrigger
            value="all"
            className="cursor-pointer bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-bg shadow-white text-primary data-[state=active]:font-semibold"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            className="cursor-pointer bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-bg shadow-white text-primary data-[state=active]:font-semibold"
          >
            Ongoing
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="cursor-pointer bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-bg shadow-white text-primary data-[state=active]:font-semibold"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            className="cursor-pointer bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-bg shadow-white text-primary data-[state=active]:font-semibold"
          >
            Upcoming
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 min-h-0">
          <TabsContent value="all" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              {renderModuleList(filteredModules)}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="ongoing" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              {renderModuleList(onGoingModules)}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="completed" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              {renderModuleList(completedModules)}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="upcoming" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              {renderModuleList(upComingModules)}
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentModulesTab;
