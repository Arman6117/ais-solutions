"use client";
import { useEffect, useState } from "react";
import {
  User, Phone, Mail, Calendar, CheckCircle, XCircle,
   BookOpen, Tag, School, CircleDollarSign,
   Layers
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DummyStudent,  } from "@/lib/types/types";
import { format } from "date-fns";
import CoursesCards from "@/components/courses-cards";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type StudentDetailsProps = {
  student: DummyStudent | undefined;
};

const StudentDetails = ({ student }: StudentDetailsProps) => {
  const router = useRouter();
  // const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  const [feesStatus, setFeesStatus] = useState(student?.feesStatus || "pending");
  const [totalFeePaid, setTotalFeePaid] = useState(student?.totalFeePaid || 0);
  const [totalFees] = useState(0);
  const [feesRemaining] = useState(0);
 console.log(totalFees)
  useEffect(() => {
    if (student) {
      // const moduleTotal = (student.modulesDetails || []).reduce((sum, mod: DummyModules) => sum + (mod.price || 0), 0);
      // const courseTotal = (student.courses || []).reduce((sum, course: Course) => sum + (course.price || 0), 0);
      // const total = moduleTotal + courseTotal;
      // setTotalFees(total);
      // const remaining = Math.max(0, total - totalFeePaid);
      // setFeesRemaining(remaining);
      // setFeesStatus(remaining <= 0 ? "paid" : "pending");
    }
  }, [student, totalFeePaid]);

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
      <CardHeader className="bg-indigo-600 text-white rounded-t-lg space-y-0 p-4">
        <div className="flex items-center">
          <Avatar className="h-20 w-20 mr-4 border-2 border-white bg-white">
            {student.avatar ? (
              <AvatarImage src={student.avatar} alt={student.name} />
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

      <CardContent className="p-0 flex-grow overflow-auto">
        <Tabs defaultValue="personal" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          {/* Personal Details */}
          <TabsContent value="personal" className="p-6">
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

          {/* Academic Details */}
          <TabsContent value="academic" className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <School className="w-5 h-5 mr-2 text-indigo-600" />
                Batch
              </h3>
              <Card>
                <CardContent className="p-4">
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
                {/* {student.modulesDetails?.map((mod, i) => ( */}
                  {/* <div key={i} className="p-3 rounded-lg border bg-indigo-50">
                    <div className="text-indigo-800 font-medium">{mod.name}</div>
                    <div className="text-sm text-muted-foreground">₹{mod.price}</div>
                  </div> */}
                {/* ))} */}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Courses
              </h3>
              <CoursesCards courses={student.courses} label={undefined} mode="view" />
            </div>
          </TabsContent>

          {/* Financial Details */}
          <TabsContent value="financial" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border border-green-100">
                <div className="bg-green-500 h-1"></div>
                <CardContent className="p-4 space-y-2">
                  <Label>Fees Status</Label>
                  <Select value={feesStatus} onValueChange={setFeesStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border border-blue-100">
                <div className="bg-blue-500 h-1"></div>
                <CardContent className="p-4 space-y-2">
                  <Label>Total Fee Paid</Label>
                  <Input
                    type="number"
                    value={totalFeePaid}
                    onChange={(e) => setTotalFeePaid(Number(e.target.value))}
                  />
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border border-amber-100">
                <div className="bg-amber-500 h-1"></div>
                <CardContent className="p-4 space-y-2">
                  <Label>Fees Remaining</Label>
                  <Input type="number" value={feesRemaining} readOnly />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-indigo-50 border border-indigo-100">
              <div className="bg-indigo-500 h-1"></div>
              <CardContent className="p-4 flex items-center gap-3">
                <CircleDollarSign className="w-6 h-6 text-indigo-600" />
                <div>
                  <div className="text-sm text-gray-500">Referral Coins</div>
                  <div className="text-lg font-medium">{student.refCoins} coins</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentDetails;
