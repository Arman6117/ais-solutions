"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ChapterSelectorProps = {
  chapters: string[];
  selectedChapter: string;
  onChange: (value: string) => void;
};

const ChapterSelector = ({ chapters, selectedChapter, onChange }: ChapterSelectorProps) => {
  return (
    <Select value={selectedChapter} onValueChange={onChange}>
      <SelectTrigger className="max-w-40">
        <SelectValue placeholder="Select chapter" />
      </SelectTrigger>
      <SelectContent>
        {chapters.map((chapter) => (
          <SelectItem key={chapter} value={chapter}>
            {chapter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChapterSelector;
