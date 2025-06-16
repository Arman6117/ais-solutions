"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MdContactSupport, MdSend, MdCheck } from "react-icons/md";
import { Alert, AlertDescription } from "./ui/alert";

interface FormData {
  name: string;
  email: string;
  subject: string;

  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactSupportButton: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",

    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",

        message: "",
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <Dialog>
        <DialogTrigger asChild className="fixed z-30 bottom-10 right-16">
          <Button className="size-10 rounded-full cursor-pointer">
            <MdContactSupport className="size-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <MdCheck className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-green-700 mb-2">
              Message Sent Successfully!
            </DialogTitle>
            <p className="text-gray-600">
              Thank you for contacting us. We'll get back to you.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="fixed z-30 bottom-10 right-16">
        <Button className="size-10 rounded-full cursor-pointer">
          <MdContactSupport className="size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MdContactSupport className="w-5 h-5" />
            Contact Support
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("name", e.target.value)
                }
                placeholder="Your full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                placeholder="your.email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("subject", e.target.value)
              }
              placeholder="Brief description of your issue"
              className={errors.subject ? "border-red-500" : ""}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Inquiry Type and Priority Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange("message", e.target.value)
              }
              placeholder="Please describe your issue in detail..."
              rows={4}
              className={errors.message ? "border-red-500" : ""}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
              <p className="text-gray-500 text-sm ml-auto">
                {formData.message.length}/500
              </p>
            </div>
          </div>

          {/* Response Time Info */}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <MdSend className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportButton;
