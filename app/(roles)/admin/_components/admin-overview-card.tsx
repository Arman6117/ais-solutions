import React from "react";

interface AdminOverviewCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  variant: "students" | "courses" | "revenue" | "certifications";
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
    revenue: {
      bg: "#FFB547",
      text: "#FFF",
      labelText: "#FFF",
      ring: "inset-ring-yellow-500",
    },
    certifications: {
      bg: "#FF5C8D",
      text: "#FFF",
      labelText: "#FFF",
      ring: "inset-ring-rose-500",
    },
  };
  const style = variantStyles[variant];

  return (
    <div
      className={`w-60 rounded-xl  ${style.ring} inset-ring-2 p-5 shadow-xl shadow-[#ececf3]`}
      style={{ backgroundColor: style.bg }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-sm  font-medium uppercase `}
          style={{ color: style.labelText }}
        >
          {label}
        </span>
        {icon && <div style={{ color: style.labelText }}>{icon}</div>}
      </div>
      <div className="mt-4">
        <span className={`font-bold text-4xl`} style={{ color: style.text }}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default AdminOverviewCard;
