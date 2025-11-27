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
  discount: number;
  coursePrice: number;
  courseOfferPrice: number;
};

const ModuleSelect = ({
  modules,
  courseId,
  discount,
  coursePrice,
  courseOfferPrice,
}: ModuleSelectProps) => {
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModule = (module: Module) => {
    setSelectedModules((prev) =>
      prev.some((m) => m._id === module._id)
        ? prev.filter((m) => m._id !== module._id)
        : [...prev, module]
    );
  };

  const totalModulesPrice = selectedModules.reduce(
    (sum, m) => sum + m.price,
    0
  );
  const allModulesSelected =
    selectedModules.length === modules.length && modules.length > 0;

  // Use database prices when all modules are selected, otherwise calculate from selected modules
  const shouldUseCoursePricing = allModulesSelected;
  const finalPrice = shouldUseCoursePricing
    ? discount > 0
      ? courseOfferPrice
      : coursePrice
    : totalModulesPrice;

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      const session = await authClient.getSession();
      if (!session?.data?.user.email) {
        toast.error("Please login to send a request");
        return;
      }

      if (selectedModules.length === 0) {
        toast.error("Please select at least one module");
        return;
      }



      const studentId = await getStudentId(session.data.user.email);

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
        console.error("Request failed:", res);
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
        <div key={module._id} className="flex w-full gap-2 items-center">
          <Checkbox
            id={`module-${module._id}`}
            onCheckedChange={() => toggleModule(module)}
            checked={selectedModules.some((m) => m._id === module._id)}
          />
          <label
            htmlFor={`module-${module._id}`}
            className="flex justify-between w-full cursor-pointer"
          >
            <span>{module.name}</span>
            <span>₹{module.price}</span>
          </label>
        </div>
      ))}

      {selectedModules.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between w-full items-center">
            <span className="text-lg font-medium">Total</span>
            {shouldUseCoursePricing ? (
              <div className="flex flex-col items-end">
                {discount > 0 ? (
                  <>
                    <div className="flex gap-2 items-center">
                      <span className="line-through text-muted-foreground text-sm">
                        ₹{coursePrice}
                      </span>
                      <span className="text-lg font-semibold">
                        ₹{courseOfferPrice}
                      </span>
                    </div>
                    <span className="text-green-600 text-sm font-medium">
                      {discount}% Off (Course Price)
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-semibold">₹{coursePrice}</span>
                )}
              </div>
            ) : (
              <span className="text-lg font-semibold">
                ₹{totalModulesPrice}
              </span>
            )}
          </div>

          {!allModulesSelected && discount > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              Select all modules to get course pricing with {discount}% discount
            </p>
          )}
        </div>
      )}

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
