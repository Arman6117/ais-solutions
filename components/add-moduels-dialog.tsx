"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { cn, getLevelColor } from "@/lib/utils";

type ModuleData = {
  id: string;
  name: string;
  chapters: string[];
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
};

const mockModules: ModuleData[] = Array.from({ length: 30 }, (_, i) => ({
  id: `${i}`,
  name: `Module ${i + 1}`,
  chapters: [`Intro ${i + 1}`, `Basics ${i + 1}`, `Project ${i + 1}`],
  difficulty:
    i % 3 === 0 ? "Beginner" : i % 3 === 1 ? "Intermediate" : "Advanced",
}));

export const AddModulesDialog = ({
  onAdd,
}: {
  onAdd: (selectedModules: ModuleData[]) => void;
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<ModuleData[]>(mockModules);

  useEffect(() => {
    setFiltered(
      mockModules.filter(
        (mod) =>
          mod.name.toLowerCase().includes(search.toLowerCase()) ||
          mod.chapters.some((ch) =>
            ch.toLowerCase().includes(search.toLowerCase())
          )
      )
    );
  }, [search]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const selectedModules = mockModules.filter((mod) =>
      selected.includes(mod.id)
    );
    onAdd(selectedModules);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="flex bg-primary-bg cursor-pointer hover:bg-primary-bg/90 items-center gap-1"
        >
          <Plus size={16} /> Add Module
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Select Modules</DialogTitle>
          <DialogDescription>
            Search and select modules from the system.
          </DialogDescription>
        </DialogHeader>

        <Input
          placeholder="Search modules or chapters..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3"
        />

        <ScrollArea className="h-[350px] pr-2">
          <div className="space-y-3">
            {filtered.map((mod) => (
              <div
                key={mod.id}
                className="p-3 rounded-md border hover:border-primary transition-all flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selected.includes(mod.id)}
                      onCheckedChange={() => toggleSelect(mod.id)}
                      id={`checkbox-${mod.id}`}
                    />
                    <label
                      htmlFor={`checkbox-${mod.id}`}
                      className="font-medium"
                    >
                      {mod.name}
                    </label>
                  </div>
                  {mod.difficulty && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs border-gray-300 text-muted-foreground",
                        getLevelColor(mod.difficulty)
                      )}
                    >
                      {mod.difficulty}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground ml-6 line-clamp-2">
                  {mod.chapters.join(", ")}
                </p>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-muted-foreground text-sm text-center pt-4">
                No matching modules found.
              </p>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-4">
          <Button onClick={handleAdd} disabled={selected.length === 0}>
            Confirm & Add {selected.length} Module
            {selected.length !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
