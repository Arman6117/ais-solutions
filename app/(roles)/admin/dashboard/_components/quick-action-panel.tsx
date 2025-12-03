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
import AddSalesPersonDialog from "./add-sales-person-dialog";
import Link from "next/link";

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
                <Link
                  href={"/admin/courses/create-course"}
                  className="flex group  items-center gap-2"
                >
                  <Button className="bg-primary-bg group-hover:bg-transparent  text-white cursor-pointer hover:text-black font-semibold">
                    <Plus className="group-hover:text-black text-white" />
                    Create New Course
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/admin/all-batches/create-batch"}
                  className="flex group  items-center gap-2"
                >
                  <Button className="bg-primary-bg group-hover:bg-transparent  text-white cursor-pointer hover:text-black font-semibold">
                    <Plus className="group-hover:text-black text-white" />
                    Create New Batch
                  </Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={"/admin/modules/create-module"}
                  className="flex group  items-center gap-2"
                >
                  <Button className="bg-primary-bg group-hover:bg-transparent  text-white cursor-pointer hover:text-black font-semibold">
                    <Plus className="group-hover:text-black text-white" />
                    Create New Module
                  </Button>
                </Link>
              </DropdownMenuItem>
            </div>
          </div>
          <Separator />

          <div className="flex flex-col gap-4 p-3">
            <h2 className="text-muted-foreground font-medium text-sm">Sales</h2>
            <div className="flex gap-5  flex-wrap ">
              <DropdownMenuItem asChild>
                <AddSalesPersonDialog />
              </DropdownMenuItem>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickActionPanel;
