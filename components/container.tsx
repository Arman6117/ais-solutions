import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("bg-white h-56 w-lg rounded-lg drop-shadow-xl drop-shadow-soft-white")}>{children}</div>;
};

export default Container;
