"use client";
import React, { useEffect, useMemo, useState } from "react";
import { dummyModules } from "@/lib/static";

import StudentModulesCard from "./student-modules-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { DummyModules } from "@/lib/types";
import { useCourseStore } from "@/store/use-course-store";
import ModuleCardSkeleton from "@/components/skeletons/module-card";

const StudentModulesTab = () => {
  const [search, setSearch] = useState("");
  const { selectedCourse } = useCourseStore();
  const [filteredModules, setFilteredModules] =
    useState<DummyModules[]>(dummyModules);

  useEffect(() => {
    const filtered = dummyModules.filter((module) =>
      module.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredModules(filtered);
  }, [search]);

  const onGoingModules = filteredModules.filter(
    (module) => module.status === "Ongoing"
  );
  const upComingModules = filteredModules.filter(
    (module) => module.status === "Upcoming"
  );
  const completedModules = filteredModules.filter(
    (module) => module.status === "Completed"
  );
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="all" className="flex flex-col h-full">
        <div className="flex-shrink-0 mb-3">
          <Input
            placeholder="Search modules"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <TabsList className="flex-shrink-0 bg-transparent space-x-7 text-lg mb-3">
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
              <div className="space-y-3 p-3">
                {filteredModules.map((module) => (
                  <React.Suspense
                    fallback={<ModuleCardSkeleton />}
                    key={module.id}
                  >
                    <StudentModulesCard
                      status={module.status}
                      module={module}
                    />
                  </React.Suspense>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="ongoing" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {onGoingModules.map((module) => (
                  <React.Suspense
                    fallback={<ModuleCardSkeleton />}
                    key={module.id}
                  >
                    <StudentModulesCard
                      status={module.status}
                      module={module}
                    />
                  </React.Suspense>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="completed" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {completedModules.map((module) => (
                  <React.Suspense
                    fallback={<ModuleCardSkeleton />}
                    key={module.id}
                  >
                    <StudentModulesCard
                      status={module.status}
                      module={module}
                    />
                  </React.Suspense>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="upcoming" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {upComingModules.map((module) => (
                  <React.Suspense
                    fallback={<ModuleCardSkeleton />}
                    key={module.id}
                  >
                    <StudentModulesCard
                      status={module.status}
                      module={module}
                    />
                  </React.Suspense>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentModulesTab;
