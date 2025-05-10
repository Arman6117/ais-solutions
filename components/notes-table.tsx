"use client";
import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
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

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Trash2, Plus } from "lucide-react";
import LinkList from "./batch-components/notes-table-helper-components/link-list";
import SearchBar from "./batch-components/notes-table-helper-components/search-bar";
import SortSelector from "./batch-components/notes-table-helper-components/sort-selector";
import NoteCard from "./batch-components/notes-table-helper-components/note-card";
import { Note } from "@/lib/types";
import NewNoteForm from "./batch-components/notes-table-helper-components/new-note-form";
import { dummyData } from "@/lib/static";

// Types
type SortField = "moduleName" | "chapterName" | "dateCreated";
type SortDirection = "asc" | "desc";
type SortType = `${SortField}-${SortDirection}`;
type LinkField = "youtubeLinks" | "pdfFiles" | "files";

interface Column {
  id: string;
  header: string;
  accessor: (note: Note) => React.ReactNode;
};


const createColumns = ({
  handleDeleteLink,
  handleAddLink,
  handleDeleteFile,
  handleAddFile,
}: {
  handleDeleteLink: (
    noteId: string,
    fieldName: LinkField,
    index: number
  ) => void;
  handleAddLink: (noteId: string, fieldName: LinkField) => void;
  handleDeleteFile: (
    noteId: string,
    fieldName: LinkField,
    index: number
  ) => void;
  handleAddFile: (noteId: string, fieldName: LinkField) => void;
}): Column[] => [
  {
    id: "moduleName",
    header: "Module Name",
    accessor: (note: Note) => <span>{note.moduleName}</span>,
  },
  {
    id: "chapterName",
    header: "Chapter Name",
    accessor: (note: Note) => <span>{note.chapterName}</span>,
  },
  {
    id: "dateCreated",
    header: "Date Created",
    accessor: (note: Note) => (
      <span>{new Date(note.dateCreated).toLocaleDateString()}</span>
    ),
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
    id: "files",
    header: "Files & Notes",
    accessor: (note: Note) => {
      // Handle both legacy pdfFiles array and new files array
      if (note.files && Array.isArray(note.files)) {
        return (
          <LinkList
            items={note.files}
            noteId={note.id}
            fieldName="files"
            handleDelete={handleDeleteFile}
            handleAdd={handleAddFile}
            isFile={true}
            basePath="/files/"
            buttonText="Add File"
          />
        );
      } else if (note.pdfFiles && Array.isArray(note.pdfFiles)) {
        // Convert legacy pdfFiles to file objects for backward compatibility
        const convertedFiles = note.pdfFiles.map(filename => ({
          name: filename,
          type: "application/pdf"
        }));
        
        return (
          <LinkList
            items={convertedFiles}
            noteId={note.id}
            fieldName="files"
            handleDelete={handleDeleteFile}
            handleAdd={handleAddFile}
            isFile={true}
            basePath="/files/"
            buttonText="Add File"
          />
        );
      }
      
      return (
        <LinkList
          items={[]}
          noteId={note.id}
          fieldName="files"
          handleDelete={handleDeleteFile}
          handleAdd={handleAddFile}
          isFile={true}
          basePath="/files/"
          buttonText="Add File"
        />
      );
    },
  },
];

export function NotesTable() {
  const [notes, setNotes] = useState<Note[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState<SortType>("dateCreated-desc");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState<Partial<Note>>({
    youtubeLinks: [],
    pdfFiles: [],
  });

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
  const handleDeleteLink = (
    noteId: string,
    field: LinkField,
    index: number
  ) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, [field]: note[field].filter((_, i) => i !== index) }
          : note
      )
    );
    toast.success(
      `${field === "youtubeLinks" ? "YouTube link" : "PDF file"} deleted`
    );
  };

  const handleAddLink = (noteId: string, field: LinkField) => {
    const newItem = prompt(
      `Enter new ${field === "youtubeLinks" ? "YouTube link" : "PDF filename"}:`
    );
    if (newItem) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === noteId
            ? { ...note, [field]: [...note[field], newItem] }
            : note
        )
      );
      toast.success(
        `${field === "youtubeLinks" ? "YouTube link" : "PDF file"} added`
      );
    }
  };

  const filteredData = useMemo(() => {
    let sorted = [...notes];
    if (sortType) {
      const [key, order] = sortType.split("-") as [SortField, SortDirection];
      sorted.sort((a, b) => {
        if (key === "dateCreated") {
          const aDate = new Date(a[key]);
          const bDate = new Date(b[key]);
          return order === "asc"
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime();
        }

        const aVal = String(a[key]).toLowerCase();
        const bVal = String(b[key]).toLowerCase();
        return order === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
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
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = paginatedData.map((note) => note.id);
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allIds.includes(id)));
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...allIds.filter((id) => !prev.includes(id)),
      ]);
    }
    toast.success(
      `${allSelected ? "Deselected" : "Selected"} ${allIds.length} items`
    );
  };

  // Action functions
  const handleReset = () => {
    setSearchTerm("");
    setSortType("dateCreated-desc");
    setCurrentPage(0);
  };

  const handleDeleteSelected = (ids: string[]) => {
    setNotes((prev) => prev.filter((note) => !ids.includes(note.id)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    toast.success("Selected notes deleted");
  };

  const handleCreateNote = () => {
    if (isCreating) {
      if (newNote.moduleName && newNote.chapterName) {
        const newNoteEntry: Note = {
          id: `${Date.now()}`,
          moduleName: newNote.moduleName,
          chapterName: newNote.chapterName,
          dateCreated:
            newNote.dateCreated || new Date().toISOString().split("T")[0],
          youtubeLinks: newNote.youtubeLinks || [],
          pdfFiles: newNote.pdfFiles || [],
        };

        setNotes((prev) => [...prev, newNoteEntry]);
        setIsCreating(false);
        setNewNote({
          youtubeLinks: [],
          pdfFiles: [],
        });
        toast.success("Note created");
      } else {
        toast.error("Please fill all required fields");
      }
    } else {
      setIsCreating(true);
      setNewNote({
        dateCreated: new Date().toISOString().split("T")[0],
        youtubeLinks: [],
        pdfFiles: [],
      });
    }
  };

  const columns = createColumns({
    handleDeleteLink,
    handleAddLink,
  });

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
                      paginatedData.every((note) =>
                        selectedIds.includes(note.id)
                      )
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
                        <Link href={`/notes/${note.id}?mode=view`}>
                          {col.accessor(note)}
                        </Link>
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
                  <TableCell
                    colSpan={columns.length + 2}
                    className="text-center text-muted-foreground h-24"
                  >
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
                className={`cursor-pointer ${
                  currentPage === 0 ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              />
            </PaginationItem>
            <div className="text-sm mx-2">
              Page {currentPage + 1} of {totalPages}
            </div>
            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  currentPage + 1 >= totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev + 1 < totalPages ? prev + 1 : prev
                  )
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
