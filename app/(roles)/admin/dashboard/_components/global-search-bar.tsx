"use client";

import React, { useRef, useState, useEffect, JSX } from "react";
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

// Define types for each data category
type Student = {
  id: string;
  name: string;
  email: string;
  batches: string[];
};

type Course = {
  id: string;
  name: string;
  startDate: string;
};

type Batch = {
  id: string;
  name: string;
  courseName: string;
};

type Module = {
  id: string;
  name: string;
  chapters: string[];
};

type Instructor = {
  id: string;
  name: string;
  email: string;
  modules: string[];
};

// Union type for all possible search items
type SearchItem = Student | Course | Batch | Module | Instructor;

// Type for the mock data structure
type MockData = {
  students: Student[];
  courses: Course[];
  batches: Batch[];
  modules: Module[];
  instructors: Instructor[];
};

// Define category keys as a union type
type CategoryKey = keyof MockData;

// Type for category configuration
type Category = {
  key: CategoryKey;
  icon: React.ReactNode;
  label: string;
};

const categories: readonly Category[] = [
  { key: "students", icon: <Users size={16} />, label: "Students" },
  { key: "courses", icon: <BookOpen size={16} />, label: "Courses" },
  { key: "batches", icon: <GraduationCap size={16} />, label: "Batches" },
  { key: "modules", icon: <FileCode size={16} />, label: "Modules" },
  { key: "instructors", icon: <User2 size={16} />, label: "Instructors" },
] as const;

const mockData: MockData = {
  students: [{ id: "1", name: "Amna", email: "amna@mail.com", batches: ["Batch A"] }],
  courses: [{ id: "c1", name: "Fullstack", startDate: "2025-01-01" }],
  batches: [{ id: "b1", name: "Batch A", courseName: "Fullstack" }],
  modules: [{ id: "m1", name: "React", chapters: ["Hooks", "JSX"] }],
  instructors: [{ id: "i1", name: "John", email: "john@teach.com", modules: ["React"] }],
};

// Type guard functions for better type checking
const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

// Helper function to check if an item matches the search query
const itemMatchesQuery = (item: SearchItem, query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  
  return Object.values(item).some((value) => {
    if (isString(value)) {
      return value.toLowerCase().includes(lowerQuery);
    }
    if (isStringArray(value)) {
      return value.some((v) => v.toLowerCase().includes(lowerQuery));
    }
    return false;
  });
};

interface SearchResultProps {
  item: SearchItem;
  category: CategoryKey;
  onClick: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ item, category, onClick }) => {
  const renderContent = () => {
    switch (category) {
      case "students": {
        const student = item as Student;
        return (
          <>
            <p className="font-medium">{student.name}</p>
            <p className="text-xs text-gray-500">{student.email}</p>
            <p className="text-xs text-muted-foreground">
              Batches: {student.batches.join(", ")}
            </p>
          </>
        );
      }
      case "courses": {
        const course = item as Course;
        return (
          <>
            <p className="font-medium">{course.name}</p>
            <p className="text-xs text-muted-foreground">
              Start: {course.startDate}
            </p>
          </>
        );
      }
      case "batches": {
        const batch = item as Batch;
        return (
          <>
            <p className="font-medium">{batch.name}</p>
            <p className="text-xs text-muted-foreground">
              Course: {batch.courseName}
            </p>
          </>
        );
      }
      case "modules": {
        const moduleItem = item as Module;
        return (
          <>
            <p className="font-medium">{moduleItem.name}</p>
            <p className="text-xs text-muted-foreground">
              Chapters: {moduleItem.chapters.join(", ")}
            </p>
          </>
        );
      }
      case "instructors": {
        const instructor = item as Instructor;
        return (
          <>
            <p className="font-medium">{instructor.name}</p>
            <p className="text-xs text-gray-500">{instructor.email}</p>
            <p className="text-xs text-muted-foreground">
              Modules: {instructor.modules.join(", ")}
            </p>
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Card
      className="hover:shadow-md border border-gray-100 transition cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-1">
        <Badge variant="outline" className="capitalize mb-1">
          {category}
        </Badge>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default function GlobalSearchBar(): JSX.Element {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<SearchItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || !selectedCategory) {
      setFiltered([]);
      return;
    }
    
    const rawData = mockData[selectedCategory];
    const results = rawData.filter((item) => itemMatchesQuery(item, query));
    setFiltered(results);
  }, [query, selectedCategory]);

  const handleResultClick = (item: SearchItem): void => {
    if (!selectedCategory) return;
    router.push(`/admin/${selectedCategory}/${item.id}`);
  };

  const handleCategorySelect = (categoryKey: CategoryKey): void => {
    setSelectedCategory(categoryKey);
    setQuery("");
    setFiltered([]);
  };

  const handleClearSelection = (): void => {
    setSelectedCategory(null);
    setQuery("");
    setFiltered([]);
  };

  const getPlaceholderText = (): string => {
    return selectedCategory
      ? `Search in ${selectedCategory}...`
      : "Search students, courses, modules...";
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto mt-8">
      {/* Main input */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <Input
          placeholder={getPlaceholderText()}
          value={query}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-10"
        />
        {selectedCategory && (
          <XCircle
            size={18}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500 cursor-pointer"
            onClick={handleClearSelection}
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
                    onClick={() => handleCategorySelect(cat.key)}
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
                    <SearchResult
                      key={item.id}
                      item={item}
                      category={selectedCategory}
                      onClick={() => handleResultClick(item)}
                    />
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