import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookCheck, AlertCircle, X } from "lucide-react";
import { FormData, FormErrors } from "./schedule-meet-form";
import { ModulesForSession } from "@/lib/types/sessions.type";
import { useState } from "react";

interface SubtopicsSelectionSectionProps {
  selectedModule: ModulesForSession | undefined;
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
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customSubtopic, setCustomSubtopic] = useState("");
  const [useNotMentioned, setUseNotMentioned] = useState(false);

  const toggleSubtopic = (sub: string) => {
    // If "Not Mentioned" was checked, uncheck it when selecting actual subtopics
    if (useNotMentioned) {
      setUseNotMentioned(false);
    }

    const newSubtopics = selectedSubtopics.includes(sub)
      ? selectedSubtopics.filter((s) => s !== sub)
      : [...selectedSubtopics, sub];
    
    onUpdate({ selectedSubtopics: newSubtopics });
  };

  const handleNotMentionedCheckbox = (checked: boolean) => {
    setUseNotMentioned(checked);
    if (checked) {
      // Clear all subtopics and set to "Not Mentioned"
      onUpdate({ selectedSubtopics: ["Not Mentioned"] });
      setShowCustomInput(false);
      setCustomSubtopic("");
    } else {
      // Clear "Not Mentioned"
      onUpdate({ selectedSubtopics: [] });
    }
  };

  const handleOtherCheckbox = (checked: boolean) => {
    // If "Not Mentioned" was checked, uncheck it
    if (useNotMentioned) {
      setUseNotMentioned(false);
      onUpdate({ selectedSubtopics: [] });
    }

    setShowCustomInput(checked);
    if (!checked) {
      setCustomSubtopic("");
      // Remove any custom subtopics that were added
      const newSubtopics = selectedSubtopics.filter(
        (sub) => selectedModule?.chapters.some((ch) => ch.name === sub)
      );
      onUpdate({ selectedSubtopics: newSubtopics });
    }
  };

  const addCustomSubtopic = () => {
    if (customSubtopic.trim()) {
      // If "Not Mentioned" was checked, uncheck it
      if (useNotMentioned) {
        setUseNotMentioned(false);
      }

      const newSubtopics = selectedSubtopics.filter(
        (s) => s !== "Not Mentioned"
      );
      newSubtopics.push(customSubtopic.trim());
      
      onUpdate({ selectedSubtopics: newSubtopics });
      setCustomSubtopic("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomSubtopic();
    }
  };

  const removeCustomSubtopic = (topic: string) => {
    const newSubtopics = selectedSubtopics.filter((s) => s !== topic);
    onUpdate({ selectedSubtopics: newSubtopics });
  };

  // Get list of custom subtopics (not in module chapters and not "Not Mentioned")
  const customSubtopics = selectedSubtopics.filter(
    (sub) =>
      sub !== "Not Mentioned" &&
      !selectedModule?.chapters.some((ch) => ch.name === sub)
  );

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <BookCheck className="w-5 h-5 text-blue-600" />
        Select Subtopics (Optional)
      </Label>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
        {/* Not Mentioned Option */}
        <Label className="flex items-center gap-3 p-3 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-gray-300">
          <Checkbox
            checked={useNotMentioned}
            onCheckedChange={handleNotMentionedCheckbox}
            className="data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
            disabled={selectedSubtopics.length > 0 && !useNotMentioned}
          />
          <span className="text-sm font-semibold text-gray-700">
            Not Mentioned
          </span>
        </Label>

        {/* Other Option */}
        <Label className="flex items-center gap-3 p-3 bg-blue-50 rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-blue-200">
          <Checkbox
            checked={showCustomInput}
            onCheckedChange={handleOtherCheckbox}
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            disabled={useNotMentioned}
          />
          <span className="text-sm font-semibold text-blue-700">+ Other</span>
        </Label>

        {/* Existing Subtopics */}
        {selectedModule?.chapters.map((sub) => (
          <Label
            key={sub.name}
            className={`flex items-center gap-3 p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow cursor-pointer border ${
              useNotMentioned ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Checkbox
              checked={selectedSubtopics.includes(sub.name)}
              onCheckedChange={() => toggleSubtopic(sub.name)}
              className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              disabled={useNotMentioned}
            />
            <span className="text-sm font-medium">{sub.name}</span>
          </Label>
        ))}
      </div>

      {/* Custom Subtopic Input */}
      {showCustomInput && !useNotMentioned && (
        <div className="mt-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 animate-in slide-in-from-top-2 duration-200">
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Add Custom Subtopics
          </Label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter subtopic name and press Enter"
              value={customSubtopic}
              onChange={(e) => setCustomSubtopic(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <button
              type="button"
              onClick={addCustomSubtopic}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Press Enter or click Add to add multiple custom subtopics
          </p>
        </div>
      )}

      {/* Selected Subtopics */}
      {selectedSubtopics.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-600">
            Selected Subtopics ({selectedSubtopics.length})
          </Label>
          <div className="flex flex-wrap gap-2">
            {/* Not Mentioned Badge */}
            {useNotMentioned && (
              <Badge
                variant="default"
                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Not Mentioned
              </Badge>
            )}

            {/* Module Subtopics */}
            {!useNotMentioned &&
              selectedSubtopics
                .filter((topic) =>
                  selectedModule?.chapters.some((ch) => ch.name === topic)
                )
                .map((topic) => (
                  <Badge
                    key={topic}
                    variant="default"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {topic}
                  </Badge>
                ))}

            {/* Custom Subtopics with Remove Button */}
            {!useNotMentioned &&
              customSubtopics.map((topic) => (
                <Badge
                  key={topic}
                  variant="default"
                  className="bg-green-100 text-green-800 hover:bg-green-200 pr-1 flex items-center gap-1"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeCustomSubtopic(topic)}
                    className="ml-1 hover:bg-green-300 rounded-full p-0.5"
                    aria-label="Remove custom subtopic"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
          </div>
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
