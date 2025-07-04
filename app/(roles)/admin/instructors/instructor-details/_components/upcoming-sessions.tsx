import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, Clock, PlayCircle, Zap } from "lucide-react";

type UpcomingSessionsProps = {
  sessions: {
    id: number;
    title: string;
    batchName: string;
    date: string;
    time: string;
    mode: "online" | "offline" | "hybrid";
  }[];
};
const UpcomingSessions = ({ sessions }:UpcomingSessionsProps) => (
  <Card className="shadow-lg border-0">
    <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
      <CardTitle className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <span className="text-gray-800">Upcoming Sessions</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 p-6">
      {sessions.map((session, index) => {
        const colors = [
          "border-blue-500",
          "border-emerald-500",
          "border-orange-500",
        ];
        const bgColors = ["bg-blue-50", "bg-emerald-50", "bg-orange-50"];
        const iconColors = [
          "bg-blue-100 text-blue-600",
          "bg-emerald-100 text-emerald-600",
          "bg-orange-100 text-orange-600",
        ];

        return (
          <div
            key={session.id}
            className={`${colors[index % 3]} ${
              bgColors[index % 3]
            } border-l-4 rounded-r-lg p-4 space-y-3`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 ${
                  iconColors[index % 3]
                } rounded-lg flex items-center justify-center flex-shrink-0`}
              >
                <PlayCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{session.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {session.batchName}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </CardContent>
  </Card>
);
export default UpcomingSessions;
