import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getStatusColor } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar, ChevronRight, Clock, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

type BatchCardProps = {
  batch: any;
  courseId: string;
};
const BatchCard = ({ batch, courseId }: BatchCardProps) => {
  const statusColor = getStatusColor(batch.status);
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex gap-10 items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{batch.name}</h3>
        <Badge
          className={`${statusColor.bg} ${statusColor.text} ${statusColor.border} text-xs px-3 py-1 rounded-full font-medium`}
        >
          {batch.status}
        </Badge>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-3 text-primary-bg" />
          <span>
            {format(batch.startDate, "PP")} - {format(batch.endDate, "PP")}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-3 text-primary-bg" />
          <span>{batch.studentsCount} Students</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-3 text-primary-bg" />
          <span>Instructor: {batch.instructor}</span>
        </div>
      </div>

      <Button className="w-full cursor-pointer bg-primary-bg  " asChild>
        <Link
          href={`/admin/courses/batch-details/${courseId}/batch/${batch.id}?mode=view`}
        >
          View Details
          <ChevronRight size={16} className="ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default BatchCard;
