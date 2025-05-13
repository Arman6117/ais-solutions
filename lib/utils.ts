import { clsx, type ClassValue } from "clsx";
import { FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileWord } from "react-icons/fa";
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

export function getIcon(fileType:string) {
  switch(fileType) {
    case 'pdf':
      FaFilePdf
      break;
    case 'docs':
      FaFileWord
      break;
    case 'ppt':
      FaFilePowerpoint
      break;
    case 'zip':
      PiFileZip
      break;
    case 'pptx':
      FaFilePowerpoint
      break;
    case 'csv':
      FaFileExcel
      break;
  }
}