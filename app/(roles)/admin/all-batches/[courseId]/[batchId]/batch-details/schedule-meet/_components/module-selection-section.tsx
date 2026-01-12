import React from "react";
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue, 
  SelectSeparator, 
  SelectGroup, 
  SelectLabel 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Package, AlertCircle, PenLine, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModulesForSession } from "@/lib/types/sessions.type";

type FormErrors = {
  module?: string;
  customName?: string;
  chapters?: string;
  [key: string]: string | undefined;
};

interface ModuleSelectionSectionProps {
  selectedModuleId: string;
  modules: ModulesForSession[];
  errors: FormErrors;
  
  customModuleName: string;
  customChaptersText: string;
  
  // Prop to control visibility (defaults to true)
  enableTopicInput?: boolean; 

  onModuleChange: (moduleId: string) => void;
  onCustomNameChange: (val: string) => void;
  onCustomTopicsChange: (val: string) => void;
}

export default function ModuleSelectionSection({
  selectedModuleId,
  modules,
  errors,
  customModuleName,
  customChaptersText,
  enableTopicInput = true, 
  onModuleChange,
  onCustomNameChange,
  onCustomTopicsChange,
}: ModuleSelectionSectionProps) {
  
  const isOtherSelected = selectedModuleId === "other";

  return (
    <div className="space-y-4">
      {/* --- Main Selection --- */}
      <div className="space-y-2">
        <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
          <Package className="w-5 h-5 text-blue-600" />
          Select Module <span className="text-red-500">*</span>
        </Label>
        
        <Select 
          value={selectedModuleId} 
          onValueChange={onModuleChange}
        >
          <SelectTrigger 
            id="module-select"
            className={cn(
              "w-full transition-colors",
              errors.module ? "border-red-500 ring-red-100" : "border-gray-300 focus:ring-blue-100"
            )}
          >
            <SelectValue placeholder="Choose a module" />
          </SelectTrigger>
          
          <SelectContent>
            <SelectGroup>
              <SelectItem value="other" className="text-blue-600 font-medium cursor-pointer bg-blue-50/50 focus:bg-blue-100">
                + Other
              </SelectItem>
            </SelectGroup>

            <SelectSeparator />
            
            <SelectGroup>
              <SelectLabel>Available Modules</SelectLabel>
              {modules.length > 0 ? (
                modules.map((mod) => (
                  <SelectItem key={mod._id} value={mod._id}>
                    {mod.name}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500 text-center">No modules found</div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {errors.module && (
          <p className="text-red-500 text-sm flex items-center gap-1 animate-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4" />
            {errors.module}
          </p>
        )}
      </div>

      {isOtherSelected && (
        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
          
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-blue-200/60">
            <PenLine className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Custom Module Details</span>
          </div>

          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Module Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={customModuleName}
                onChange={(e) => onCustomNameChange(e.target.value)}
                placeholder="e.g. Advanced System Design"
                className={cn(
                  "bg-white border-blue-200 focus-visible:ring-blue-400",
                  errors.customName && "border-red-500"
                )}
              />
              {errors.customName && <p className="text-xs text-red-600 font-medium">{errors.customName}</p>}
            </div>

            {enableTopicInput && (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                    <List className="w-3 h-3" />
                    Topics List <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-[10px] text-blue-600/70 font-medium">One topic per line</span>
                </div>
                
                <Textarea
                  value={customChaptersText}
                  onChange={(e) => onCustomTopicsChange(e.target.value)}
                  placeholder={`Introduction\nSetup Environment`}
                  className={cn(
                    "min-h-[120px] font-mono text-sm bg-white border-blue-200 focus-visible:ring-blue-400 resize-y",
                    errors.chapters && "border-red-500"
                  )}
                />
                
                {errors.chapters ? (
                  <p className="text-xs text-red-600 font-medium">{errors.chapters}</p>
                ) : (
                  <p className="text-[11px] text-slate-500">
                    These topics will be used to generate the curriculum structure.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}