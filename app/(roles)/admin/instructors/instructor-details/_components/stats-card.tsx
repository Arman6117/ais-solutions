import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle, GraduationCap, PlayCircle, Star, TrendingUp, Users } from "lucide-react";
import React from "react";

type StatsCardProps = {
  stats: {
    totalStudents: number;
    totalSessions: number;
    averageFeedback: number;
    completionRate: number;
  };
};
const StatsCard = ({ stats }: StatsCardProps) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
      <CardTitle className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-800">Performance Stats</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center border border-blue-200">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {stats.totalStudents}
          </div>
          <div className="text-xs text-gray-600 mt-1">Total Students</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl text-center border border-emerald-200">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <PlayCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">
            {stats.totalSessions}
          </div>
          <div className="text-xs text-gray-600 mt-1">Sessions</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl text-center border border-yellow-200">
          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Star className="w-4 h-4 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {stats.averageFeedback}
          </div>
          <div className="text-xs text-gray-600 mt-1">Avg Rating</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl text-center border border-purple-200">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-600">
           3
          </div>
          <div className="text-xs text-gray-600 mt-1">Modules</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatsCard;
