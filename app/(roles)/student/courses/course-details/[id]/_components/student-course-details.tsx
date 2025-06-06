import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, Pyramid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ModuleSelect from "./module-select";

const exampleModuleAndPrice = [
  { name: "React Hooks", price: 200 },
  { name: "JavaScript", price: 230 },
  { name: "SQL", price: 400 },
  { name: "PowerBI", price: 200 },
];
const StudentCourseDetails = () => {
  const totalPrice = exampleModuleAndPrice.reduce(
    (acc, module) => acc + module.price,
    0
  );
  return (
    <div className="flex flex-col w-full relative ">
      <div className="h-auto bg-gradient-to-r gap-4 rounded-md from-[#16161d] to-indigo-950 p-10 flex flex-col">
        <h1 className="sm:text-[45px] text-4xl max-w-[550px] text-white font-bold ">
          The Complete Web Development Bootcamp
        </h1>
        <p className="text-white text-sm max-w-[550px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, nobis,
          voluptas ipsum, sequi neque cupiditate deleniti voluptatum placeat
          repudiandae et dolores cumque! Nesciunt, accusamus? Atque quia
          adipisci est porro beatae.
        </p>
        <Badge className="bg-primary-bg flex gap-2 mt-5">
          <Pyramid className="text-white" />
          Intermediate
        </Badge>
        <span className="text-white text-sm flex gap-2">
          Instructors:
          <Link href={""} className="hover:underline hover:text-blue-500">
            John Doe
          </Link>
        </span>
        <div className="flex gap-2 items-center">
          <Calendar className="text-white size-4" />
          <span className="text-white text-sm">Last Updated: 2/2025</span>
        </div>
      </div>
      <div className="flex md:flex-row flex-col  justify-between">
        <div className="flex flex-col">
          <div className="">
            <h1>Modules</h1>
          </div>
        </div>
        <Card className="p-0 mt-4">
          <CardContent className="p-3  flex flex-col">
            <Image
              src={"https://placehold.co/200x120"}
              width={350}
              height={300}
              alt="thumbnail"
              className="rounded-md"
            />
            <div className="flex flex-col mt-5">
              <h1 className="text-xl font-semibold">Modules Pricing</h1>
              <div className="flex-flex-col mt-4">
                {exampleModuleAndPrice.map((module, index) => (
                  <div key={index}>
                    <div
                      className="flex justify-between mb-2 items-center"
                      key={index}
                    >
                      <h1 className="text-xl font-medium">{module.name}</h1>
                      <span className="text-lg font-medium">
                        ₹{module.price}
                      </span>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between mb-2 items-center">
                  <span className="text-xl font-medium">Total</span>
                  <div className="flex gap-3 flex-col items-center justify-center">
                    <div className="flex gap-4">
                      <span className="text-lg line-through text-muted-foreground">
                        ₹{totalPrice}
                      </span>
                      <span className="text-xl font-medium">
                        ₹{totalPrice - (totalPrice * 40) / 100}
                      </span>
                    </div>
                    <span className="text-sm text-center text-green-600 font-light">
                      40% Discount
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full border-primary-bg hover:text-primary-bg cursor-pointer hover:bg-primary-bg/10 text-primary-bg"
                  variant={"outline"}
                >
                  Request Approval
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Modules</DialogTitle>
                    <DialogDescription>Only modules you want to purchase</DialogDescription>
                </DialogHeader>
                <ModuleSelect modules={exampleModuleAndPrice}/>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentCourseDetails;
