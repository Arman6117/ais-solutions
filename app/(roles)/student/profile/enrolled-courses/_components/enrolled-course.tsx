import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const EnrolledCourse = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-4  mt-3">
        <Button className="bg-gradient-to-r mt-1 w-16 h-10 from-purple-500 to-indigo-500 cursor-pointer text-white hover:from-purple-600 hover:to-primary-bg transition-colors duration-300">
          <Link className="" href={"/student/profile"}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="flex flex-col gap-2 justify-center">

        <h1 className="text-5xl">Course Name</h1>
        <p className="text-sm line-clamp-3 ml-1  max-w-lg text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis temporibus repellendus deleniti eos tempore suscipit voluptate fugiat velit repudiandae expedita eaque atque dolorem sapiente, hic necessitatibus molestiae. Tenetur, animi! Maiores!F</p>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourse;
