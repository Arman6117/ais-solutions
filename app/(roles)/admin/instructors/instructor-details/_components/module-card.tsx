import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, Layers, Target, UserCheck } from "lucide-react";

type ModuleCardProps = {
  modules: {
    id: number;
    name: string;
    totalBatches: number;
    totalStudents: number;
    progress: number;
    color: "blue" | "emerald" | "orange";
  }[];
};
const ModuleCard = ({ modules }:ModuleCardProps) => (
  <Card className="shadow-lg border-0 bg-white">
    <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
      <CardTitle className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-800">Assigned Modules</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 p-6">
      {modules.map((module) => {
        const colorClasses = {
          blue: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-700",
            icon: "bg-blue-100",
            iconText: "text-blue-600",
            badge: "bg-blue-100 text-blue-700",
          },
          emerald: {
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            text: "text-emerald-700",
            icon: "bg-emerald-100",
            iconText: "text-emerald-600",
            badge: "bg-emerald-100 text-emerald-700",
          },
          orange: {
            bg: "bg-orange-50",
            border: "border-orange-200",
            text: "text-orange-700",
            icon: "bg-orange-100",
            iconText: "text-orange-600",
            badge: "bg-orange-100 text-orange-700",
          },
        };

        const colors = colorClasses[module.color];

        return (
          <div
            key={module.id}
            className={`${colors.bg} ${colors.border} border-2 rounded-xl p-5 space-y-4 transition-all hover:shadow-md`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${colors.icon} rounded-lg flex items-center justify-center`}
                >
                  <Layers className={`w-5 h-5 ${colors.iconText}`} />
                </div>
                <div>
                  <h4 className={`font-semibold ${colors.text}`}>
                    {module.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Active Module</p>
                </div>
              </div>
              <Badge className={`${colors.badge} shadow-sm`}>
                <CheckCircle className="w-3 h-3 mr-1" />
                {module.progress}%
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className={`font-medium ${colors.text}`}>
                  {module.progress}%
                </span>
              </div>
              <Progress value={module.progress} className="h-2" />
            </div>

            <div className="flex justify-between">
             
              <div className="flex items-center space-x-2">
                <div
                  className={`w-6 h-6 ${colors.icon} rounded-full flex items-center justify-center`}
                >
                  <UserCheck className={`w-3 h-3 ${colors.iconText}`} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {module.totalStudents} Students
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </CardContent>
  </Card>
);
export default ModuleCard;
