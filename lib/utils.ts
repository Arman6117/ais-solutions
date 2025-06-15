import { clsx, type ClassValue } from "clsx";
import {
  FaFileAlt,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
} from "react-icons/fa";
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
    case "pdf":
      return FaFilePdf;
    case "doc":
    case "docx":
      return FaFileWord;
    case "ppt":
    case "pptx":
      return FaFilePowerpoint;
    case "xls":
    case "xlsx":
    case "csv":
      return FaFileExcel;
    case "zip":
    case "rar":
      return PiFileZip;
    default:
      return FaFileAlt;
  }
}

// Status color mapping
export function getStatusColor(status: 'Ongoing' | 'Completed' | 'Upcoming' ) {
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
}

// Function to get the badge color based on course mode
export function getModeColor(mode: string) {
  switch (mode) {
    case "Online":
      return "bg-blue-100 text-blue-800";
    case "Offline":
      return "bg-amber-100 text-amber-800";
    case "Hybrid":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Function to get level badge color
export function getLevelColor(level: string) {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-orange-100 text-orange-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function generateReadableLightColor(): string {
  // Check contrast ratio of color with black text
  function getLuminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  function contrastRatio(l1: number, l2: number): number {
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  }

  while (true) {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 30) + 60; // 60–90%
    const l = Math.floor(Math.random() * 20) + 75; // 75–95%
    const [r, g, b] = hslToRgb(h, s, l);
    const luminance = getLuminance(r, g, b);
    const contrast = contrastRatio(0, luminance); // Black text has luminance = 0

    if (contrast >= 4) {
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
  }
}
