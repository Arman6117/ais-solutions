import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { PiChalkboardTeacher } from "react-icons/pi";
import { FormData, FormErrors } from "./schedule-meet-form";

interface InstructorSelectionSectionProps {
  instructor: string;
  instructors: string[];
  errors: FormErrors;
  onUpdate: (updates: Partial<FormData>) => void;
}

export default function InstructorSelectionSection({
  instructor,
  instructors,
  errors,
  onUpdate,
}: InstructorSelectionSectionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <PiChalkboardTeacher className="w-5 h-5 text-blue-600" />
        Instructor *
      </Label>
      <Select 
        value={instructor} 
        onValueChange={(value) => onUpdate({ instructor: value })}
      >
        <SelectTrigger
          className={`w-full ${
            errors.instructor ? "border-red-500" : "border-gray-300"
          }`}
        >
          <SelectValue placeholder="Choose an instructor" />
        </SelectTrigger>
        <SelectContent>
          {instructors.map((inst) => (
            <SelectItem key={inst} value={inst}>
              {inst}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.instructor && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.instructor}
        </p>
      )}
    </div>
  );
}