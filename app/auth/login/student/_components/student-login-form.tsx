"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loginStudent } from "@/actions/student/login-student";

const StudentLoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const updated = { ...errors };
      delete updated[field];
      setErrors(updated);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const data = new FormData();
      data.append("email", formData.email.toLowerCase());
      data.append("password", formData.password);

      const res = await loginStudent(data);

      if (res.success) {
        toast.success("Login successful!");
        router.push("/student/dashboard");
      } else {
        toast.error(res.message || "Login failed");
        if (res.error) setErrors(res.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/auth/login"
          className="mb-6 flex gap-2 text-purple-600 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Role Selection
        </Link>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-600 rounded-full shadow-lg">
              <LogIn className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
              Student Login
            </h1>
          </div>
          <p className="text-gray-600">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to your student account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email.toLowerCase()}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center flex-col justify-center gap-4">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
                size="lg"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <Link href={'/auth/forgot-password'}  >Forgot Password?</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentLoginForm;
