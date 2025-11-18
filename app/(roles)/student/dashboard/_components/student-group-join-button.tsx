import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
export const revalidate = 60;
const StudentGroupJoinButton = ({ groupLink }: { groupLink: string }) => {
  return (
    <Link href={groupLink}>
      <Button className="bg-green-700 cursor-pointer hover:bg-soft-white flex gap-1 max-w-16  items-center rounded-md shado-md p2 ">
        <FaWhatsapp className="text-white hover:text-green-600 size-5" />
      </Button>
    </Link>
  );
};

export default StudentGroupJoinButton;
