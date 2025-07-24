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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Student = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  avatar: string;
};

export function AddStudentsDialog({
  onAdd,
}: {
  onAdd: (students: Student[]) => void;
}) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Student[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    const parsed = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (parsed.length === 0) return;

    setLoading(true);
    setTimeout(() => {
      const fakeResults: Student[] = parsed.map((entry, idx) => ({
        id: `id-${idx}`,
        name: `Student ${idx + 1}`,
        email: entry,
        joinedAt: "2024-01-15",
        avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${entry}`,
      }));
      setResults(fakeResults);
      setSelectedIds(new Set()); // Reset selection
      setLoading(false);
    }, 600);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const selectedStudents = results.filter((student) =>
    selectedIds.has(student.id)
  );

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
            Search by email or ID (comma separated). Select students to add.
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

          <ScrollArea className="max-h-64 rounded-md border p-3">
            {loading ? (
              <p className="text-muted-foreground">Searching...</p>
            ) : results.length > 0 ? (
              <div className="grid gap-3">
                {results.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-start gap-4 p-3 rounded-md border hover:bg-muted/30 transition-all"
                  >
                    <Checkbox
                      checked={selectedIds.has(student.id)}
                      onCheckedChange={() => toggleSelect(student.id)}
                      className="mt-1"
                    />
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined on {student.joinedAt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
              onAdd(selectedStudents);
            }}
            disabled={selectedStudents.length === 0}
          >
            Add {selectedStudents.length} Student
            {selectedStudents.length > 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
