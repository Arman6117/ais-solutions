import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Package, AlertCircle } from "lucide-react";
import { FormErrors } from "./schedule-meet-form";
import { ModulesForSession } from "@/lib/types/sessions.type";



interface ModuleSelectionSectionProps {
  selectedModuleId: string;
  modules: ModulesForSession[];
  errors: FormErrors;
  onUpdate: (moduleId: string) => void;
}

export default function ModuleSelectionSection({
  selectedModuleId,
  modules,
  errors,
  onUpdate,
}: ModuleSelectionSectionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <Package className="w-5 h-5 text-blue-600" />
        Select Module *
      </Label>
      <Select
        value={selectedModuleId}
        onValueChange={onUpdate}
      >
        <SelectTrigger
          className={`w-full ${
            errors.module ? "border-red-500" : "border-gray-300"
          }`}
        >
          <SelectValue placeholder="Choose a module" />
        </SelectTrigger>
        <SelectContent>
          {modules.map((mod) => (
            <SelectItem key={mod._id} value={mod._id}>
              {mod.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.module && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.module}
        </p>
      )}
    </div>
  );
}