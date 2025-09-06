import BatchCard from "./batch-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseBatch } from "@/lib/types/types";

type CourseSectionProps = {
  course:{
    id:string
    courseName:string,
    batches: CourseBatch[]
  }
}

const CourseSection = ({ course }:  CourseSectionProps ) => {
  return (
    <div className="mb">
      <div className="flex gap-7 flex-wrap items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800">{course.courseName}</h2>
        <Badge className=" bg-[#efe9ff] text-primary-bg text-xs px-3 py-1 rounded-full font-medium">
          {course.batches.length}{" "}
          {course.batches.length === 1 ? "Batch" : "Batches"}
        </Badge>
       
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {course.batches.map((batch: CourseBatch) => (
          <BatchCard key={batch._id} courseId={course.id} batch={batch} />
        ))}
      </div>
      <Separator className="mb-10" />
    </div>
  );
};

export default CourseSection;
