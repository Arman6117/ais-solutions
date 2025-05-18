"use client";
import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  CreditCard,
  BookOpen,
  Tag,
  School,
  CircleDollarSign,
  Monitor,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DummyStudent } from "@/lib/types";
import { format } from "date-fns";
import CoursesCards from "@/components/courses-cards";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type StudentDetailsProps = {
  student: DummyStudent | undefined;
};
const StudentDetails = ({ student }: StudentDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMode = searchParams.get("mode") === "edit" ? "edit" : "view";
  const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  if (!student) {
    return (
      <div className="p-8 flex w-full items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Student Selected</h2>
          <p className="text-muted-foreground">Please select a Student</p>
          <Button className="mt-4 bg-primary-bg" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Card className="w-full h-full flex flex-col p-0">
      {/* Header with student name and avatar */}
      <CardHeader className="bg-indigo-600 text-white rounded-t-lg space-y-0 p-4">
        <div className="flex items-center">
          <Avatar className="h-20 w-20 mr-4 border-2 border-white bg-white">
            {student.avatar ? (
              <AvatarImage 
                src="/api/placeholder/80/80" 
                alt={student.name} 
              />
            ) : (
              <AvatarFallback className="bg-white text-gray-400">
                <User size={40} />
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <div className="flex items-center mt-1">
              <span className="flex items-center text-sm">
                <Tag size={14} className="mr-1" />
                ID: {student.id}
              </span>
              <span className="mx-2">•</span>
              <Badge
                className={`flex items-center ${
                  student.isApproved
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {student.isApproved ? (
                  <>
                    <CheckCircle size={14} className="mr-1" />
                    Approved
                  </>
                ) : (
                  <>
                    <XCircle size={14} className="mr-1" />
                    Not Approved
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Tabs */}
      <CardContent className="p-0 flex-grow overflow-auto">
        <Tabs defaultValue="personal" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="academic">Academic Details</TabsTrigger>
            <TabsTrigger value="financial">Financial Details</TabsTrigger>
          </TabsList>

          <div className="flex-grow overflow-auto">{/* Added container for scrollable content */}

          {/* Personal Details Tab */}
          <TabsContent value="personal" className="p-6 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div>{student.email}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div>{student.phone}</div>
                </div>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Gender</div>
                  <div>{student.gender}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Joined On</div>
                  <div>{format(student.joinedAt, "PP")}</div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Academic Details Tab */}
          <TabsContent value="academic" className="p-6 overflow-auto">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <School className="w-5 h-5 mr-2 text-indigo-600" />
                  Batch Information
                </h3>
                <Card>
                  <CardContent className="p-">
                    <div className="text-sm text-gray-500">Batch Name</div>
                    <div className="font-medium">{student.batchId}</div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-indigo-600" />
                  Modules
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {student.modules.map((module, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 rounded-lg border border-indigo-100 bg-indigo-50"
                    >
                      {/* <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-indigo-100">
                       
                      </div> */}
                      <span className="font-medium text-indigo-800">{module}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                  Courses
                </h3>
                <div className="space-y-3">
                  {student.courses && (
                    <CoursesCards courses={student.courses} label={undefined} mode="view"/>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Financial Details Tab */}
          <TabsContent value="financial" className="p-6 overflow-auto">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-green-50 border border-green-100 overflow-hidden">
                  <div className="bg-green-500 h-1"></div>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Fees Status</div>
                    <div className="text-lg font-medium flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      <span className="capitalize">{student.feesStatus}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-50 border border-blue-100 overflow-hidden">
                  <div className="bg-blue-500 h-1"></div>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Total Fee Paid</div>
                    <div className="text-lg font-medium flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                      ₹{student.totalFeePaid.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-amber-50 border border-amber-100 overflow-hidden">
                  <div className="bg-amber-500 h-1"></div>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500">Fees Remaining</div>
                    <div className="text-lg font-medium flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-amber-600" />
                      ₹{student.feesRemaining.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-indigo-50 border border-indigo-100 overflow-hidden">
                <div className="bg-indigo-500 h-1"></div>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <CircleDollarSign className="w-6 h-6 text-indigo-600 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Referral Coins</div>
                      <div className="text-lg font-medium">{student.refCoins} coins</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;
