import { cn } from "@/lib/utils";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import React from "react";

type EditInfoProps = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
};
const EditInfo = ({ children, label, icon, className }: EditInfoProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h1 className="text-xl font-bold text-neutral-800 mb-2 flex items-center">
        <div className="w-1 h-6 bg-indigo-600 rounded-full mr-2"></div>
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </h1>
      <div className=" rounded-lg p-5 border--4 border-indigo-500 shadow-sm transition-all hover:shadow-md">
        <span className="text-xl font-semibold text-gray-800">{children}</span>
      </div>
    </div>
  );
};

export default EditInfo;
