import { clsx, type ClassValue } from "clsx";
import { FaFileAlt, FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { PiFileZip } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days: Date[] = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getIcon(fileType: string): IconType {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return FaFilePdf;
    case 'doc':
    case 'docx':
      return FaFileWord;
    case 'ppt':
    case 'pptx':
      return FaFilePowerpoint;
    case 'xls':
    case 'xlsx':
    case 'csv':
      return FaFileExcel;
    case 'zip':
    case 'rar':
      return PiFileZip;
    default:
      return FaFileAlt;
  }
}

  // Status color mapping
  export function getStatusColor(status: string){
    switch (status) {
      case "Ongoing":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          dot: "bg-green-600",
        };
      case "Completed":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          dot: "bg-blue-600",
        };
      case "Upcoming":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          dot: "bg-amber-600",
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          dot: "bg-gray-600",
        };
    }
  };
