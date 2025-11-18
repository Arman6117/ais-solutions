import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { PiChalkboardTeacher } from "react-icons/pi";
import { FormData, FormErrors } from "./schedule-meet-form";
import { useState } from "react";

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
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInstructor, setCustomInstructor] = useState("");

  const handleInstructorChange = (value: string) => {
    if (value === "other") {
      setShowCustomInput(true);
      onUpdate({ instructor: "" });
    } else {
      setShowCustomInput(false);
      setCustomInstructor("");
      onUpdate({ instructor: value });
    }
  };

  const handleCustomInstructorChange = (value: string) => {
    setCustomInstructor(value);
    onUpdate({ instructor: value || "Not Mentioned" });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <PiChalkboardTeacher className="w-5 h-5 text-blue-600" />
        Instructor *
      </Label>
      
      <Select 
        value={showCustomInput ? "other" : instructor} 
        onValueChange={handleInstructorChange}
      >
        <SelectTrigger
          className={`w-full ${
            errors.instructor ? "border-red-500" : "border-gray-300"
          }`}
        >
          <SelectValue placeholder="Choose an instructor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="other">
            <span className="font-semibold text-blue-600">+ Other (Custom Instructor)</span>
          </SelectItem>
          {instructors.map((inst) => (
            <SelectItem key={inst} value={inst}>
              {inst}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCustomInput && (
        <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
          <Label className="text-sm font-medium text-gray-600 mb-2 block">
            Enter Instructor Name (Optional)
          </Label>
          <Input
            type="text"
            placeholder="Leave empty to use 'Not Mentioned'"
            value={customInstructor}
            onChange={(e) => handleCustomInstructorChange(e.target.value)}
            className="w-full border-gray-300"
          />
          <p className="text-xs text-gray-500 mt-1">
            If left empty, instructor will be saved as Not Mentioned
          </p>
        </div>
      )}

      {errors.instructor && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.instructor}
        </p>
      )}
    </div>
  );
}
