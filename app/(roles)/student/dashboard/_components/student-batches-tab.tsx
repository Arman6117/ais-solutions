"use client";
import React, { useEffect, useState } from "react";
import { dummyBatches } from "@/lib/static";

import StudentBatchesCard from "./student-batches-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { DummyBatches } from "@/lib/types";

const StudentBatchesTab = () => {
  const [search, setSearch] = useState("");
  const [filteredBatches, setFilteredBatches] =
    useState<DummyBatches[]>(dummyBatches);

  useEffect(() => {
    const filtered = dummyBatches.filter((batch) =>
      batch.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBatches(filtered);
  }, [search]);

  const onGoingBatches = filteredBatches.filter(
    (batch) => batch.status === "Ongoing"
  );
  const upComingBatches = filteredBatches.filter(
    (batch) => batch.status === "Upcoming"
  );
  const completedBatches = filteredBatches.filter(
    (batch) => batch.status === "Completed"
  );

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="all" className="flex flex-col h-full">
        <div className="flex-shrink-0 mb-3">
          <Input
            placeholder="Search batches"
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
            value="upcoming"
            className="cursor-pointer bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-bg shadow-white text-primary data-[state=active]:font-semibold"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="cursor-pointer bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-primary-bg shadow-white text-primary data-[state=active]:font-semibold"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 min-h-0">
          <TabsContent value="all" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3 p-3">
                {filteredBatches.map((batch) => (
                  <StudentBatchesCard key={batch.id} status={batch.status} batch={batch} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="ongoing" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {onGoingBatches.map((batch) => (
                  <StudentBatchesCard key={batch.id} status={batch.status} batch={batch} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="upcoming" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {upComingBatches.map((batch) => (
                  <StudentBatchesCard key={batch.id} status={batch.status} batch={batch} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="completed" className="h-full mt-0">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-3">
                {completedBatches.map((batch) => (
                  <StudentBatchesCard key={batch.id} status={batch.status} batch={batch} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentBatchesTab;