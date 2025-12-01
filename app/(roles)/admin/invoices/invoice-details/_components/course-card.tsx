import { BookOpen, Users, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FormattedCourse } from "@/lib/types/invoice"; // Updated to match your types file
import { BatchTypeIcon } from "./invoice-icons";

export const CourseCard = ({ course }: { course: FormattedCourse }) => {
  return (
    <Card className="mb-6 shadow-sm h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="w-5 h-5 text-primary" />
            {course.courseName}
          </CardTitle>
          <BatchTypeIcon type={course.courseMode} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            {course.batchName}
          </span>
          {course.dueDate && (
            <span className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs font-medium">
              <Clock className="w-3 h-3" />
              Due: {new Date(course.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1 flex flex-col">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Payment Progress</Label>
            <span className="text-sm text-muted-foreground">
              {course.paymentProgress}%
            </span>
          </div>
          <Progress
            value={parseFloat(course.paymentProgress)}
            className="h-2"
          />
        </div>

        <div className="space-y-3 flex-1">
          <Label className="text-xs font-semibold uppercase text-muted-foreground">
            Modules
          </Label>
          <div className="grid gap-2">
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-slate-700">
                      {module.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                      ₹{(module.amount || module.price || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground italic">
                No specific modules listed
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border mt-auto">
          <div className="text-center space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
              Total
            </Label>
            <div className="font-bold text-lg text-slate-900">
              ₹{course.totalFees.toLocaleString()}
            </div>
          </div>
          <div className="text-center space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
              Paid
            </Label>
            <div className="font-bold text-lg text-green-600">
              ₹{course.amountPaid.toLocaleString()}
            </div>
          </div>
          <div className="text-center space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground font-bold">
              Remaining
            </Label>
            <div className="font-bold text-lg text-orange-600">
              ₹{course.remainingFees.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
