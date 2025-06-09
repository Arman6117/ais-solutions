import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@radix-ui/react-progress';
import { Calendar, CheckCircle, Clock, GraduationCap, Lock } from 'lucide-react';
import React from 'react'

type Course = {
    name: string,
      total: number,
      paid: number,
      status: string,
      batch: string,
      approved: boolean,
}
type EnrolledCourseCardProps = {
    course:Course
}
const EnrolledCourseCard = ({course}:EnrolledCourseCardProps) => {
    const isApproved = course.approved;
    const progressPercentage = (course.paid / course.total) * 100;
  
    return (
      <Card className="group relative overflow-hidden border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-200">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {!isApproved && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg">
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-3 text-sm font-semibold shadow-lg border-0">
              <Lock className="w-4 h-4 mr-2" />
              Pending Approval
            </Badge>
          </div>
        )}
  
        <CardHeader className="relative z-5 pb-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  <GraduationCap className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg group-hover:text-purple-600 transition-colors duration-300">
                  {course.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  {course.batch}
                </p>
              </div>
            </div>
            <Badge
              variant={course.status === "Completed" ? "default" : "outline"}
              className={`${
                course.status === "Completed"
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                  : "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100"
              } flex items-center gap-1 px-3 py-1 font-medium`}
            >
              {course.status === "Completed" ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              {course.status}
            </Badge>
          </div>
        </CardHeader>
  
        <CardContent className="relative z-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center p-4 bg-slate-50/50 border-slate-100">
              <div className="text-lg font-bold text-slate-800">₹{course.total}</div>
              <div className="text-xs text-muted-foreground font-medium">Total</div>
            </Card>
            <Card className="text-center p-4 bg-emerald-50/50 border-emerald-100">
              <div className="text-lg font-bold text-emerald-700">₹{course.paid}</div>
              <div className="text-xs text-emerald-600 font-medium">Paid</div>
            </Card>
            <Card className="text-center p-4 bg-orange-50/50 border-orange-100">
              <div className="text-lg font-bold text-orange-700">
                ₹{course.total - course.paid}
              </div>
              <div className="text-xs text-orange-600 font-medium">Due</div>
            </Card>
          </div>
  
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Payment Progress</span>
              <span className="text-sm font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-10 " />
          </div>
  
          {isApproved && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 font-medium"
            >
              Remove Course
            </Button>
          )}
        </CardContent>
      </Card>
  )
}

export default EnrolledCourseCard