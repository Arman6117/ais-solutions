"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Plus, Rocket, Users } from "lucide-react";
import React, { useState } from "react";
import AddSalesPersonDialog from "./add-sales-person-dialog";
import Link from "next/link";
import ManageSalesPersonsDialog from "./manage-sales-person-dialog";

const QuickActionPanel = () => {
  const [isSalesDialogOpen, setIsSalesDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isManageSalesDialogOpen, setIsManageSalesDialogOpen] = useState(false);
  const handleOpenSalesDialog = () => {
    setIsDropdownOpen(false); // Close dropdown
    // Use setTimeout to allow dropdown close animation/unmount to finish slightly before opening dialog
    setTimeout(() => setIsSalesDialogOpen(true), 100);
  };
  const handleOpenManageSalesDialog = () => {
    setIsDropdownOpen(false);
    setTimeout(() => setIsManageSalesDialogOpen(true), 100);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
                {/* 
                    Just a button here. 
                    onSelect ensures dropdown logic handles the click, 
                    but we preventDefault if we want manual control, 
                    or let it close and trigger our handler.
                */}
                <DropdownMenuItem 
                    onSelect={(e) => {
                        e.preventDefault(); // Prevent auto-close if we want to handle it manually, but here we want to close it.
                        handleOpenSalesDialog();
                    }}
                    className="p-0 focus:bg-transparent"
                >
                   <Button 
                    className="bg-primary-bg group text-white cursor-pointer hover:text-black hover:bg-white font-semibold transition-colors border border-transparent hover:border-primary-bg"
                   >
                    <Plus className="group-hover:text-black text-white mr-2 h-4 w-4" />
                    Add New Sales Person
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleOpenManageSalesDialog();
                  }}
                  className="p-0 focus:bg-transparent"
                >
                  <Button 
                    variant="outline"
                    className="text-gray-700 cursor-pointer hover:text-violet-700 hover:bg-violet-50 font-semibold border-gray-300"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Manage Sales Team
                  </Button>
                </DropdownMenuItem>

              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog Rendered Outside Dropdown */}
      <AddSalesPersonDialog 
        open={isSalesDialogOpen} 
        onOpenChange={setIsSalesDialogOpen} 
      />
       <ManageSalesPersonsDialog 
        open={isManageSalesDialogOpen}
        onOpenChange={setIsManageSalesDialogOpen}
      />
    </>
  );
};

export default QuickActionPanel;
