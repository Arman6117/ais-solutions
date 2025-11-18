"use client";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ModuleSelectorProps = {
  modules: string[];
  selectedModule: string;
  onChange: (value: string) => void;
};

const ModuleSelector = ({ modules, selectedModule, onChange }: ModuleSelectorProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customModule, setCustomModule] = useState("");

  // Check if current selected module is a custom one (not in the list)
  useEffect(() => {
    if (selectedModule && !modules.includes(selectedModule)) {
      setShowCustomInput(true);
      setCustomModule(selectedModule);
    }
  }, [selectedModule, modules]);

  const handleModuleChange = (value: string) => {
    if (value === "other") {
      setShowCustomInput(true);
      setCustomModule("");
      onChange("");
    } else {
      setShowCustomInput(false);
      setCustomModule("");
      onChange(value);
    }
  };

  const handleCustomModuleChange = (value: string) => {
    setCustomModule(value);
    onChange(value || "Not Mentioned");
  };

  return (
    <div className="space-y-2">
      <Select 
        value={showCustomInput ? "other" : selectedModule} 
        onValueChange={handleModuleChange}
      >
        <SelectTrigger className="max-w-40">
          <SelectValue placeholder="Select module" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="other">
            <span className="font-semibold text-blue-600">+ Other</span>
          </SelectItem>
          {modules.map((module) => (
            <SelectItem key={module} value={module}>
              {module}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCustomInput && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <Input
            type="text"
            placeholder="Enter module name..."
            value={customModule}
            onChange={(e) => handleCustomModuleChange(e.target.value)}
            className="max-w-40 text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ModuleSelector;
