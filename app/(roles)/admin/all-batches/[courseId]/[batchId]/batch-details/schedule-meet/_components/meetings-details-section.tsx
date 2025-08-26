import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text, Link, AlertCircle } from "lucide-react";
import { FormData, FormErrors } from "./schedule-meet-form";


interface MeetingDetailsSectionProps {
  meetingName: string;
  meetingLink: string;
  errors: FormErrors;
  onUpdate: (updates: Partial<FormData>) => void;
}

export default function MeetingDetailsSection({
  meetingName,
  meetingLink,
  errors,
  onUpdate,
}: MeetingDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Meeting Details
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
            <Text className="w-5 h-5 text-blue-600" />
            Meeting Name *
          </Label>
          <Input
            value={meetingName}
            onChange={(e) => onUpdate({ meetingName: e.target.value })}
            placeholder="e.g., React Hooks Deep Dive Session"
            className={`transition-all duration-200 ${
              errors.meetingName
                ? "border-red-500 focus-visible:ring-red-200"
                : "border-gray-300 focus-visible:ring-blue-200 focus-visible:border-blue-500"
            }`}
          />
          {errors.meetingName && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.meetingName}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
            <Link className="w-5 h-5 text-blue-600" />
            Meeting Link *
          </Label>
          <Input
            value={meetingLink}
            onChange={(e) => onUpdate({ meetingLink: e.target.value })}
            placeholder="https://meet.google.com/..."
            className={`transition-all duration-200 ${
              errors.meetingLink
                ? "border-red-500 focus-visible:ring-red-200"
                : "border-gray-300 focus-visible:ring-blue-200 focus-visible:border-blue-500"
            }`}
          />
          {errors.meetingLink && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.meetingLink}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}