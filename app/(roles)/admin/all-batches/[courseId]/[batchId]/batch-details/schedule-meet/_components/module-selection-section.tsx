import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Package, AlertCircle } from "lucide-react";
import { ModulesForSession } from "@/lib/types/sessions.type";
import { useEffect, useState } from "react";

// Define errors type locally
type FormErrors = Record<string, string>;

interface ModuleSelectionSectionProps {
  selectedModuleId: string;
  modules: ModulesForSession[];
  errors: FormErrors;
  
  // OPTIONAL: Make these optional so they don't break other usages
  customModuleName?: string;
  customChaptersText?: string;
  
  // Renamed back to 'onUpdate' to match your error log's expectation
  // Signature: (moduleId, customName?) -> void
  onUpdate: (moduleId: string, customModuleName?: string) => void;

  // New optional handlers for specific fields
  onCustomNameChange?: (val: string) => void;
  onCustomTopicsChange?: (val: string) => void;
}

export default function ModuleSelectionSection({
  selectedModuleId,
  modules,
  errors,
  customModuleName = "",
  customChaptersText = "",
  onUpdate, // This matches the old prop name
  onCustomNameChange,
  onCustomTopicsChange,
}: ModuleSelectionSectionProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    const selectedMod = modules.find(m => m._id === selectedModuleId);
    const isOther = selectedModuleId === "other" || selectedMod?.name.trim().toLowerCase() === "other";
    setShowCustomInput(isOther);
  }, [selectedModuleId, modules]);

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <Package className="w-5 h-5 text-blue-600" />
        Select Module *
      </Label>
      
      <Select 
        value={selectedModuleId} 
        onValueChange={(val) => onUpdate(val)} // Call onUpdate
        key={selectedModuleId} 
      >
        <SelectTrigger className={errors.module ? "border-red-500" : "border-gray-300"}>
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
        <div className="space-y-4 border-l-4 border-blue-500 pl-4 py-4 bg-blue-50/30 rounded-r-md animate-in slide-in-from-top-2 duration-300 mt-2">
          
          <div className="space-y-2">
            <Label className="text-blue-900 font-semibold text-sm">
              Custom Module Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={customModuleName}
              // Check if handler exists before calling
              onChange={(e) => onCustomNameChange?.(e.target.value)}
              placeholder="e.g. Advanced System Design"
              className="border-blue-200 focus:border-blue-500 bg-white"
            />
            {errors.customName && <p className="text-xs text-red-600">{errors.customName}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-blue-900 font-semibold text-sm">
              Topics (one per line) <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={customChaptersText}
              // Check if handler exists
              onChange={(e) => onCustomTopicsChange?.(e.target.value)}
              placeholder={`e.g.\nIntroduction\nSetup\nAdvanced Concepts`}
              className="min-h-[100px] border-blue-200 focus:border-blue-500 font-mono text-sm bg-white"
            />
            {errors.chapters && <p className="text-xs text-red-600">{errors.chapters}</p>}
          </div>
          
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
