"use client";

import { sendAdminOTPEmail } from "@/actions/admin/send-admin-otp-email";
import { verifyAdminOtp } from "@/actions/admin/verify-admin-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    setSendingEmail(true);
    setError("");

    try {
      const res = await sendAdminOTPEmail(email);
      if (!res.success) {
        setError(res.message);
      } else {
        toast.success(res.message);
        setShowOtpForm(true);
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    } finally {
      setSendingEmail(false); // Always reset
    }
  };
  const handleVerifyOtp = async () => {
    setVerifyingOTP(true);
    try {
      const res = await verifyAdminOtp(otp);
      if (res.success) {
        toast.success(res.message);
        router.push("/admin/dashboard");
      } else {
        setError(res.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong");
    } finally {
      setVerifyingOTP(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/auth/login"
          className="mb-6 flex items-center gap-2 text-purple-600 font-medium"
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
              Admin Login
            </h1>
          </div>
          <p className="text-gray-600">Enter your email to get the OTP </p>
        </div>

        {showOtpForm ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Login to your admin account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">OTP</Label>
                <div className="relative">
                  {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /> */}
                  <InputOTP maxLength={6} onChange={(e) => setOtp(e)}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button
                  onClick={handleVerifyOtp}
                  disabled={verifyingOTP}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
                  size="lg"
                >
                  {verifyingOTP ? "Verifying OTP..." : "Verify OTP"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>Login to your admin account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your email"
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={sendingEmail}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold"
                  size="lg"
                >
                  {sendingEmail ? "Sending OTP..." : "Send OTP"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminLoginForm;
