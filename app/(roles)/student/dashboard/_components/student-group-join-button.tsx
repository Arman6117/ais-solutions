import { Button } from "@/components/ui/button";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const StudentGroupJoinButton = () => {
  return (
    <div>
      <Button className="bg-soft-white cursor-pointer hover:bg-indigo-200 flex gap-1 max-w-16  items-center rounded-md shado-md p2 ">
        <FaWhatsapp className="text-primary-bg size-5" />
      </Button>
    </div>
  );
};

export default StudentGroupJoinButton;
