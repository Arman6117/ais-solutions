"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ModuleSelectorProps = {
  modules: string[];
  selectedModule: string;
  onChange: (value: string) => void;
};

const ModuleSelector = ({ modules, selectedModule, onChange }: ModuleSelectorProps) => {
  return (
    <Select value={selectedModule} onValueChange={onChange}>
      <SelectTrigger className="max-w-40">
        <SelectValue placeholder="Select module" />
      </SelectTrigger>
      <SelectContent>
        {modules.map((module) => (
          <SelectItem key={module} value={module}>
            {module}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ModuleSelector;
