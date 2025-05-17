"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import InfoWrapper from "@/components/info-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import { cn, formatCurrency } from "@/lib/utils";
import { DummyModules } from "@/lib/types";

import {
  PencilIcon,
  RefreshCcw,
  Save,
  Users,
  X,
  BadgeIndianRupeeIcon,
  PercentCircle,
  BookOpen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ModuleCoursesCard from "./module-courses-cards";
import ModuleChapters from "./module-chapters";
import { dummyChapters } from "@/lib/static";
import EditInfo from "@/components/edit-info";
import { Input } from "@/components/ui/input";
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
          <h2 className="text-2xl font-bold mb-2">No Modumodule Selected</h2>
          <p className="text-muted-foreground">Please select a Module</p>
          <Button className="mt-4 bg-primary-bg" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const [name, setName] = useState(module.name || "");
  //   const [description, setDescription] = useState(module.description || "");
  const [price, setPrice] = useState(module.price || 0);
  const [discount, setDiscount] = useState(module.discount || 0);
  const [courses, setCourses] = useState(module.course || []);
  const [offerPrice, setOfferPrice] = useState(
    price - (price * discount) / 100 || 0
  );
  const [chapter, setChapter] = useState(dummyChapters || []);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSave = () => {
    //TODO:Handle saving logic and API call here
    setIsLoading(true);
    toast.success("Changes saved successfully!");
    setIsLoading(false);
    setMode("view");
  };
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full p-4 mb-4">
      <div className="flex flex-col w-full">
        <Card className="px-2">
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
                    "Edit Module"
                  ) : (
                    <p className="mt-7">View Module Details</p>
                  )}
                </CardTitle>
                {mode === "edit" ? (
                  <p className="text-muted-foreground mt-1 text-center">
                    Edit the module details. You can update name, description,
                    price, and more.
                  </p>
                ) : (
                  <p className="mt-1 ml-1">View the module details below</p>
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
                    onClick={() => router.back()}
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
          <CardContent className="p-8 space-y-6">
            <div className="flex flex-col gap-14">
              {mode === "view" ? (
                <>
                  <InfoWrapper
                    className="max-w-full"
                    label="Name"
                    icon={<Users className="text-indigo-600" size={20} />}
                  >
                    {name}
                  </InfoWrapper>
                </>
              ) : (
                <EditInfo
                  label="Name"
                  icon={<Users className="text-indigo-600" size={20} />}
                >
                  <Input
                    placeholder="Enter module name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="focus-visible:ring-0"
                  />
                </EditInfo>
              )}
              {/* //TODO:Add description */}
              {mode === "view" ? (
                <div className="grid md:grid-cols-2 gap-7">
                  <InfoWrapper
                    icon={
                      <BadgeIndianRupeeIcon
                        className="text-indigo-600"
                        size={20}
                      />
                    }
                    label="Price"
                  >
                    {price}
                  </InfoWrapper>
                  <InfoWrapper
                    icon={
                      <PercentCircle className="text-indigo-600" size={20} />
                    }
                    label="Discount"
                  >
                    {discount}%
                  </InfoWrapper>
                  <InfoWrapper
                    icon={
                      <BadgeIndianRupeeIcon
                        className="text-indigo-600"
                        size={20}
                      />
                    }
                    label="Offer Price"
                  >
                    {offerPrice}
                  </InfoWrapper>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-7">
                  <EditInfo
                    label="Price"
                    icon={
                      <BadgeIndianRupeeIcon
                        className="text-indigo-600"
                        size={20}
                      />
                    }
                  >
                    <Input
                      placeholder="Enter price name"
                      onChange={(e) => setPrice(Number(e.target.value))}
                      type="number"
                      value={price}
                      className="focus-visible:ring-0"
                    />
                  </EditInfo>
                  <EditInfo
                    label="Discount"
                    icon={
                      <PercentCircle className="text-indigo-600" size={20} />
                    }
                  >
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter Discount in %"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        className="font-medium pr-8"
                        min="0"
                        max="100"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </EditInfo>
                  <EditInfo
                    label="Discount"
                    icon={
                      <PercentCircle className="text-indigo-600" size={20} />
                    }
                  >
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ₹
                      </span>
                      <Input
                        type="number"
                        readOnly
                        placeholder="Offer Price"
                        value={offerPrice}
                        className="font-medium pl-8 bg-gray-50"
                      />
                    </div>
                    {discount > 0 && (
                      <p className="text-sm text-green-600">
                        {discount}% off ({formatCurrency(price - offerPrice)}{" "}
                        discount)
                      </p>
                    )}
                  </EditInfo>
                </div>
              )}
            </div>
            <Separator />
            <ModuleChapters mode={mode} chapter={chapter} />
            <Separator />

            <ModuleCoursesCard
              mode={mode}
              courses={courses}
              // itemsPerPage={4}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModuleDetails;
