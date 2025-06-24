"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import InfoWrapper from "@/components/info-wrapper";
import EditInfo from "@/components/edit-info";
import ModuleChapters from "./module-chapters";
import CoursesCards from "../../../../../components/courses-cards";

import { dummyChapters } from "@/lib/static";
import { DummyModules } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import {
  PencilIcon,
  RefreshCcw,
  Save,
  X,
  Trash2,
  Star,
  BookOpen,
  CalendarClock,
  BadgeIndianRupeeIcon,
  PercentCircle,
  FileDown,
  FileUp,
  Users,
  AlertTriangle,
} from "lucide-react";

type ModuleDetailsProps = {
  module: DummyModules | undefined;
};

const ModuleDetails = ({ module }: ModuleDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultMode = searchParams.get("mode") === "edit" ? "edit" : "view";
  const [mode, setMode] = useState<"edit" | "view">(defaultMode);

  if (!module) {
    return (
      <div className="p-8 flex w-full items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No Module Selected</h2>
          <p className="text-muted-foreground">Please select a Module</p>
          <Button className="mt-4 bg-primary-bg" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const [name, setName] = useState(module.name || "");
  const [description, setDescription] = useState(module.description || "");
  const [price, setPrice] = useState(module.price || 0);
  const [discount, setDiscount] = useState(module.discount || 0);
  const [createdAt] = useState(
    module.createdAt || new Date().toISOString().split("T")[0]
  );
  const [offerPrice, setOfferPrice] = useState(
    price - (price * discount) / 100
  );
  const [chapter, setChapter] = useState(dummyChapters || []);
  const [syllabusFileName, setSyllabusFileName] = useState(
    "module_syllabus.pdf"
  );
  const [syllabusFile, setSyllabusFile] = useState<File | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setOfferPrice(price - (price * discount) / 100);
  }, [price, discount]);

  const handleSave = () => {
    setIsLoading(true);
    toast.success("Changes saved successfully!");
    setIsLoading(false);
    setMode("view");
  };

  const handleSyllabusUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSyllabusFile(file);
      setSyllabusFileName(file.name);
      toast.success(`Syllabus file "${file.name}" selected`);
    }
  };

  const handleDownloadSyllabus = () => {
    toast.success(`Downloading ${syllabusFileName}`);
  };

  const handleDeleteModule = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      toast.success("Module deleted successfully");
      router.back();
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
      <div className="flex flex-col w-full">
        <Card className="px-2">
          <CardHeader
            className={cn(
              "bg-gray-50 border-b",
              mode === "view" && "bg-primary-bg rounded-lg text-white"
            )}
          >
            <div className="flex md:flex-row flex-col items-center justify-between">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {mode === "edit" ? "Edit Module" : "View Module Details"}
                </CardTitle>
                <p className="mt-1">
                  {mode === "edit"
                    ? "Edit the module details including description"
                    : "Review module information"}
                </p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                {mode === "edit" ? (
                  <>
                    <Button onClick={handleSave} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RefreshCcw size={16} className="animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      <X size={16} className="mr-1" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => setMode("edit")}>
                      <PencilIcon size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <div className="space-y-6">
              {mode === "view" ? (
                <>
                  <InfoWrapper label="Name" icon={<Users size={18} />}>
                    {name}
                  </InfoWrapper>

                  <InfoWrapper
                    label="Description"
                    icon={<BookOpen size={18} />}
                  >
                    {description || "No description provided."}
                  </InfoWrapper>

                  <InfoWrapper
                    label="Created At"
                    icon={<CalendarClock size={18} />}
                  >
                    {new Date(createdAt).toLocaleDateString()}
                  </InfoWrapper>
                </>
              ) : (
                <>
                  <EditInfo label="Name" icon={<Users size={18} />}>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter module name"
                    />
                  </EditInfo>

                  <EditInfo label="Description" icon={<BookOpen size={18} />}>
                    <Textarea
                      placeholder="Enter module description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </EditInfo>
                </>
              )}

              <Separator />

              {mode === "view" ? (
                <div className="grid md:grid-cols-3 gap-6">
                  <InfoWrapper label="Price" icon={<BadgeIndianRupeeIcon size={18} />}>
                    ₹{price}
                  </InfoWrapper>
                  <InfoWrapper label="Discount" icon={<PercentCircle size={18} />}>
                    {discount}%
                  </InfoWrapper>
                  <InfoWrapper label="Offer Price" icon={<BadgeIndianRupeeIcon size={18} />}>
                    ₹{offerPrice}
                  </InfoWrapper>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <EditInfo label="Price" icon={<BadgeIndianRupeeIcon size={18} />}>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </EditInfo>

                  <EditInfo label="Discount (%)" icon={<PercentCircle size={18} />}>
                    <Input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                  </EditInfo>
                </div>
              )}

              <Separator />
              <ModuleChapters chapter={chapter} setChapter={setChapter} mode={mode} />
              <Separator />
              <CoursesCards mode={mode} label="Course Usage" />
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 flex gap-2 items-center">
              <AlertTriangle size={18} />
              Delete Module
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the module. Are you sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDeleteModule}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Module"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ModuleDetails;
