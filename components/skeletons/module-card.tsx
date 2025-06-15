import React from "react";
import { Skeleton } from "../ui/skeleton";

const ModuleCardSkeleton = () => {
  return (
    <Skeleton
      className="flex rounded h-28 transition-all p-4 gap-6
        "
    />
  );
};

export default ModuleCardSkeleton;
