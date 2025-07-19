"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import InfoWrapper from "@/components/info-wrapper";
import EditInfo from "@/components/edit-info";
import ModuleChapters from "./module-chapters";
import CoursesCards from "../../../../../components/courses-cards";

import { prModule } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  BookOpen,
  CalendarClock,
  BadgeIndianRupeeIcon,
  PercentCircle,
  Users,
  AlertTriangle,
  Link2,
  Text,
} from "lucide-react";
import Link from "next/link";
import { updateModules } from "@/actions/admin/modules/update-modules";
import DeleteDialog from "@/components/delete-selected-dialog";
import { deleteModules } from "@/actions/admin/modules/delete-module";

type ModuleDetailsProps = {
  module: prModule | undefined;
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
  const [offerPrice, setOfferPrice] = useState(
    price - (price * discount) / 100
  );
  const [chapter, setChapter] = useState(module.chapters || []);
  const [syllabusLabel, setSyllabusLabel] = useState(
    module.syllabusLabel || ""
  );
  const [syllabusLink, setSyllabusLink] = useState(module.syllabusLink || "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setOfferPrice(price - (price * discount) / 100);
  }, [price, discount]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await updateModules({
        syllabusLabel,
        syllabusLink,
        chapters: chapter,
        description,
        discount,
        moduleId: module._id,
        name,
        price,
      });
      if (!res.success) {
        toast.error(res.message);
      } else {
        toast.success("Changes saved successfully!");
        setMode("view");
      }
    } catch (error) {
      toast.error("Something went wrong while updating..");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteModule = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteModules(module._id);
      if (res.success) {
        toast.success("Module deleted successfully");
        router.push("/admin/modules");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting module");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
      <div className="flex flex-col w-full">
        <Card className="px py-0">
          <CardHeader
            className={cn(
              "bg-gray-50 border-b p-5",
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
                    <Button variant="outline" onClick={() => router.back()}>
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
                    <DeleteDialog
                      className="text-white bg-destructive border-none"
                      singleId={module._id}
                      onDelete={handleDeleteModule}
                    />
                    {/* <Button
                      variant="destructive"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button> */}
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
                    {module.createdAt}
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
                  <InfoWrapper
                    label="Price"
                    icon={<BadgeIndianRupeeIcon size={18} />}
                  >
                    ₹{price}
                  </InfoWrapper>
                  <InfoWrapper
                    label="Discount"
                    icon={<PercentCircle size={18} />}
                  >
                    {discount}%
                  </InfoWrapper>
                  <InfoWrapper
                    label="Offer Price"
                    icon={<BadgeIndianRupeeIcon size={18} />}
                  >
                    ₹{offerPrice}
                  </InfoWrapper>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <EditInfo
                    label="Price"
                    icon={<BadgeIndianRupeeIcon size={18} />}
                  >
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </EditInfo>

                  <EditInfo
                    label="Discount (%)"
                    icon={<PercentCircle size={18} />}
                  >
                    <Input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                    />
                  </EditInfo>
                </div>
              )}
              <div>
                <div className="flex justify-between">
                  {mode === "view" ? (
                    <div className="flex flex-col gap-2">
                      <InfoWrapper
                        label="Module Syllabus"
                        icon={<Link2 size={18} />}
                      >
                        <Link
                          href={syllabusLink || "#"}
                          className="text-lg font-semibold hover:text-primary-bg"
                        >
                          {syllabusLabel ? syllabusLabel : "No Link Provided"}
                        </Link>
                      </InfoWrapper>
                    </div>
                  ) : (
                    <EditInfo
                      label="Module Syllabus"
                      className="flex  gap-7  "
                      icon={<Link2 size={18} />}
                    >
                      <div className="flex md:flex-row gap-10 flex-col ">
                        <EditInfo label="Label" icon={<Text size={18} />}>
                          <Input
                            type="text"
                            value={syllabusLabel}
                            placeholder="Enter link label"
                            onChange={(e) => setSyllabusLabel(e.target.value)}
                          />
                        </EditInfo>
                        <EditInfo label="Link" icon={<Link2 size={18} />}>
                          <Input
                            type="text"
                            value={syllabusLink}
                            placeholder="Enter link"
                            onChange={(e) => setSyllabusLink(e.target.value)}
                          />
                        </EditInfo>
                      </div>
                    </EditInfo>
                  )}
                </div>
              </div>
              <Separator />
              <ModuleChapters
                chapter={chapter}
                setChapter={setChapter}
                mode={mode}
              />
              <Separator />
              <CoursesCards mode={mode} label="Course Usage" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModuleDetails;
