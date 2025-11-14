import React from "react";
import { BookOpen } from "lucide-react";

import { ModuleStatus } from "./modules-card";


interface EmptyStateProps {
  filter: ModuleStatus | "all";
}

export default function EmptyState({ filter }: EmptyStateProps) {
  const getEmptyStateContent = () => {
    if (filter === "all") {
      return {
        title: "No modules found",
        description: "No modules have been added yet. Create your first module to get started.",
        showButton: true,
      };
    }
    
    return {
      title: `No ${filter} modules`,
      description: `No ${filter.toLowerCase()} modules at the moment.`,
      showButton: false,
    };
  };

  const { title, description, showButton } = getEmptyStateContent();

  return (
    <div className="text-center py-12">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
        <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          {description}
        </p>

        {showButton && (
          <span className=" ">
            Add Your First Module By Clicking Edit Button  
          </span>
        )}
      </div>
    </div>
  );
}