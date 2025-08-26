import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { BookCheck, AlertCircle } from "lucide-react";
import { FormData, FormErrors } from "./schedule-meet-form";
import { ModulesForSession } from "@/lib/types/sessions.type";



interface SubtopicsSelectionSectionProps {
  selectedModule: ModulesForSession;
  selectedSubtopics: string[];
  errors: FormErrors;
  onUpdate: (updates: Partial<FormData>) => void;
}

export default function SubtopicsSelectionSection({
  selectedModule,
  selectedSubtopics,
  errors,
  onUpdate,
}: SubtopicsSelectionSectionProps) {
  const toggleSubtopic = (sub: string) => {
    const newSubtopics = selectedSubtopics.includes(sub)
      ? selectedSubtopics.filter((s) => s !== sub)
      : [...selectedSubtopics, sub];
    
    onUpdate({ selectedSubtopics: newSubtopics });
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <BookCheck className="w-5 h-5 text-blue-600" />
        Select Subtopics *
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
        {selectedModule.chapters.map((sub) => (
          <Label
            key={sub.name}
            className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
          >
            <Checkbox
              checked={selectedSubtopics.includes(sub.name)}
              onCheckedChange={() => toggleSubtopic(sub.name)}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <span className="text-sm font-medium">{sub.name}</span>
          </Label>
        ))}
      </div>
      {selectedSubtopics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSubtopics.map((topic) => (
            <Badge
              key={topic}
              variant="default"
              className="bg-blue-100 text-blue-800"
            >
              {topic}
            </Badge>
          ))}
        </div>
      )}
      {errors.subtopics && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.subtopics}
        </p>
      )}
    </div>
  );
}