"use client";
import { createApproveRequest } from "@/actions/shared/approve-request";
import { getStudentId } from "@/actions/shared/get-student-id";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";
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
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleModule = (module: Module) => {
    setSelectedModules((prev) =>
      prev.some(m => m._id === module._id)
        ? prev.filter((m) => m._id !== module._id)
        : [...prev, module]
    );
  };


  const totalPrice = selectedModules.reduce((sum, m) => sum + m.price, 0);
  

  const allModulesSelected = selectedModules.length === modules.length && modules.length > 0;
  

  const discountPercentage = 40;
  const finalPrice = allModulesSelected 
    ? totalPrice - (totalPrice * discountPercentage) / 100 
    : totalPrice;

  const handleSendRequest = async () => {
    const session = await authClient.getSession();
    if (!session?.data?.user.email) {
      toast.error("Please login to send a request");
      return;
    }

    if (selectedModules.length === 0) {
      toast.error("Please select at least one module");
      return;
    }

    setIsLoading(true);
    try {
      const studentId = await getStudentId(session.data.user.email!);
      
      
      if (!studentId) {
        toast.error("Student not found");
        return;
      }

      const selectedModulesIds = selectedModules.map((m) => m._id);
      const requestDoc = {
        studentId,
        courseId,
        modules: selectedModulesIds,
        finalPrice: finalPrice,
      };

      const res = await createApproveRequest(requestDoc);
      if (!res.success) {
        console.log(res)
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
      {modules.map((module) => (
        <div key={module._id} className="flex w-full gap-2">
          <Checkbox
            onCheckedChange={() => toggleModule(module)}
            checked={selectedModules.some(m => m._id === module._id)}
          />
          <div className="flex justify-between w-full">
            <span>{module.name}</span>
            <span>₹{module.price}</span>
          </div>
        </div>
      ))}
      
      <div className="flex justify-between w-full">
        <span className="ml-6 text-lg">Total</span>
        {allModulesSelected ? (
          <div className="flex flex-col items-end">
            <div className="flex gap-2 items-center">
              <span className="line-through text-muted-foreground">
                ₹{totalPrice}
              </span>
              <span className="text-lg font-semibold">
                ₹{finalPrice}
              </span>
            </div>
            <span className="text-green-600 text-sm font-medium">
              {discountPercentage}% Off
            </span>
          </div>
        ) : (
          <span className="text-lg">₹{totalPrice}</span>
        )}
      </div>
      
      <Button
        className="border-primary-bg cursor-pointer text-primary-bg hover:text-primary-bg hover:bg-primary-bg/10"
        variant="outline"
        onClick={handleSendRequest}
        disabled={isLoading || selectedModules.length === 0}
      >
        {isLoading ? "Sending..." : "Send Request"}
      </Button>
    </div>
  );
};

export default ModuleSelect;