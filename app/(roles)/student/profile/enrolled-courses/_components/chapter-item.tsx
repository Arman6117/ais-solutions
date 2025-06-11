import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, Lock, Play } from "lucide-react";
import Link from "next/link";
type Files = {
  name: string;
  size: string;
};
type Notes = {
  id: number;
  title: string;
  videoUrl: string;
  files: Files[];
};
type Chapter = {
  id: number;
  name: string;
  isCompleted: boolean;
  notes: Notes[];
};

type ChapterItemProps = {
  chapter: Chapter;
  moduleIsPurchased: boolean;
  courseName: string;
};
const ChapterItem = ({
  chapter,
  moduleIsPurchased,
  courseName,
}: ChapterItemProps) => {
  return (
    <div className="border-l-2 border-gray-200 ml-4 pl-4 pb-4">
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-3 flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              chapter.isCompleted
                ? "bg-green-500"
                : moduleIsPurchased
                ? "bg-purple-500"
                : "bg-gray-300"
            }`}
          >
            {chapter.isCompleted ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : moduleIsPurchased ? (
              <Play className="w-4 h-4 text-white" />
            ) : (
              <Lock className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <div className="flex-1">
            <h4
              className={`font-medium ${
                !moduleIsPurchased ? "text-gray-400" : ""
              }`}
            >
              {chapter.name}
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {chapter.isCompleted && (
                <Badge variant="outline" className="text-xs">
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>

        {moduleIsPurchased && chapter.notes.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Link
              href={`/student/profile/enrolled-courses/view-notes/${courseName}/${chapter.id}`}
              className="flex gap-2 items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Notes
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChapterItem;
