import { Button } from "@/components/ui/button";
import BatchCard from "./batch-card";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const CourseSection = ({ course }: { course: any }) => {
  return (
    <div className="mb">
      <div className="flex gap-7 flex-wrap items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800">{course.name}</h2>
        <Badge className=" bg-[#efe9ff] text-primary-bg text-xs px-3 py-1 rounded-full font-medium">
          {course.batches.length}{" "}
          {course.batches.length === 1 ? "Batch" : "Batches"}
        </Badge>
        <Button
          asChild
          size="sm"
          className="flex items-center gap-1 cursor-pointer bg-primary-bg hover:bg-primary-bg/90"
        >
          <Link href={`/admin/courses/${course.id}/create-batch`}>
            <Plus size={16} /> Add Batch
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.batches.map((batch: any) => (
          <BatchCard key={batch.id} courseId={course.id} batch={batch} />
        ))}
      </div>
      <Separator className="mb-10" />
    </div>
  );
};

export default CourseSection;
