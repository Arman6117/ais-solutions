// components/students/AddStudentsDialog.tsx
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { SearchIcon } from "lucide-react";

export function AddStudentsDialog({
  onAdd,
}: {
  onAdd: (students: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const parsed = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (parsed.length === 0) return;

    setLoading(true);
    // simulate API search or return fake users
    setTimeout(() => {
      setResults(parsed);
      setLoading(false);
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white hover:bg-purple-50 text-black cursor-pointer">
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Students</DialogTitle>
          <DialogDescription>
            Enter student emails or IDs, separated by commas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g. john@example.com, 12345"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="button" onClick={handleSearch}>
              <SearchIcon className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="max-h-52 rounded-md border p-2">
            {loading ? (
              <p className="text-muted-foreground">Searching...</p>
            ) : results.length > 0 ? (
              <ul className="space-y-1">
                {results.map((res, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-800 border-b pb-1"
                  >
                    {res}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No students found.
              </p>
            )}
          </ScrollArea>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={() => {
              onAdd(results);
            }}
            disabled={results.length === 0}
          >
            Add {results.length} Students
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
