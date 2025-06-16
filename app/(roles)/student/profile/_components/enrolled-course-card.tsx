"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  Lock,
} from "lucide-react";
import Link from "next/link";
import React from "react";

type Course = {
  id: number;
  name: string;
  total: number;
  paid: number;
  status: string;
  batch: string;
  approved: boolean;
};

type EnrolledCourseCardProps = {
  course: Course;
};

const EnrolledCourseCard = ({ course }: EnrolledCourseCardProps) => {
  const isApproved = course.approved;
  const progressPercentage = (course.paid / course.total) * 100;

  return (
    <Link
      href={`/student/profile/enrolled-courses/${course.id}`}
      className="no-underline"
    >
      <Card className="group relative overflow-hidden border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* Overlay for unapproved */}
        {!isApproved && (
          <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <Badge className="bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-lg px-4 py-2 text-sm font-semibold border-none">
              <Lock className="w-4 h-4 mr-2" />
              Pending Approval
            </Badge>
          </div>
        )}

        <CardHeader className="relative z-5 pb-3">
          <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500">
                <AvatarImage src={"https://placehold.co/120x120"} />
                <AvatarFallback className="text-white">
                  <GraduationCap className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
                  {course.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {course.batch}
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-xl ${
                course.status === "Completed"
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : "bg-blue-100 text-blue-700 border-blue-200"
              }`}
            >
              {course.status === "Completed" ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
              {course.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="relative z-5 space-y-4">
          {/* Payment Summary */}
          <div className="flex flex-wrap  gap-6 ">
            <Card className="text-center  p-4 bg-slate-50 border border-slate-100">
              <div className="text-lg font-bold text-slate-800">
                ₹{course.total}
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Total
              </div>
            </Card>
            <Card className="text-center p-4 bg-emerald-50 border border-emerald-100">
              <div className="text-lg font-bold text-emerald-700">
                ₹{course.paid}
              </div>
              <div className="text-xs text-emerald-700 font-medium">Paid</div>
            </Card>
            <Card className="text-center p-4 bg-orange-50 border border-orange-100">
              <div className="text-lg font-bold text-orange-700">
                ₹{course.total - course.paid}
              </div>
              <div className="text-xs text-orange-700 font-medium">Due</div>
            </Card>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">
                Payment Progress
              </span>
              <span className="text-sm font-semibold text-slate-700">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3 rounded-full" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EnrolledCourseCard;
