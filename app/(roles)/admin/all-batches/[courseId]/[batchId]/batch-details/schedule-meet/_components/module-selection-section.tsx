import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Package, AlertCircle } from "lucide-react";
import { FormErrors } from "./schedule-meet-form";
import { ModulesForSession } from "@/lib/types/sessions.type";
import { useState } from "react";

interface ModuleSelectionSectionProps {
  selectedModuleId: string;
  modules: ModulesForSession[];
  errors: FormErrors;
  onUpdate: (moduleId: string, customModuleName?: string) => void;
}

export default function ModuleSelectionSection({
  selectedModuleId,
  modules,
  errors,
  onUpdate,
}: ModuleSelectionSectionProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customModuleName, setCustomModuleName] = useState("");

  const handleModuleChange = (value: string) => {
    if (value === "other") {
      setShowCustomInput(true);
      onUpdate("other", "");
    } else {
      setShowCustomInput(false);
      setCustomModuleName("");
      onUpdate(value);
    }
  };

  const handleCustomModuleChange = (value: string) => {
    setCustomModuleName(value);
    onUpdate("other", value);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <Package className="w-5 h-5 text-blue-600" />
        Select Module *
      </Label>
      
      <Select value={selectedModuleId} onValueChange={handleModuleChange}>
        <SelectTrigger
          className={`w-full ${
            errors.module ? "border-red-500" : "border-gray-300"
          }`}
        >
          <SelectValue placeholder="Choose a module" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="other">
            <span className="font-semibold text-blue-600">+ Other</span>
          </SelectItem>
          {modules.map((mod) => (
            <SelectItem key={mod._id} value={mod._id}>
              {mod.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCustomInput && (
        <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
          <Label className="text-sm font-medium text-gray-600 mb-2 block">
            Enter Custom Module Name (Optional)
          </Label>
          <Input
            type="text"
            placeholder="Leave empty to use 'Not Mentioned'"
            value={customModuleName}
            onChange={(e) => handleCustomModuleChange(e.target.value)}
            className="w-full border-gray-300"
          />
          <p className="text-xs text-gray-500 mt-1">
            If left empty, module will be saved as "Not Mentioned"
          </p>
        </div>
      )}

      {errors.module && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.module}
        </p>
      )}
    </div>
  );
}
