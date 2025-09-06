import { Badge } from "@/components/ui/badge";
import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity, Calendar, GraduationCap, Users } from "lucide-react";
type BatchGridProps = {
    batches: {
        id: number;
        name: string;
        courseName: string;
        mode: "online" | "offline" | "hybrid";
        studentsCount: number;
        startDate: string;
        endDate: string;
    }[]
}
const BatchGrid = ({ batches }:BatchGridProps) => {
    
  
   
    return (
      <Card className="col-span-1 lg:col-span-2 shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-800">Assigned Batches</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {batches.map((batch) => (
              <div key={batch.id} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-5 space-y-4 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{batch.name}</h4>
                      <p className="text-sm text-gray-600">{batch.courseName}</p>
                    </div>
                  </div>
                  
                </div>
                
                <Separator className="bg-gray-200" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{batch.studentsCount} Students</span>
                    </div>
                    <Badge variant="outline" className="text-xs bg-gray-50">
                      <Activity className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };
  
export default BatchGrid  