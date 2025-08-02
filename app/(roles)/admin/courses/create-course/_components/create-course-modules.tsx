"use client";
import React, { useEffect, useState } from "react";

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
import {  Modules } from "@/lib/types/types";
import { useCreateCourseStore } from "@/store/use-create-course-store";
import { getAllModulesNames } from "@/actions/admin/modules/get-modules";

const CreateCourseModules = () => {
  const { modules, setModules } = useCreateCourseStore();
  const [availableModules,setAvailableModule] = useState<Modules[]>([])
  const fetchModule = async () => {
      try {
        const res = await getAllModulesNames()
        if(res.success) {

          setAvailableModule(res.data);      
        } else {
          setAvailableModule([])
        }
      } catch (error) {
        console.log(error)
      }
  }
  useEffect(()=> {
      fetchModule()
  },[])

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
          <SelectedModulesAccordion data={modules} />
        )}
      </CardContent>
      <CardFooter>
        <AddModuleButton modules={availableModules} setModules={setModules} />
      </CardFooter>
    </Card>
  );
};

export default CreateCourseModules;
