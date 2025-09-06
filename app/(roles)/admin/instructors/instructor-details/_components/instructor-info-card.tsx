import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, Mail, Phone, User } from "lucide-react";

type InstructorStats = {
  totalStudents: number;
  totalSessions: number;
  averageFeedback: number;
  completionRate: number;
}
type InstructorInfoCardProps = {
  instructor:{
    id: number;
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    profileBadge: string;
    avatar?: string | null;
    stats: InstructorStats;
  }
}
const InstructorInfoCard = ({ instructor }:InstructorInfoCardProps) => (
  <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
    <CardHeader className="pb-4">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
          <User className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-2xl text-gray-800">{instructor.name}</CardTitle>
          
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm text-gray-700">{instructor.email}</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <Phone className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-sm text-gray-700">{instructor.phone}</span>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
            <Calendar className="w-4 h-4 text-orange-600" />
          </div>
          <span className="text-sm text-gray-700">Joined: {new Date(instructor.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default InstructorInfoCard