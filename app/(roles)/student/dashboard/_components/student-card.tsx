import { Button } from "@/components/ui/button";
import { BellIcon, CoinsIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdAlternateEmail, MdOutlineEmail } from "react-icons/md";
import StudentNotification from "./student-notification";

const StudentCard = () => {
  return (
    <div className="flex flex-col w-full rounded-lg shadow-md bg-white p-3 relative">
      <Image
        src={"/abstract/abstract1.jpg"}
        className="rounded-lg"
        alt="abstract"
        width={250}
        height={0}
      />
      <div className="bg-white rounded-lg size-20 p-1 absolute top-32 left-8">
        <Image
          alt="course thumbnail"
          className="rounded-lg"
          src={"https://placehold.co/80x80"}
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col mt-8">
        <div className="flex flex-col ml-7">
          <h1 className="font-medium">Student name</h1>
          <div className="flex gap-1 items-center ">
            <MdAlternateEmail className="text-neutral-500 size-[14px]" />
            <span className="text-sm text-neutral-500">example@email.com</span>
          </div>
          <div className="flex gap-5 mt-4 items">
            <div className="bg-soft-white flex gap-1 max-w-16 mt- items-center rounded-md shado-md p-2 ">
              <CoinsIcon className="text-primary-bg" />
              <span className="text-neutral-800 font-medium text-sm">24</span>
            </div>
           <StudentNotification/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
