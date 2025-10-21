

import {
  User,
  Phone,
  Mail,
  Calendar,
 
  BookOpen,
  Tag,
  School,
  CircleDollarSign,
  Layers,
  Link,
} from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import CoursesCards from "@/components/courses-cards";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { StudentData } from "@/lib/types/student";

type StudentDetailsProps = {
  student: StudentData | null;
};

const StudentDetails = ({ student }: StudentDetailsProps) => {
  if (!student) {
    return (
      <div className="p-8 flex w-full items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Student Selected</h2>
          <p className="text-muted-foreground">Please select a Student</p>
          <Link href="/admin/students">
          <Button className="mt-4 bg-primary-bg" >
            Go Back
          </Button>
          </Link>
        </div>
      </div>
    );
  }



  const remainingFees = student.invoices
    .map((invoice) => {
      return invoice.courseDetails.reduce(
        (remaining, course) => remaining + (course.remainingFees || 0),
        0
      );
    })
    .reduce((sum, current) => sum + current, 0);

  const amountPaid = student.invoices.map((invoice) => {
    return invoice.courseDetails.reduce(
      (paid, course) => paid + (course.amountPaid || 0),
      0
    );
  });
 


  return (
    <Card className="w-full h-full flex flex-col p-0">
      <CardHeader className="bg-indigo-600 text-white rounded-t-lg space-y-0 p-4">
        <div className="flex items-center">
          <Avatar className="h-20 w-20 mr-4 border-2 border-white bg-white">
            {student.profilePic ? (
              <AvatarImage src={student.profilePic} alt={student.name} />
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
                ID: {student._id}
              </span>
            
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
                  <div>{format(student.createdAt, "PP")}</div>
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
                  <h1 className="text-sm  text-gray-500">Batch Name</h1>
                  <div className="flex gap-5">

                  {student.batches.map((batch) => (
                    <Badge key={batch.batchId._id} className="font-medium">{batch.batchId.name}</Badge>
                  ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-indigo-600" />
                Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {student.batches.map((batch) => {
                  return batch.batchId.modules.map((module) => (
                    <Card key={module.name} className="hover:shadow-lg p-0">
                      <CardContent className=" flex flex-col p-0 ">
                        <div className="w-full bg-primary-bg p-3 rounded-md">
                          <span className="text-white font-semibold">
                            {batch.batchId.name}
                          </span>
                        </div>
                        <div className="p-3">
                          <span className="font-medium">{module.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ));
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
                Courses
              </h3>
              <CoursesCards
                courses={student.courses}
                label={undefined}
                mode="view"
              />
            </div>
          </TabsContent>

          {/* Financial Details */}
          <TabsContent value="financial" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border border-green-100">
                <div className="bg-green-500 h-1"></div>
                <CardContent className="p-4 space-y-2">
                  <Label>Fees Status</Label>
                  <span>{student.feesStatus}</span>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border border-blue-100">
                <div className="bg-blue-500 h-1"></div>
                <CardContent className="p-4 space-y-2">
                  <Label>Total Fee Paid</Label>
                  <Input
                    type="number"
                    value={amountPaid[0]}
                    readOnly
                    // onChange={(e) => setTotalFeePaid(Number(e.target.value))}
                  />
                </CardContent>
              </Card>

              <Card className="bg-amber-50 border border-amber-100">
                <div className="bg-amber-500 h-1"></div>
                <CardContent className="p-4 space-y-2">
                  <Label>Fees Remaining</Label>
                  <Input type="number" value={remainingFees} readOnly />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-indigo-50 border border-indigo-100">
              <div className="bg-indigo-500 h-1"></div>
              <CardContent className="p-4 flex items-center gap-3">
                <CircleDollarSign className="w-6 h-6 text-indigo-600" />
                <div>
                  <div className="text-sm text-gray-500">Referral Coins</div>
                  <div className="text-lg font-medium">
                    {/* {student.} coins */}
                  </div>
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
