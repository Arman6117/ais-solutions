import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortField = "moduleName" | "chapterName" | "dateCreated";
type SortDirection = "asc" | "desc";
type SortType = `${SortField}-${SortDirection}`;
type SortSelectorProps = {
  sortType: SortType;
  setSortType: (sortType: SortType) => void;
  setCurrentPage: (page: number) => void;
};
const SortSelector = ({
  sortType,
  setSortType,
  setCurrentPage,
}: SortSelectorProps) => (
  <Select
    value={sortType}
    onValueChange={(val) => {
      setSortType(val as SortType);
      setCurrentPage(0);
    }}
  >
    <SelectTrigger className="w-full md:w-48 focus-visible:border-none focus-visible:ring-violet-200 hover:border-violet-200 focus-visible:ring-2 font-semibold text-sm">
      <SelectValue placeholder="Sort" />
    </SelectTrigger>
    <SelectContent className="text-sm font-semibold p-2">
      <SelectItem value="dateCreated-desc">Date (Newest First)</SelectItem>
      <SelectItem value="dateCreated-asc">Date (Oldest First)</SelectItem>
      <SelectItem value="moduleName-asc">Module (A-Z)</SelectItem>
      <SelectItem value="moduleName-desc">Module (Z-A)</SelectItem>
      <SelectItem value="chapterName-asc">Chapter (A-Z)</SelectItem>
      <SelectItem value="chapterName-desc">Chapter (Z-A)</SelectItem>
    </SelectContent>
  </Select>
);

export default SortSelector;
