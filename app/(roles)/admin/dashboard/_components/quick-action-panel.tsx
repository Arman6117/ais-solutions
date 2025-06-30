import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Plus, Rocket } from "lucide-react";
import React from "react";

const QuickActionPanel = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline" className="w-14 h-10 cursor-pointer p-2 ">
          <Rocket className="size-6 text-violet-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-2  max-w-md">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 p-3">
            <h2 className="text-muted-foreground font-medium text-sm">
              Courses,Batches and Modules
            </h2>
            <div className="flex gap-5  flex-wrap ">
              <DropdownMenuItem asChild>
                <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
                  <Plus className="group-hover:text-black text-white" />
                  Create New Course
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
                  <Plus className="group-hover:text-black text-white" />
                  Create New Batch
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
                  <Plus className="group-hover:text-black text-white" />
                  Create Module
                </Button>
              </DropdownMenuItem>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-4 p-3">
            <h2 className="text-muted-foreground font-medium text-sm">
              Student,Sessions and Notes
            </h2>
            <div className="flex gap-5  flex-wrap ">
              <DropdownMenuItem asChild>
                <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
                  <Plus className="group-hover:text-black text-white" />
                  Pending Student Requests
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
                  <Plus className="group-hover:text-black text-white" />
                  Post A Session Link
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
                  <Plus className="group-hover:text-black text-white" />
                  Add New Note
                </Button>
              </DropdownMenuItem>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickActionPanel;
