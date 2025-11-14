
"use client";
import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TopicsInputProps {
  topics: string[];
  onChange: (topics: string[]) => void;
  placeholder?: string;
}

const TopicsInput: React.FC<TopicsInputProps> = ({
  topics,
  onChange,
  placeholder = "Type topic and press Enter",
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!topics.includes(inputValue.trim())) {
        onChange([...topics, inputValue.trim()]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && topics.length > 0) {
      onChange(topics.slice(0, -1));
    }
  };

  const removeTopic = (topicToRemove: string) => {
    onChange(topics.filter((topic) => topic !== topicToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {topics.map((topic, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1"
          >
            {topic}
            <button
              type="button"
              onClick={() => removeTopic(topic)}
              className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full"
      />
      <p className="text-xs text-muted-foreground">
        Press Enter to add topics, Backspace to remove last
      </p>
    </div>
  );
};

export default TopicsInput;
