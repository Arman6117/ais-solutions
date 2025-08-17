"use client";
import { createApproveRequest } from "@/actions/shared/approve-request";
import { getStudentId } from "@/actions/shared/get-student-id";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import React, { useState } from "react";
import { toast } from "sonner";

type Module = {
  _id: string;
  name: string;
  price: number;
};
type ModuleSelectProps = {
  modules: Module[];
  courseId: string;
};
const ModuleSelect = ({ modules, courseId }: ModuleSelectProps) => {
  const [selectedModules, setSelectedModules] = useState<Module[]>(
    modules.map((m) => m)
  );
  const [isLoading, setIsLoading] = useState(false);
  const toggleModule = (module: Module) => {
    setSelectedModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };
  const totalPrice = modules
    .filter((m) => selectedModules.includes(m))
    .reduce((sum, m) => sum + m.price, 0);

  const handleSendRequest = async () => {
    const session = await authClient.getSession();
    setIsLoading(true);
    try {
      const studentId = await getStudentId(session.data?.user.email!);
      if (selectedModules.length === 0) {
        toast.error("Please select at least one module");
        return;
      }
      if (!studentId) {
        toast.error("Student not found");
        return;
      }
      const selectedModulesIds = selectedModules.map((m) => m._id);
      const requestDoc = {
        studentId,
        courseId,
        modules: selectedModulesIds,
        finalPrice: totalPrice,
      };

      const res = await createApproveRequest(requestDoc);
      if (!res.success) {
        toast.error(res.message.toString());
      } else {
        toast.success("Request sent successfully");
        setSelectedModules([]);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      {modules.map((m, index) => (
        <div key={index} className="flex w-full gap-2">
          <Checkbox
            onCheckedChange={() => toggleModule(m)}
            checked={selectedModules.includes(m)}
          />
          <div className="flex justify-between w-full">
            <span>{m.name}</span>
            <span>₹{m.price}</span>
          </div>
        </div>
      ))}
      <div className="flex justify-between w-full">
        <span className="ml-6 text-lg">Total</span>
        {selectedModules.length > 0 &&
        selectedModules.length === modules.length ? (
          <div className="flex flex-col items-center justify-center">
            <div className="flex gap-2 items-center">
              <span className=" line-through text-muted-foreground ">
                ₹{totalPrice}
              </span>
              <span className="text-lg">
                ₹{totalPrice - (totalPrice * 40) / 100}
              </span>
            </div>
            <span className="text-green-600 text-sm">40% Off</span>
          </div>
        ) : (
          <span className=" text-lg ">₹{totalPrice}</span>
        )}
      </div>
      <Button
        className="border-primary-bg cursor-pointer text-primary-bg hover:text-primary-bg hover:bg-primary-bg/10"
        variant={"outline"}
        onClick={handleSendRequest}
      >
        Send Request
      </Button>
    </div>
  );
};

export default ModuleSelect;
