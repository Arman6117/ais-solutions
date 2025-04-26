import React from "react";
import { Users, BookOpen, Layers, MonitorPlay } from "lucide-react";

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
  // Updated color scheme with better contrast and modern gradients
  const variantStyles = {
    students: {
      bg: "linear-gradient(135deg, #7F66FF 0%, #6A4FFF 100%)",
      iconBg: "rgba(255, 255, 255, 0.2)",
      border: "#9985FF",
      shadow: "#7F66FF33",
      icon: <Users size={24} />
    },
    courses: {
      bg: "linear-gradient(135deg, #3DD6A0 0%, #2AB583 100%)",
      iconBg: "rgba(255, 255, 255, 0.2)",
      border: "#52DAA9",
      shadow: "#3DD6A033",
      icon: <BookOpen size={24} />
    },
    batches: {
      bg: "linear-gradient(135deg, #FFB547 0%, #FF9A20 100%)",
      iconBg: "rgba(255, 255, 255, 0.2)",
      border: "#FFC670",
      shadow: "#FFB54733",
      icon: <Layers size={24} />
    },
    lectures: {
      bg: "linear-gradient(135deg, #FF5C8D 0%, #FF3874 100%)",
      iconBg: "rgba(255, 255, 255, 0.2)",
      border: "#FF75A0",
      shadow: "#FF5C8D33",
      icon: <MonitorPlay size={24} />
    },
  };
  
  const style = variantStyles[variant];

  return (
    <div
      className="rounded-xl w-56 shadow-lg overflow-hidden relative"
      style={{ 
        background: style.bg,
        boxShadow: `0 10px 25px ${style.shadow}`,
      }}
    >

      <div className="p-2 relative z-10">

        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-medium text-sm uppercase tracking-wider">
            {label}
          </span>
          <div 
            className="flex items-center text-white justify-center p-2 rounded-lg" 
            style={{ background: style.iconBg }}
          >
            {icon || style.icon}
          </div>
        </div>
        
        
        <div className="mt-2">
          <span className="font-bold text-5xl text-white">
            {value.toLocaleString()}
          </span>
        </div>
      </div>
      

      <div 
        className="absolute right-24 -bottom-8 rounded-full opacity-60"
        style={{ 
          width: "160px", 
          height: "160px", 
          background: style.iconBg,
        }}
      />
    </div>
  );
};
export default AdminOverviewCard;
