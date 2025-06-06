"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

type Module = {
  name: string;
  price: number;
};
type ModuleSelectProps = {
  modules: Module[];
};
const ModuleSelect = ({ modules }: ModuleSelectProps) => {
  const [selectedModules, setSelectedModules] = useState<Module[]>(
    modules.map((m) => m)
  );

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
      >
        Send Request
      </Button>
    </div>
  );
};

export default ModuleSelect;
