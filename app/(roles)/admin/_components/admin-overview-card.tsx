import React from "react";

interface AdminOverviewCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  variant: "students" | "courses" | "batches" | "lectures";
}

const AdminOverviewCard = ({
  value,
  label,
  icon,
  variant,
}: AdminOverviewCardProps) => {
  const variantStyles = {
    students: {
      bg: "#7F66FF",
      text: "#FFFF",
      labelText: "#FFFF",
      ring: "inset-ring-indigo-500",
    },
    courses: {
      bg: "#3DD6A0",
      text: "#FFF",
      labelText: "#FFF",
      ring: "inset-ring-teal-500",
    },
    batches: {
      bg: "#FFB547",
      text: "#FFF",
      labelText: "#FFF",
      ring: "inset-ring-yellow-500",
    },
    lectures: {
      bg: "#FF5C8D",
      text: "#FFF",
      labelText: "#FFF",
      ring: "inset-ring-rose-500",
    },
  };
  const style = variantStyles[variant];

  return (
    <div
      className={`md:w-60 w-60 2xl:w-xl xl:w-80  rounded-xl  ${style.ring} inset-ring-2 p-5 2xl:p-7 shadow-xl shadow-[#ececf3]`}
      style={{ backgroundColor: style.bg }}
    >
      <div className="flex items-center xl:justify-center justify-center xl:gap-10 md:justify-between">
        <span
          className={`md:text-sm text-base xl:text-xl   font-medium uppercase `}
          style={{ color: style.labelText }}
        >
          {label}
        </span>
        {icon && <div style={{ color: style.labelText }}>{icon}</div>}
      </div>
      <div className="mt-4 xl:text-center md:text-left  text-center ">
        <span className={`font-bold text-4xl xl:text-6xl`} style={{ color: style.text }}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default AdminOverviewCard;
