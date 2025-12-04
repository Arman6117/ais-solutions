"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
  AlertCircle,
  Briefcase, // Changed icon to Briefcase for Instructor
} from "lucide-react";
import { registerInstructor } from "@/actions/instructor/register-instructor";
import { Card,CardHeader, CardContent,CardDescription,CardTitle} from "@/components/ui/card";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InstructorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      const res = await registerInstructor(data);
      
      if (res.success) {
        toast.success(res.message);
        router.push("/auth/login/instructor"); // Redirect to instructor login
      } else {
        toast.error(res.message);
        setErrors(res.error || {});
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: "Something went wrong!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl relative z-10">
        <Link
          href="/auth/register"
          className="mb-6 flex gap-2 text-blue-600 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Role Selection
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full shadow-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
              Instructor Registration
            </h1>
          </div>
          <p className="text-gray-600">
            Create your instructor account to start teaching
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Instructor Information</CardTitle>
            <CardDescription>Please fill in your details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Basic Fields */}
            {[
              { id: "name", label: "Full Name", icon: User, required: true },
              { id: "email", label: "Email", icon: Mail, required: true },
              { id: "phone", label: "Phone", icon: Phone, required: true },
            ].map(({ id, label, icon: Icon, required }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>
                  {label}{" "}
                  {required && <span className="text-destructive">*</span>}
                </Label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={id}
                    value={formData[id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    className="pl-10"
                    type={
                      id === "email" ? "email" : id === "phone" ? "tel" : "text"
                    }
                  />
                </div>
                {errors[id] && (
                  <p className="text-sm text-destructive">{errors[id]}</p>
                )}
              </div>
            ))}

            {/* Passwords */}
            {[
              {
                id: "password",
                label: "Password",
                show: showPassword,
                setShow: setShowPassword,
              },
              {
                id: "confirmPassword",
                label: "Confirm Password",
                show: showConfirmPassword,
                setShow: setShowConfirmPassword,
              },
            ].map(({ id, label, show, setShow }) => (
              <div key={id} className="space-y-2">
                <Label htmlFor={id}>
                  {label} <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={id}
                    type={show ? "text" : "password"}
                    value={formData[id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShow(!show)}
                  >
                    {show ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors[id] && (
                  <p className="text-sm text-destructive">{errors[id]}</p>
                )}
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold"
              size="lg"
            >
              {isSubmitting ? "Creating Account..." : "Create Instructor Account"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorRegistrationForm;
