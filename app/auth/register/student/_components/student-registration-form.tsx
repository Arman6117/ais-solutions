"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { registerStudent } from "@/actions/student/register-student";

import {
  ArrowLeft,
  Camera,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  Upload,
  User,
  Users,
  X,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profilePicture: "Please select an image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profilePicture: "File size must be < 5MB",
        }));
        return;
      }

      setProfilePicture(file);
      const reader = new FileReader();
      reader.onload = (e) => setProfilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    setProfilePreview(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (profilePicture) data.append("profilePic", profilePicture);

      // console.log(data.get('profilePicture'))
      const res = await registerStudent(data);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        router.push("/auth/login/student");
      } else {
        toast.error(res.message);
        setErrors(res.error || {});
      }
    } catch (error) {
      console.log(error)
      setErrors({ submit: "Something went wrong!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl relative z-10">
        <Link
          href="/auth/register"
          className="mb-6 flex gap-2 text-purple-600 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Role Selection
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-600 rounded-full shadow-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
              Student Registration
            </h1>
          </div>
          <p className="text-gray-600">
            Create your student account to start learning
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Please fill in your details</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Profile Picture */}
            <div className="space-y-2">
              <Label>Profile Picture (Optional)</Label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {profilePreview ? (
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-purple-100">
                      <Image
                        src={profilePreview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={removeProfilePicture}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-4 border-border">
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profilePicture"
                  />
                  <Label
                    htmlFor="profilePicture"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 cursor-pointer font-medium"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </Label>
                  <p className="text-xs text-muted-foreground">Max size: 5MB</p>
                </div>
              </div>
              {errors.profilePicture && (
                <p className="text-sm text-destructive">
                  {errors.profilePicture}
                </p>
              )}
            </div>

            {/* Fields */}
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

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">
                Gender <span className="text-destructive">*</span>
              </Label>
              <Select
                onValueChange={(value) => handleInputChange("gender", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-sm text-destructive">{errors.gender}</p>
              )}
            </div>

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

            {/* Referral */}
            <div className="space-y-2">
              <Label htmlFor="referralCode">Referral Code</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="referralCode"
                  value={formData.referralCode}
                  onChange={(e) =>
                    handleInputChange("referralCode", e.target.value)
                  }
                  className="pl-10"
                  placeholder="Enter referral code if any"
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
              size="lg"
            >
              {isSubmitting ? "Creating Account..." : "Create Student Account"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
