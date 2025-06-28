"use client";

import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import {
  Users,
  BookOpen,
  GraduationCap,
  FileCode,
  User2,
  Search,
  XCircle,
} from "lucide-react";

const categories = [
  { key: "students", icon: <Users size={16} />, label: "Students" },
  { key: "courses", icon: <BookOpen size={16} />, label: "Courses" },
  { key: "batches", icon: <GraduationCap size={16} />, label: "Batches" },
  { key: "modules", icon: <FileCode size={16} />, label: "Modules" },
  { key: "instructors", icon: <User2 size={16} />, label: "Instructors" },
] as const;

const mockData = {
  students: [{ id: "1", name: "Amna", email: "amna@mail.com", batches: ["Batch A"] }],
  courses: [{ id: "c1", name: "Fullstack", startDate: "2025-01-01" }],
  batches: [{ id: "b1", name: "Batch A", courseName: "Fullstack" }],
  modules: [{ id: "m1", name: "React", chapters: ["Hooks", "JSX"] }],
  instructors: [{ id: "i1", name: "John", email: "john@teach.com", modules: ["React"] }],
};

export default function GlobalSearchBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<any[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || !selectedCategory) return setFiltered([]);
    const q = query.toLowerCase();
    const raw = mockData[selectedCategory as keyof typeof mockData] || [];
    const results = raw.filter((item: any) =>
      Object.values(item).some((val) =>
        typeof val === "string"
          ? val.toLowerCase().includes(q)
          : Array.isArray(val)
          ? val.some((v) => v.toLowerCase().includes(q))
          : false
      )
    );
    setFiltered(results);
  }, [query, selectedCategory]);

  const handleResultClick = (item: any) => {
    if (!selectedCategory) return;
    router.push(`/admin/${selectedCategory}/${item.id}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto mt-8">
      {/* Main input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <Input
          placeholder={
            selectedCategory
              ? `Search in ${selectedCategory}...`
              : "Search students, courses, modules..."
          }
          value={query}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-10"
        />
        {selectedCategory && (
          <XCircle
            size={18}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={() => {
              setSelectedCategory(null);
              setQuery("");
              setFiltered([]);
            }}
          />
        )}
      </div>

      {/* Dropdown Panel */}
      {showDropdown && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10 p-4 space-y-4">
          {!selectedCategory ? (
            <>
              <p className="text-sm text-muted-foreground">Search in:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <Button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      setQuery("");
                      setFiltered([]);
                    }}
                    variant="outline"
                    className="w-full justify-start gap-2 transition hover:bg-violet-100"
                  >
                    {cat.icon}
                    {cat.label}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <>
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
                  {filtered.map((item) => (
                    <Card
                      key={item.id}
                      className="hover:shadow-md border border-gray-100 transition cursor-pointer"
                      onClick={() => handleResultClick(item)}
                    >
                      <CardContent className="p-4 space-y-1">
                        <Badge variant="outline" className="capitalize mb-1">
                          {selectedCategory}
                        </Badge>
                        {selectedCategory === "students" && (
                          <>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Batches: {item.batches.join(", ")}
                            </p>
                          </>
                        )}
                        {selectedCategory === "courses" && (
                          <>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Start: {item.startDate}
                            </p>
                          </>
                        )}
                        {selectedCategory === "batches" && (
                          <>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Course: {item.courseName}
                            </p>
                          </>
                        )}
                        {selectedCategory === "modules" && (
                          <>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Chapters: {item.chapters.join(", ")}
                            </p>
                          </>
                        )}
                        {selectedCategory === "instructors" && (
                          <>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Modules: {item.modules.join(", ")}
                            </p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">
                  No results found.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
