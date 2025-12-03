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
  Loader2,
} from "lucide-react";
import { globalSearch, SearchResultItem } from "@/actions/admin/global-search";

type CategoryKey = "students" | "courses" | "batches" | "modules" | "instructors";

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

interface SearchResultProps {
  item: SearchResultItem;
  onClick: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ item, onClick }) => {
  return (
    <Card
      className="hover:shadow-md border border-gray-100 transition cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-1">
        <div className="flex justify-between items-start">
            <Badge variant="outline" className="capitalize mb-1 text-xs">
            {item.category}
            </Badge>
        </div>
        
        <p className="font-medium text-sm text-gray-900">{item.title}</p>
        <p className="text-xs text-gray-500">{item.subtitle}</p>
        <p className="text-xs text-muted-foreground mt-1 bg-gray-50 inline-block px-1 rounded">
            {item.meta}
        </p>
      </CardContent>
    </Card>
  );
};

export default function GlobalSearchBar(): JSX.Element {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref to focus input
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
    // Only search if both query and category are present
    if (!query || !selectedCategory) {
      setFiltered([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await globalSearch(query, selectedCategory);
        setFiltered(results);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, selectedCategory]);

  const handleResultClick = (item: SearchResultItem): void => {
    let route = "";
    // Map categories to your actual route structure
    switch (item.category) {
        case "students": route = `/admin/all-students/student-details/${item.id}`; break;
        case "courses": route = `/admin/courses/${item.id}`; break;
        case "batches": route = `/admin/all-batches/batch-details/${item.id}`; break;
        case "modules": route = `/admin/modules/${item.id}`; break;
        case "instructors": route = `/admin/instructors/${item.id}`; break;
    }
    
    if (route) {
        router.push(route);
        setShowDropdown(false);
    }
  };

  const handleCategorySelect = (categoryKey: CategoryKey): void => {
    setSelectedCategory(categoryKey);
    setQuery("");
    setFiltered([]);
    // Focus the input immediately after selecting a category
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleClearSelection = (): void => {
    setSelectedCategory(null);
    setQuery("");
    setFiltered([]);
    // Keep dropdown open to pick a new category
    setShowDropdown(true);
  };

  const getPlaceholderText = (): string => {
    return selectedCategory
      ? `Search in ${selectedCategory}...`
      : "Select a category to start searching...";
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto mt-8">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <Input
          ref={inputRef}
          placeholder={getPlaceholderText()}
          value={query}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 pr-10"
          // FIX: Removed disabled prop so you can click it to open the dropdown
        />
        
        <div className="absolute right-3 top-2.5 flex items-center gap-2">
            {isLoading && <Loader2 className="animate-spin text-violet-500" size={18} />}
            
            {selectedCategory && !isLoading && (
            <XCircle
                size={18}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={handleClearSelection}
            />
            )}
        </div>
      </div>

      {showDropdown && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-50 p-4 space-y-4 max-h-[400px] overflow-y-auto">
          
          {/* STEP 1: Category Selection (Show if no category selected) */}
          {!selectedCategory ? (
            <>
              <p className="text-sm text-muted-foreground font-medium">Select a category:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <Button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    variant="outline"
                    className="w-full justify-start gap-2 transition hover:bg-violet-50 text-xs sm:text-sm h-auto py-3"
                  >
                    {cat.icon}
                    {cat.label}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            /* STEP 2: Search Results (Show if category selected) */
            <>
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Searching in:</span>
                    <Badge variant="secondary" className="capitalize bg-violet-100 text-violet-700 hover:bg-violet-200">
                      {selectedCategory}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs text-gray-500 hover:text-red-500"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Change
                  </Button>
              </div>

              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <Loader2 className="h-6 w-6 animate-spin mb-2" />
                    <span className="text-xs">Searching...</span>
                 </div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {filtered.map((item) => (
                    <SearchResult
                      key={item.id}
                      item={item}
                      onClick={() => handleResultClick(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 font-medium">
                    {query.length > 1 ? "No results found." : "Type at least 2 characters..."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
