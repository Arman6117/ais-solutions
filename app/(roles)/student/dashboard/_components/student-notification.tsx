import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import React from "react";
import { IoClose, IoNotifications } from "react-icons/io5";

const StudentNotification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-soft-white cursor-pointer hover:bg-indigo-200 flex gap-1 max-w-16  items-center rounded-md shado-md p2 ">
          <BellIcon className="text-primary-bg size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 w-64">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex gap-2 items-center">
            <div className="bg-soft-white p-2 flex gap-2 items-center rounded-md ">
              <IoNotifications className="text-primary-bg" />
              <span className="text-sm font-medium text-neutral-800">
                Meeting name has started
              </span>
            </div>
            <Button
              variant={"outline"}
              size={"sm"}
              className="size-6 cursor-pointer hover:bg-destructive transition-colors"
            >
              <IoClose />
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StudentNotification;
