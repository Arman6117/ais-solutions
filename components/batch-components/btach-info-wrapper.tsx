import React from "react";

const BatchInfoWrapper = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-neutral-800 mb-3 flex items-center">
        <div className="w-1 h-6 bg-indigo-600 rounded-full mr-2"></div>
        {label}
      </h1>
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-5 border-l-4 border-indigo-500 shadow-md">
        <span className="text-xl font-semibold text-gray-800">{children}</span>
      </div>
    </div>
  );
};

export default BatchInfoWrapper;
