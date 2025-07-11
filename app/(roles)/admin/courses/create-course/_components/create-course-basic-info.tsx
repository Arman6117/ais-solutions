"use client";
import React, { useEffect, useState } from "react";

import CourseModeSelector from "./course-mode-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { formatCurrency } from "@/lib/utils";
import { formatDistance } from "date-fns";

import { MdOutlineClass } from "react-icons/md";
import {
  BookOpen,
  Calendar1,
  CalendarCheck,
  CalendarClock,
  IndianRupee,
  Percent,
  Text,
} from "lucide-react";

import { Mode } from "@/lib/types";
import { useCreateCourseStore } from "@/store/use-create-course-store";

const CreateCourseBasicInfo = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const {
    courseName,
    courseDescription,
    coursePrice,
    courseDiscount,
    courseOfferPrice,
    courseStartDate,
    courseEndDate,
    courseThumbnail,
    courseSyllabusLink,
    setBasicInfo,
  } = useCreateCourseStore();

  const [courseDuration, setCourseDuration] = useState(
    formatDistance(courseStartDate ?? new Date(), courseEndDate ?? new Date())
  );
  useEffect(() => {
    setBasicInfo({
      courseOfferPrice: Math.round(
        coursePrice - (coursePrice * courseDiscount) / 100
      ),
    });
  }, [coursePrice, courseDiscount]);
  useEffect(() => {
    setCourseDuration(
      formatDistance(courseStartDate ?? new Date(), courseEndDate ?? new Date())
    );
  }, [courseStartDate, courseEndDate]);
  return (
    <Card className="px-5 mt-7 w-full h-auto py-3">
      <CardContent className="p-2 w-full">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">Basic info for course</CardTitle>
        </CardHeader>
        <div className="flex flex-col mt-5">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3 justify-center">
              <Label className="text-lg flex gap-2 items-center">
                <BookOpen />
                Course Name*
              </Label>
              <Input
                value={courseName}
                onChange={(e) => setBasicInfo({ courseName: e.target.value })}
                required
                type="text"
                placeholder="Enter course name"
                className="focus w-64 ml-5 transition-all sm:w-96 border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
              />
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <Label className="text-lg flex gap-2 items-center">
                <Text />
                Course Description*
              </Label>
              <Textarea
                value={courseDescription}
                onChange={(e) =>
                  setBasicInfo({ courseDescription: e.target.value })
                }
                required
                placeholder="Enter course description"
                className="focus w-64 ml-5 sm:w-96 transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
              />
            </div>
            <div className="flex sm:flex-row flex-col justify-between items-center max-w-2xl">
              <div className="flex flex-col gap-3 justify-center">
                <Label className="text-lg flex gap-2 items-center">
                  <IndianRupee />
                  Course Price*
                </Label>
                <div className="relative">
                  <IndianRupee className="absolute size-4 left-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    value={coursePrice}
                    type="number"
                    onChange={(e) =>
                      setBasicInfo({ coursePrice: Number(e.target.value) })
                    }
                    required
                    placeholder="Enter course description"
                    className="focus pl-6 w-64 ml-5 sm:w-96 relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <Label className="text-lg flex gap-2 items-center">
                  <Percent />
                  Course Discount
                </Label>
                <div className="relative">
                  <Percent className="absolute size-4 left-6 top-1/2 transform -translate-y-1/2 text-green-500" />
                  <Input
                    value={courseDiscount}
                    type="number"
                    onChange={(e) =>
                      setBasicInfo({ courseDiscount: Number(e.target.value) })
                    }
                    placeholder="Enter course description"
                    className="focus pl-6 w-64 ml-5 sm:w-96 relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
                  />
                  {courseDiscount > 0 && (
                    <p className="text-sm text-green-600 ml-5 absolute">
                      {courseDiscount}% off (
                      {formatCurrency(coursePrice - courseOfferPrice)} Discount)
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <Label className="text-lg flex gap-2 items-center">
                <IndianRupee />
                Course Offer Price
              </Label>
              <div className="relative">
                <IndianRupee className="absolute size-4 left-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  value={courseOfferPrice}
                  type="number"
                  readOnly
                  placeholder="Enter course description"
                  className="focus pl-6 w-64 ml-5 sm:w-96 relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <Label className="text-lg flex gap-2 items-center">
                <BookOpen />
                Course Syllabus Link
              </Label>
              <Input
                type="url"
                value={courseSyllabusLink}
                onChange={(e) =>
                  setBasicInfo({ courseSyllabusLink: e.target.value })
                }
                placeholder="Paste Google Drive link or file URL"
                className="focus w-64 ml-5 sm:w-96 transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
              />
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <Label className="text-lg flex gap-2 items-center">
                <BookOpen />
                Course Thumbnail
              </Label>
              <div className="flex sm:flex-row flex-col items-center gap-5 ml-5">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setBasicInfo({ courseThumbnail: file });
                      const imageUrl = URL.createObjectURL(file);
                      setThumbnailPreview(imageUrl); // this is local state
                    }
                  }}
                  className="focus w-64 sm:w-96 transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
                />
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-32 h-32 rounded object-cover border"
                  />
                )}
              </div>
            </div>

            <div className="flex w-full sm:flex-row flex-col  gap-7 justify-between sm:items-center max-w-3xl">
              <div className="flex flex-col gap-3 justify-center">
                <Label className="text-lg flex gap-2 items-center">
                  <MdOutlineClass className="size-6" />
                  Course Mode
                </Label>
                <CourseModeSelector />
              </div>
              <div className="flex flex-col gap-3 justify-center">
                <Label className="text-lg flex gap-2 items-center">
                  <Calendar1 />
                  Course Start Date
                </Label>
                <Input
                  type="date"
                  onChange={(e) =>
                    setBasicInfo({ courseStartDate: new Date(e.target.value) })
                  }
                  className="focus  ml-5  relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
                />
              </div>
              <div className="flex flex-col gap-3  justify-center">
                <Label className="text-lg flex gap-2 items-center">
                  <CalendarCheck />
                  Course End Date
                </Label>
                <Input
                  //   value={String(courseStartDate)}
                  type="date"
                  onChange={(e) =>
                    setBasicInfo({ courseEndDate: new Date(e.target.value) })
                  }
                  className="focus  ml-5  relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3  justify-center">
              <Label className="text-lg flex gap-2 items-center">
                <CalendarClock />
                Course Duration
              </Label>
              <Input
                value={courseDuration}
                readOnly
                placeholder="Enter course description"
                className="focus w-64 ml-5 sm:w-96 relative  transition-all border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateCourseBasicInfo;
