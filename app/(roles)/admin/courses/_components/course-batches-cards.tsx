"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Calendar, Clock, FileStack, PencilIcon, Plus, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { parseISO, compareDesc } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiChalkboardTeacherFill } from "react-icons/pi";
const CourseBatchesCards = ({
  courseId,
  batches,
  mode,
}: {
  courseId: string;
  batches: any[];
  mode: "view" | "edit";
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const filteredBatches = batches
    .filter((batch) => {
      const matchSearch = batch.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchStatus =
        selectedStatus === "all"
          ? true
          : batch.status.toLowerCase() === selectedStatus;

      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      return sortOrder === "newest"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold">Batches</h2>
        <div className="flex gap-2 w-full md:w-auto items-center">
          <Select
            value={sortOrder}
            onValueChange={(val) => setSortOrder(val as "newest" | "oldest")}
          >
            <SelectTrigger className="w-[160px] flex gap-2 items-center">
              <Calendar  className="text-primary-bg"/>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full "
          />
          {mode === "edit" && (
            <Button
              asChild
              size="sm"
              className="flex items-center gap-1 bg-primary-bg hover:bg-primary-bg/90"
            >
              <Link href={`/admin/courses/${courseId}/create-batch`}>
                <Plus size={16} /> Add Batch
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Tabs
        value={selectedStatus}
        onValueChange={(value) => setSelectedStatus(value)}
        className="mb-4"
      >
        <TabsList className="bg-muted w-full md:w-auto overflow-x-ato whitespace-nowrap">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4">
        {filteredBatches.map((batch) => (
          <Card
            key={batch.id}
            className={cn(
              "border border-gray-200 hover:border-gray-300 transition-all",
              mode === "view" &&
                "cursor-pointer hover:border-violet-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-100"
            )}
          >
            <Link
              href={
                mode === "view"
                  ? `/admin/courses/batch-details/${courseId}/batch/${batch.id}?mode=view`
                  : "#"
              }
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{batch.name}</h3>
                      <Badge
                        variant="outline"
                        className={cn(
                          "border",
                          batch.status.toLowerCase() === "upcoming" &&
                            "bg-yellow-50 text-yellow-800 border-yellow-200",
                          batch.status.toLowerCase() === "ongoing" &&
                            "bg-blue-50 text-blue-700 border-blue-200",
                          batch.status.toLowerCase() === "completed" &&
                            "bg-green-50 text-green-700 border-green-200"
                        )}
                      >
                        {batch.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} className="text-primary" />
                        <span>Starts: {batch.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileStack size={14} className="text-primary" />
                        <span>Modules: Promise,Async Await</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar size={14} className="text-primary" />
                        <span>Ends: {batch.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users size={14} className="text-primary" />
                        <span>{batch.students} Students</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <PiChalkboardTeacherFill size={14} className="text-primary" />
                        <span>Instructors: John Doe</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} className="text-primary" />
                        <span>
                          {batch.time} ({batch.schedule})
                        </span>
                      </div>
                    </div>
                  </div>
                  {mode === "edit" && (
                    <div className="flex items-center gap-2 md:self-start">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 cursor-pointer"
                      >
                        <PencilIcon size={14} className="mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => toast.success("Batch removed")}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {filteredBatches.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg bg-gray-50 mt-4">
          <p className="text-muted-foreground">No matching batches found.</p>
        </div>
      )}
    </>
  );
};

export default CourseBatchesCards;
