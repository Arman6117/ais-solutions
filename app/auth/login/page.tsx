import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { GraduationCap, UserCheck, BookOpen, Shield } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl w-full">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sign in to your account and continue your learning journey
          </p>
        </div>

        {/* Login Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto group">
          {/* Student Card */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="relative p-6 flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="mb-5 relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full"></div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Student Login
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Access your courses and track your learning progress
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-1 justify-center mb-5">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Courses
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Assignments
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Progress
                </span>
              </div>

              <div className="flex flex-col gap-4 w-full">
                <Link href="/auth/login/student" className="w-full">
                  <Button className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    Sign In
                  </Button>
                </Link>
                <hr />
                <Link href="/auth/register/student" className="w-full">
                  <Button className="w-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/auth/login/admin" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative p-6 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="mb-5 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center shadow-md">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  Admin Login
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Manage platform settings, users, and system configurations
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 justify-center mb-5">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Users
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Settings
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Reports
                  </span>
                </div>

                {/* Button */}
                <Button className="w-full cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  Sign In
                </Button>
              </div>
            </div>
          </Link>
          {/* Instructor Card */}
       
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 group">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative p-6 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div className="mb-5 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <UserCheck className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center shadow-md">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  Instructor Login
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Manage your courses, students, and track class performance
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 justify-center mb-5">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Courses
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Students
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    Analytics
                  </span>
                </div>

                {/* Button */}
                <div className="flex flex-col gap-4 w-full">
                  <Link href="/auth/login/instructor" className="w-full">
                  <Button className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                  Sign In
                    </Button>
                  </Link>
                  <hr />
                  <Link href="/auth/register/instructor" className="w-full">
                    <Button className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
       

      
        </div>

     
      </div>
    </div>
  );
};

export default LoginPage;
