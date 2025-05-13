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