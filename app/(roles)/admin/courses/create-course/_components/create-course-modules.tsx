"use client";
import React, { useState } from "react";

import AddModuleButton from "@/components/add-module-button";
import SelectedModulesAccordion from "./selected-modules-accoridian";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DummyModules } from "@/lib/types";
import { useCreateCourseStore } from "@/store/use-create-course-store";

const CreateCourseModules = () => {
  const { modules, setModules } = useCreateCourseStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Modules</CardTitle>
        <CardDescription>Add modules to this batch</CardDescription>
      </CardHeader>
      <CardContent className="min-h-40 flex flex-col items-center justify-center  rounded-md">
        {modules.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No modules added yet</p>
          </div>
        ) : (
          <SelectedModulesAccordion modules={modules} />
        )}
      </CardContent>
      <CardFooter>
        <AddModuleButton setModules={setModules} />
      </CardFooter>
    </Card>
  );
};

export default CreateCourseModules;
