"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Trash2, X, Plus } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Types
interface Note {
  id: string;
  moduleName: string;
  chapterName: string;
  dateCreated: string;
  youtubeLinks: string[];
  pdfFiles: string[];
}

// Mock data for demonstration
const dummyData: Note[] = [
  {
    id: "1",
    moduleName: "Introduction to AI",
    chapterName: "Neural Networks",
    dateCreated: "2025-01-15",
    youtubeLinks: ["https://youtube.com/watch?v=abc123", "https://youtube.com/watch?v=def456"],
    pdfFiles: ["note1.pdf", "note2.pdf"],
  },
  {
    id: "2",
    moduleName: "Data Science",
    chapterName: "Statistics Basics",
    dateCreated: "2025-02-10",
    youtubeLinks: ["https://youtube.com/watch?v=ghi789"],
    pdfFiles: ["stats_note.pdf"],
  },
  {
    id: "3",
    moduleName: "Machine Learning",
    chapterName: "Supervised Learning",
    dateCreated: "2025-03-05",
    youtubeLinks: [],
    pdfFiles: ["ml_note1.pdf", "ml_note2.pdf"],
  },
];

// Column definitions
const createColumns = (handleDeleteLink, handleAddLink) => [
  {
    id: "moduleName",
    header: "Module Name",
    accessor: (note: Note) => note.moduleName,
  },
  {
    id: "chapterName",
    header: "Chapter Name",
    accessor: (note: Note) => note.chapterName,
  },
  {
    id: "dateCreated",
    header: "Date Created",
    accessor: (note: Note) => new Date(note.dateCreated).toLocaleDateString(),
  },
  {
    id: "youtubeLinks",
    header: "YouTube Links",
    accessor: (note: Note) => (
      <LinkList 
        items={note.youtubeLinks} 
        noteId={note.id} 
        fieldName="youtubeLinks" 
        handleDelete={handleDeleteLink}
        handleAdd={handleAddLink}
        isUrl={true}
        buttonText="Add Link"
      />
    ),
  },
  {
    id: "pdfFiles",
    header: "PDF Notes",
    accessor: (note: Note) => (
      <LinkList 
        items={note.pdfFiles} 
        noteId={note.id} 
        fieldName="pdfFiles" 
        handleDelete={handleDeleteLink}
        handleAdd={handleAddLink}
        basePath="/files/"
        buttonText="Add PDF"
      />
    ),
  },
];

// LinkList component for both YouTube links and PDF files
const LinkList = ({ 
  items, 
  noteId, 
  fieldName, 
  handleDelete, 
  handleAdd, 
  isUrl = false, 
  basePath = "", 
  buttonText = "Add Item" 
}) => (
  <div className="flex flex-col gap-1">
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-2">
        <a 
          href={isUrl ? item : `${basePath}${item}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline"
        >
          {isUrl ? `Link ${index + 1}` : item}
        </a>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete(noteId, fieldName, index);
          }}
          className="h-6 w-6"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    ))}
    <Button
      variant="outline"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAdd(noteId, fieldName);
      }}
      className="mt-1"
    >
      {buttonText}
    </Button>
  </div>
);

// Search component
const SearchBar = ({ 
  searchTerm, 
  setSearchTerm, 
  setCurrentPage, 
  isMobile, 
  isSearchExpanded, 
  setIsSearchExpanded 
}) => {
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

// Sorting component
const SortSelector = ({ sortType, setSortType, setCurrentPage }) => (
  <Select
    value={sortType}
    onValueChange={(val) => {
      setSortType(val);
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

// NoteCard component for mobile view
const NoteCard = ({ note, columns, selectedIds, handleToggleSelect, handleDeleteSelected }) => (
  <div className="bg-white rounded-lg shadow p-4 border">
    <div className="flex justify-between items-center mb-2">
      <Checkbox
        checked={selectedIds.includes(note.id)}
        onCheckedChange={() => handleToggleSelect(note.id)}
        className="mr-2"
      />
      <Button
        className="flex items-center size-7 justify-center rounded-full cursor-pointer hover:bg-destructive hover:text-white"
        variant="outline"
        onClick={() => handleDeleteSelected([note.id])}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
    <Link href={`/notes/${note.id}?mode=view`} className="block">
      {columns.map((col) => (
        <div key={col.id} className="py-1 border-b last:border-b-0">
          <div className="font-medium text-sm text-gray-500">{col.header}</div>
          <div>{col.accessor(note)}</div>
        </div>
      ))}
    </Link>
  </div>
);

// New Note Creation Form
const NewNoteForm = ({ newNote, setNewNote, handleCreateNote, setIsCreating }) => (
  <TableRow>
    <TableCell />
    <TableCell>
      <Input
        value={newNote.moduleName || ""}
        onChange={(e) => setNewNote({ ...newNote, moduleName: e.target.value })}
        placeholder="Module Name"
      />
    </TableCell>
    <TableCell>
      <Input
        value={newNote.chapterName || ""}
        onChange={(e) => setNewNote({ ...newNote, chapterName: e.target.value })}
        placeholder="Chapter Name"
      />
    </TableCell>
    <TableCell>
      <Input
        type="date"
        value={newNote.dateCreated || ""}
        onChange={(e) => setNewNote({ ...newNote, dateCreated: e.target.value })}
      />
    </TableCell>
    <TableCell>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const link = prompt("Enter YouTube link:");
          if (link) {
            setNewNote({
              ...newNote,
              youtubeLinks: [...(newNote.youtubeLinks || []), link],
            });
          }
        }}
      >
        Add Link
      </Button>
    </TableCell>
    <TableCell>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const file = prompt("Enter PDF filename:");
          if (file) {
            setNewNote({
              ...newNote,
              pdfFiles: [...(newNote.pdfFiles || []), file],
            });
          }
        }}
      >
        Add PDF
      </Button>
    </TableCell>
    <TableCell>
      <div className="flex gap-2">
        <Button onClick={handleCreateNote}>Save</Button>
        <Button
          variant="ghost"
          onClick={() => {
            setIsCreating(false);
            setNewNote({});
          }}
        >
          Cancel
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

// Main NotesTable component
export function NotesTable() {
  const [notes, setNotes] = useState<Note[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("dateCreated-desc");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState<Partial<Note>>({});

  // Responsive handling
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const pageSize = isMobile ? 5 : 10;

  // Link management functions
  const handleDeleteLink = (noteId, field, index) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, [field]: note[field].filter((_, i) => i !== index) }
          : note
      )
    );
    toast.success(`${field === "youtubeLinks" ? "YouTube link" : "PDF file"} deleted`);
  };

  const handleAddLink = (noteId, field) => {
    const newItem = prompt(`Enter new ${field === "youtubeLinks" ? "YouTube link" : "PDF filename"}:`);
    if (newItem) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? { ...note, [field]: [...note[field], newItem] }
            : note
        )
      );
      toast.success(`${field === "youtubeLinks" ? "YouTube link" : "PDF file"} added`);
    }
  };

  // Data filtering and sorting
  const filteredData = useMemo(() => {
    let sorted = [...notes];
    if (sortType) {
      const [key, order] = sortType.split("-");
      sorted.sort((a, b) => {
        const aVal = key === "dateCreated" ? new Date(a[key]) : String(a[key as keyof Note]).toLowerCase();
        const bVal = key === "dateCreated" ? new Date(b[key]) : String(b[key as keyof Note]).toLowerCase();

        if (key === "dateCreated") {
          return order === "asc" ? (aVal as Date).getTime() - (bVal as Date).getTime() : (bVal as Date).getTime() - (aVal as Date).getTime();
        }
        return order === "asc" ? (aVal as string).localeCompare(bVal as string) : (bVal as string).localeCompare(aVal as string);
      });
    }
    return sorted.filter((note) =>
      JSON.stringify(note).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sortType, notes]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // Selection functions
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = filteredData.map((note) => note.id);
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...prev, ...allIds.filter((id) => !prev.includes(id))]);
    }
    toast.success(`${allSelected ? "Deselected" : "Selected"} ${allIds.length} items`);
  };

  // Action functions
  const handleReset = () => {
    setSearchTerm("");
    setSortType("dateCreated-desc");
    setCurrentPage(0);
  };

  const handleDeleteSelected = (ids) => {
    setNotes((prev) => prev.filter((note) => !ids.includes(note.id)));
    setSelectedIds((prev) => prev.filter(id => !ids.includes(id)));
    toast.success("Selected notes deleted");
  };

  const handleCreateNote = () => {
    if (isCreating) {
      if (newNote.moduleName && newNote.chapterName) {
        setNotes((prev) => [
          ...prev,
          {
            id: `${Date.now()}`,
            moduleName: newNote.moduleName || '',
            chapterName: newNote.chapterName || '',
            dateCreated: newNote.dateCreated || new Date().toISOString().split('T')[0],
            youtubeLinks: newNote.youtubeLinks || [],
            pdfFiles: newNote.pdfFiles || [],
          },
        ]);
        setIsCreating(false);
        setNewNote({});
        toast.success("Note created");
      } else {
        toast.error("Please fill all required fields");
      }
    } else {
      setIsCreating(true);
      setNewNote({ dateCreated: new Date().toISOString().split("T")[0] });
    }
  };

  const columns = createColumns(handleDeleteLink, handleAddLink);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Desktop Header */}
      {!isMobile && (
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 md:items-center">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            setCurrentPage={setCurrentPage}
            isMobile={isMobile}
            isSearchExpanded={isSearchExpanded}
            setIsSearchExpanded={setIsSearchExpanded}
          />
          <div className="flex gap-2 flex-wrap">
            <SortSelector 
              sortType={sortType} 
              setSortType={setSortType} 
              setCurrentPage={setCurrentPage} 
            />
            <Button
              className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80"
              onClick={handleCreateNote}
            >
              <Plus className="mr-2 size-4" /> Create Note
            </Button>
          </div>
          {selectedIds.length > 0 && (
            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={() => handleDeleteSelected(selectedIds)}
            >
              <Trash2 className="mr-1" />({selectedIds.length})
            </Button>
          )}
        </div>
      )}

      {/* Mobile Header */}
      {isMobile && (
        <>
          <div className="flex justify-between items-center w-full mb-4">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              setCurrentPage={setCurrentPage}
              isMobile={isMobile}
              isSearchExpanded={isSearchExpanded}
              setIsSearchExpanded={setIsSearchExpanded}
            />
            {selectedIds.length > 0 && (
              <Button
                className="cursor-pointer"
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteSelected(selectedIds)}
              >
                <Trash2 className="mr-1 size-4" />
                {selectedIds.length}
              </Button>
            )}
          </div>
          <div className="flex gap-2 mb-4">
            <SortSelector 
              sortType={sortType} 
              setSortType={setSortType} 
              setCurrentPage={setCurrentPage} 
            />
            <Button
              className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80 shrink-0"
              onClick={handleReset}
              size="sm"
            >
              Reset
            </Button>
            <Button
              className="bg-primary-bg cursor-pointer hover:bg-primary-bg/80 shrink-0"
              onClick={handleCreateNote}
              size="sm"
            >
              <Plus className="mr-2 size-4" /> Create
            </Button>
          </div>
        </>
      )}

      {/* Content: Table or Cards */}
      {isMobile ? (
        // Mobile Card View
        <div className="grid grid-cols-1 gap-4">
          {paginatedData.length > 0 ? (
            paginatedData.map((note) => (
              <NoteCard 
                key={note.id}
                note={note}
                columns={columns}
                selectedIds={selectedIds}
                handleToggleSelect={handleToggleSelect}
                handleDeleteSelected={handleDeleteSelected}
              />
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <p className="text-muted-foreground">No notes found.</p>
            </div>
          )}
        </div>
      ) : (
        // Desktop Table View
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-center">
                <TableHead className="text-center w-12">
                  <Checkbox
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((note) => selectedIds.includes(note.id))
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {columns.map((column) => (
                  <TableHead className="text-center" key={column.id}>
                    {column.header}
                  </TableHead>
                ))}
                <TableHead className="text-center w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isCreating && (
                <NewNoteForm 
                  newNote={newNote}
                  setNewNote={setNewNote}
                  handleCreateNote={handleCreateNote}
                  setIsCreating={setIsCreating}
                />
              )}
              {paginatedData.length > 0 ? (
                paginatedData.map((note) => (
                  <TableRow key={note.id}>
                    <TableCell className="font-semibold text-center">
                      <Checkbox
                        checked={selectedIds.includes(note.id)}
                        onCheckedChange={() => handleToggleSelect(note.id)}
                      />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell className="text-center" key={col.id}>
                        <Link href={`/notes/${note.id}?mode=view`}>{col.accessor(note)}</Link>
                      </TableCell>
                    ))}
                    <TableCell className="text-center flex gap-2 justify-center items-center">
                      <Button
                        className="flex items-center size-7 justify-center rounded-full cursor-pointer hover:bg-destructive hover:text-white"
                        variant="outline"
                        onClick={() => handleDeleteSelected([note.id])}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} className="text-center text-muted-foreground h-24">
                    No notes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${currentPage === 0 ? "opacity-50 pointer-events-none" : ""}`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              />
            </PaginationItem>
            <div className="text-sm mx-2">
              Page {currentPage + 1} of {totalPages}
            </div>
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${currentPage + 1 >= totalPages ? "opacity-50 pointer-events-none" : ""}`}
                onClick={() => setCurrentPage((prev) => prev + 1 < totalPages ? prev + 1 : prev)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}