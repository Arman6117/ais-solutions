"use client";

import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Edit3,
  Save,
  X,
  Phone,
  GraduationCap,
  CheckCircle,
  Clock,
  Camera,
  Mail,
  Award,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { dummyStudentProfile } from "@/lib/static";
import EnrolledCourseCard from "./enrolled-course-card";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://placehold.co/120x120"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [studentData, setStudentData] = useState(dummyStudentProfile);

  const [editData, setEditData] = useState({
    name: studentData.name,
    number: studentData.number,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        setStudentData((prev) => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setStudentData((prev) => ({
      ...prev,
      name: editData.name,
      number: editData.number,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: studentData.name,
      number: studentData.number,
    });
    setIsEditing(false);
  };

  const remainingFees = studentData.totalFees - studentData.paidFees;
  const paymentProgress = (studentData.paidFees / studentData.totalFees) * 100;
  const completedCourses = studentData.courses.filter(
    (course) => course.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
    
        <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

          <CardContent className="relative p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Profile Picture */}
              <div className="relative group">
                <Avatar className="w-36 h-36 border-4 border-white/30 shadow-2xl">
                  <AvatarImage
                    src={studentData.image}
                    alt="Profile"
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <AvatarFallback className="bg-white text-purple-600 text-2xl font-bold">
                    {studentData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  size="sm"
                  className="absolute -bottom-2 -right-2 bg-white text-purple-600 rounded-full p-4 size-10 cursor-pointer hover:bg-primary-bg hover:border hover:border-white hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-0"
                >
                  <Camera className="size-5" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1 text-center lg:text-left text-white space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {isEditing ? (
                    <Input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="text-4xl font-bold bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:ring-white/50 focus:bg-white/25 transition-all duration-300 h-auto py-3"
                    />
                  ) : (
                    <h1 className="text-5xl font-bold tracking-tight">
                      {studentData.name}
                    </h1>
                  )}

                  <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          size="lg"
                          className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          size="lg"
                          variant="outline"
                          className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        size="lg"
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 text-white/95">
                    <Avatar className="bg-white/20 backdrop-blur-sm p-3 w-12 h-12">
                      <AvatarFallback className="bg-transparent">
                        <Mail className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm opacity-80 font-medium">
                        Email Address
                      </div>
                      <div className="font-semibold text-lg">
                        {studentData.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white/95">
                    <Avatar className="bg-white/20 backdrop-blur-sm p-3 w-12 h-12">
                      <AvatarFallback className="bg-transparent">
                        <Phone className="w-5 h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm opacity-80 font-medium">
                        Phone Number
                      </div>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={editData.number}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              number: e.target.value,
                            }))
                          }
                          className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:ring-white/50 font-semibold text-lg h-auto py-2"
                        />
                      ) : (
                        <div className="font-semibold text-lg">
                          {studentData.number}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="shadow-sm border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="bg-blue-100 p-4 w-16 h-16">
                  <AvatarFallback className="bg-blue-100">
                    <DollarSign className="w-7 h-7 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    ₹{studentData.totalFees.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    Total Fees
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="bg-emerald-100 p-4 w-16 h-16">
                  <AvatarFallback className="bg-emerald-100">
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    ₹{studentData.paidFees.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    Paid Amount
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="bg-orange-100 p-4 w-16 h-16">
                  <AvatarFallback className="bg-orange-100">
                    <Clock className="w-7 h-7 text-orange-600" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    ₹{remainingFees.toLocaleString()}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    Remaining
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="bg-purple-100 p-4 w-16 h-16">
                  <AvatarFallback className="bg-purple-100">
                    <Award className="w-7 h-7 text-purple-600" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-2xl font-bold text-slate-800">
                    {completedCourses}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    Completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Progress */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="bg-purple-100 p-3 w-12 h-12">
                <AvatarFallback className="bg-purple-100">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </AvatarFallback>
              </Avatar>
              Payment Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">
                Overall Payment Completion
              </span>
              <span className="text-2xl font-bold">
                {Math.round(paymentProgress)}%
              </span>
            </div>
            <Progress value={paymentProgress} className="h-4" />
          </CardContent>
        </Card>

        {/* Enrolled Courses */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-2xl">
              <GraduationCap className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Enrolled Courses
              </h2>
              <p className="text-slate-500 mt-1">
                Track your learning journey and progress
              </p>
            </div>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-2 text-sm font-semibold">
              {studentData.courses.length} Courses
            </Badge>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {studentData.courses.map((course, idx) => (
              <EnrolledCourseCard key={idx} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
