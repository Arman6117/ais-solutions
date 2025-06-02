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
    <Tabs defaultValue="all">
      <div className="my-1">
        <Input
          placeholder="Search batches"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TabsList className="bg-transparent space-x-7 text-lg">
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
          className="cursor-pointer bg-transparent data-[state=active]:border-b-2  data-[state=active]:border-b-primary-bg shadow-white text-primary data-[state=active]:font-semibold"
        >
          Completed
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[500px] no-scrollbar overflow-x-hidden flex gap-6 pr-2 flex-col w-auto">
        {filteredBatches.map((batch) => (
          <TabsContent
            key={batch.id}
            value="all"
            className=" flex gap-6 p-3 flex-col "
          >
            <StudentBatchesCard status={batch.status} batch={batch} />
          </TabsContent>
        ))}
        {onGoingBatches.map((batch) => (
          <TabsContent
            key={batch.id}
            value="ongoing"
            className=" flex gap-6 p-3 flex-col "
          >
            <StudentBatchesCard status={batch.status} batch={batch} />
          </TabsContent>
        ))}
        {upComingBatches.map((batch) => (
          <TabsContent
            key={batch.id}
            value="upcoming"
            className=" flex gap-6 p-3 flex-col "
          >
            <StudentBatchesCard status={batch.status} batch={batch} />
          </TabsContent>
        ))}
        {completedBatches.map((batch) => (
          <TabsContent
            key={batch.id}
            value="completed"
            className=" flex gap-6 p-3 flex-col "
          >
            <StudentBatchesCard status={batch.status} batch={batch} />
          </TabsContent>
        ))}
      </ScrollArea>
    </Tabs>
  );
};

export default StudentBatchesTab;
