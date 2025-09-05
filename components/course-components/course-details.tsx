"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  EditCourseDescription,
  EditCourseDiscount,
  EditCourseDuration,
  EditCourseMode,
  EditCourseName,
  EditCourseOfferPrice,
  EditCoursePrice,
  EditCourseThumbnail,
} from "./edit-course-components";
import { Separator } from "../ui/separator";
import CourseInstructorsCards from "@/components/instructors-cards";
import CourseBatchesCards from "@/app/(roles)/admin/courses/_components/course-batches-cards";
import CourseModulesCard from "@/components/modules-card";
import CourseStatusCard from "@/components/status-card";
import {
  ViewCourseDescription,
  ViewCourseDiscountAndOfferPrice,
  ViewCourseDuration,
  ViewCourseNameAndPrice,
  ViewCourseThumbnail,
} from "./view-course-components";

import {
  Course,
  DummyBatches,
  DummyInstructors,
  Mode,
  prCourse,
} from "@/lib/types/types";
import { cn } from "@/lib/utils";

import { PencilIcon, RefreshCcw, Save, X } from "lucide-react";
import CourseSyllabusCard from "@/app/(roles)/admin/courses/course-details/_components/course-syllabus-card";
import { formatDistance } from "date-fns";
import { updateCourse } from "@/actions/admin/course/update-course";
import CourseModules from "./course-modules";
import { getCourseModules } from "@/actions/admin/course/get-course-modules";
import { CourseModule, FormattedCourse } from "@/lib/types/course.type";

type CourseDetailsProps = {
  course: FormattedCourse | undefined;
  dummyBatches: DummyBatches[];
  dummyInstructors: DummyInstructors[];
};

const CourseDetails = ({
  dummyBatches,
  course,
  dummyInstructors,
}: CourseDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMode = searchParams.get("mode") === "edit" ? "edit" : "view";
  const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  if (!course) {
    return (
      <div className="p-8 flex w-full items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Course Selected</h2>
          <p className="text-muted-foreground">
            Please select a course to edit
          </p>
          <Button className="mt-4 bg-primary-bg" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  const [name, setName] = useState(course.courseName || "");
  const [courseMode, setCourseMode] = useState<Mode>(course.courseMode);
  const [startDate, setStartDate] = useState<string>(course.courseStartDate);
  const [endDate, setEndDate] = useState<string>(course.courseEndDate);
  const [courseDuration, setCourseDuration] = useState(
    formatDistance(startDate ?? new Date(), endDate ?? new Date())
  );
  const [description, setDescription] = useState(
    course.courseDescription || ""
  );
  const [syllabusLink, setSyllabusLink] = useState(course.syllabusLink || "");
  const [price, setPrice] = useState(course.coursePrice || 0);
  const [discount, setDiscount] = useState(course.courseDiscount || 0);
  const [offerPrice, setOfferPrice] = useState(
    price - (price * discount) / 100 || 0
  );
  const [instructors, setInstructors] = useState(dummyInstructors || []);
  const [batches, setBatches] = useState(dummyBatches || []);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchModules = async () => {
    try {
      const res = await getCourseModules(course._id);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setModules(res.data);
      toast.success("Modules fetched successfully");
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Something went wrong while fetching modules");
    }
  };
  useEffect(() => {
    fetchModules();
  }, [course]);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOfferPrice(price - (price * discount) / 100);
  }, [price, discount]);
  useEffect(() => {
    setCourseDuration(
      formatDistance(startDate ?? new Date(), endDate ?? new Date())
    );
  }, [startDate, endDate]);
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateCourse({
        courseId: course._id,
        courseDescription: description,
        courseDiscount: discount,
        courseEndDate: endDate,
        courseMode,
        courseName: name,
        courseOfferPrice: offerPrice,
        coursePrice: price,
        courseStartDate: startDate,
        // courseThumbnail,
        //modules
        syllabusLink,
      });
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setMode("view");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
      <div className="w-full  flex-grow">
        <Card className="border-0 shadow-md p-0">
          <CardHeader
            className={cn(
              "bg-gray-50 border-b",
              mode === "view" && "bg-primary-bg rounded-lg  text-white h-full"
            )}
          >
            <div className="flex md:flex-row flex-col items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {mode === "edit" ? (
                    "Edit Course"
                  ) : (
                    <p className="mt-7">View Course Details</p>
                  )}
                </CardTitle>
                {mode === "edit" ? (
                  <p className="text-muted-foreground mt-1 text-center">
                    Edit the course details. You can update name, description,
                    price, and more.
                  </p>
                ) : (
                  <p className="mt-1 ml-1">View the course details below</p>
                )}
              </div>
              {mode === "edit" ? (
                <div className="flex gap-2">
                  <Button
                    className="bg-primary-bg hover:bg-primary-bg/90 gap-2 cursor-pointer"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCcw size={16} className="animate-spin" />
                    ) : (
                      <Save size={16} />
                    )}
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 cursor-pointer"
                    onClick={() => setMode("view")}
                  >
                    <X size={16} className="mr-1" /> Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  className="bg-white  text-black hover:text-white cursor-pointer"
                  onClick={() => setMode("edit")}
                >
                  <PencilIcon size={16} className="mr-1" /> Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mode === "edit" ? (
                <>
                  <EditCourseName name={name} setName={setName} />
                  <EditCoursePrice price={price} setPrice={setPrice} />
                </>
              ) : (
                <>
                  <ViewCourseNameAndPrice name={name} price={price} />
                </>
              )}
            </div>
            {mode === "view" && <Separator className="w-full mt-10" />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mode === "edit" ? (
                <>
                  <EditCourseDiscount
                    discount={discount}
                    setDiscount={setDiscount}
                  />
                  <EditCourseOfferPrice
                    discount={discount}
                    offerPrice={offerPrice}
                    price={price}
                  />
                </>
              ) : (
                <ViewCourseDiscountAndOfferPrice
                  discount={discount}
                  offerPrice={offerPrice}
                />
              )}
            </div>
            {mode === "edit" ? (
              <>
                <EditCourseDuration
                  startDate={startDate}
                  endDate={endDate}
                  duration={courseDuration}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
                <EditCourseDescription
                  description={description}
                  setDescription={setDescription}
                />
                <EditCourseMode mode={courseMode} setMode={setCourseMode} />
              </>
            ) : (
              <>
                <Separator className="my-6" />
                <ViewCourseDuration
                  startDate={startDate}
                  endDate={endDate}
                  duration={courseDuration}
                />
                <Separator className="my-6" />
                <ViewCourseDescription description={description} />
                <div className="space-y-2 mt-0">
                  <Separator className="my-6" />
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-2xl font-bold text-neutral-800">
                        Mode
                      </h1>
                      <p className="md:text-xl  border-none focus-visible:border-none focus-visible:ring-0 font-semibold">
                        Hybrid
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <CourseSyllabusCard
              setSyllabusLink={setSyllabusLink}
              syllabusLink={syllabusLink}
              mode={mode}
            />
            <CourseModules
              courseId={course._id}
              initialModules={modules}
              mode={mode}
            />
            <div className="w-full  space-y-6">
              {mode === "edit" ? (
                <EditCourseThumbnail
                  setThumbnail={() => {}}
                  thumbnail={course.courseThumbnail as string}
                />
              ) : (
                <ViewCourseThumbnail
                  thumbnail={course.courseThumbnail as string}
                />
              )}

              <CourseStatusCard
                name="Course"
                batches={batches}
                course={course}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetails;
