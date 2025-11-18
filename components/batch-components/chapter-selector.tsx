"use client";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ChapterSelectorProps = {
  chapters: string[];
  selectedChapter: string;
  onChange: (value: string) => void;
};

const ChapterSelector = ({ chapters, selectedChapter, onChange }: ChapterSelectorProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customChapter, setCustomChapter] = useState("");

  // Check if current selected chapter is a custom one (not in the list)
  useEffect(() => {
    if (selectedChapter && !chapters.includes(selectedChapter)) {
      setShowCustomInput(true);
      setCustomChapter(selectedChapter);
    }
  }, [selectedChapter, chapters]);

  const handleChapterChange = (value: string) => {
    if (value === "other") {
      setShowCustomInput(true);
      setCustomChapter("");
      onChange("");
    } else {
      setShowCustomInput(false);
      setCustomChapter("");
      onChange(value);
    }
  };

  const handleCustomChapterChange = (value: string) => {
    setCustomChapter(value);
    onChange(value || "Not Mentioned");
  };

  return (
    <div className="space-y-2">
      <Select 
        value={showCustomInput ? "other" : selectedChapter} 
        onValueChange={handleChapterChange}
      >
        <SelectTrigger className="max-w-40">
          <SelectValue placeholder="Select chapter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="other">
            <span className="font-semibold text-blue-600">+ Other</span>
          </SelectItem>
          {chapters.map((chapter) => (
            <SelectItem key={chapter} value={chapter}>
              {chapter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCustomInput && (
        <div className="animate-in slide-in-from-top-2 duration-200">
          <Input
            type="text"
            placeholder="Enter chapter name..."
            value={customChapter}
            onChange={(e) => handleCustomChapterChange(e.target.value)}
            className="max-w-40 text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ChapterSelector;
