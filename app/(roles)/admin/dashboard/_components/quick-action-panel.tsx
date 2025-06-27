import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Rocket } from "lucide-react";
import React from "react";

const QuickActionPanel = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className=" cursor-pointer p-2 relative">
          <Rocket className="size-4 text-violet-600" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-2  max-w-md">
        <div className="flex flex-col gap-4">
         <h2 className="text-muted-foreground">Courses,Batches and Modules</h2>
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
        <DropdownMenuItem asChild>
          <Button className="bg-primary-bg group text-white cursor-pointer hover:text-black font-semibold">
            <Plus className="group-hover:text-black text-white" />
            Add a student
          </Button>
        </DropdownMenuItem>
         </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickActionPanel;
