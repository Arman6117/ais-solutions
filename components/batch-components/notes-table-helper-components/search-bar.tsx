import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, X } from "lucide-react";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  isMobile: boolean;
  isSearchExpanded: boolean;
  setIsSearchExpanded: (expanded: boolean) => void;
};
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  isMobile,
  isSearchExpanded,
  setIsSearchExpanded,
}: SearchBarProps) => {
  if (isMobile && isSearchExpanded) {
    return (
      <div className="flex items-center gap-2 w-full mb-4">
        <Input
          value={searchTerm}
          placeholder="Search notes..."
          className="text-base font-medium focus-visible:ring-1 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
          autoFocus
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsSearchExpanded(false)}
          className="shrink-0"
        >
          <X className="size-5" />
        </Button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <Button
        variant="outline"
        className="text-sm px-3"
        onClick={() => setIsSearchExpanded(true)}
      >
        <Search className="mr-2 size-4" />
        Search
      </Button>
    );
  }

  return (
    <div className="flex gap-2 w-full md:w-auto md:flex-1">
      <Input
        value={searchTerm}
        placeholder="Search notes..."
        className="text-base font-medium focus-visible:ring-1 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200"
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(0);
        }}
      />
      <Button
        className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
        onClick={() => setSearchTerm(searchTerm)}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default SearchBar;