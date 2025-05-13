"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import AddLinkButton from "./batch-components/add-link-button";
import NewNoteForm from "./batch-components/new-note-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FaYoutube } from "react-icons/fa";
import {
  ChevronDown,
  Pencil,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
} from "lucide-react";
import { getIcon } from "@/lib/utils";
import { IconType } from "react-icons/lib";
import { ScrollArea } from "./ui/scroll-area";
import MobileCardView from "./batch-components/mobile-card-view";
import DeleteConfirmationDialog from "./batch-components/delete-confirmation-dialog";

type NotesTableProps = {
  mode: "view" | "edit";
  role: "admin" | "student";
  notes: any[];
  batchId: string;
  isCreating: boolean;
  setIsCreating: (state: boolean) => void;
};

const ITEMS_PER_PAGE = 5;

const NotesTable = ({
  batchId,
  mode,
  notes,
  role,
  isCreating,
  setIsCreating,
}: NotesTableProps) => {
  const [noteList, setNoteList] = useState(notes);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<number[]>([]);

  const router = useRouter();

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotes = filteredNotes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    // Filter and sort notes whenever dependencies change
    let result = [...noteList];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (note) =>
          note.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.files &&
            note.files.some((file: string) =>
              file.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    // Apply sorting by date
    result = result.sort((a, b) => {
      const dateA = new Date(a.dateCreated).getTime();
      const dateB = new Date(b.dateCreated).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredNotes(result);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [noteList, searchTerm, sortDirection]);

  const updateNoteLinks = (noteIndex: number, newLinks: any[]) => {
    const updatedNotes = [...noteList];
    updatedNotes[noteIndex].videoLinks = newLinks;
    setNoteList(updatedNotes);
  };

  const createNewNote = (newNote: any) => {
    setNoteList([newNote, ...noteList]);
  };

  const handleSelectAllChange = () => {
    if (selectedRows.size === paginatedNotes.length) {
      // If all are selected, deselect all
      setSelectedRows(new Set());
    } else {
      // Otherwise, select all visible rows
      const newSelected = new Set<number>();
      paginatedNotes.forEach((_, index) => {
        newSelected.add(startIndex + index);
      });
      setSelectedRows(newSelected);
    }
  };

  const handleRowCheckboxChange = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const handleDelete = (index: number) => {
    setItemsToDelete([index]);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedRows.size > 0) {
      setItemsToDelete(Array.from(selectedRows));
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    const newNotes = noteList.filter(
      (_, index) => !itemsToDelete.includes(index)
    );
    setNoteList(newNotes);
    setSelectedRows(new Set());
    setDeleteDialogOpen(false);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        pages.push("ellipsis-start");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  // Mobile view card renderer for each note
  const renderMobileCard = (note: any, index: number) => (
    <MobileCardView
      handleDelete={handleDelete}
      handleRowCheckboxChange={handleRowCheckboxChange}
      index={index}
      mode={mode}
      note={note}
      selectedRows={selectedRows}
      startIndex={startIndex}
      updateNoteLinks={updateNoteLinks}
    />
  );

  return (
    <div className="space-y-4">
      {/* Search and controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by module, chapter or file..."
            className="pl-8 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={toggleSortDirection}
            >
              <Filter className="size-4" />
              Sort by date {sortDirection === "asc" ? "↑" : "↓"}
            </Button>

            {selectedRows.size > 0 && (
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="size-4" />
                Delete ({selectedRows.size})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop view table */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="items-center text-base font-semibold">
              <TableHead className="text-center w-12">
                <Checkbox
                  checked={
                    paginatedNotes.length > 0 &&
                    selectedRows.size === paginatedNotes.length
                  }
                  onCheckedChange={handleSelectAllChange}
                />
              </TableHead>
              <TableHead className="text-center">Module</TableHead>
              <TableHead className="text-center">Chapter</TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  Date Created
                </div>
              </TableHead>
              <TableHead className="text-center">Video Link</TableHead>
              <TableHead className="text-center">Files</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isCreating && (
              <NewNoteForm
                setIsCreating={setIsCreating}
                createNewNote={createNewNote}
              />
            )}

            {paginatedNotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No notes found. {searchTerm && "Try adjusting your search."}
                </TableCell>
              </TableRow>
            ) : (
              paginatedNotes.map((note, i) => (
                <TableRow
                  key={startIndex + i}
                  className="text-center space-x-4 text-sm font-medium"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(startIndex + i)}
                      onCheckedChange={() =>
                        handleRowCheckboxChange(startIndex + i)
                      }
                    />
                  </TableCell>
                  <TableCell>{note.module}</TableCell>
                  <TableCell>{note.chapter}</TableCell>
                  <TableCell>{note.dateCreated}</TableCell>

                  <TableCell className="text-center truncate max-w-44">
                    <div className="flex flex-col items-center gap-4">
                      {(note.videoLinks || []).map((v: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between w-full gap-2 border-b pb-2"
                        >
                          <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => window.open(v.link)}
                          >
                            <FaYoutube className="text-purple-600" />
                            <span className="truncate">{v.label}</span>
                          </div>
                          {mode === "edit" && (
                            <div className="flex gap-">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                              >
                                <Pencil className="size-4 text-violet-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}

                      {mode === "edit" && (
                        <AddLinkButton
                          notesLinks={note.videoLinks || []}
                          setNotesLinks={(newLinks) =>
                            updateNoteLinks(startIndex + i, newLinks)
                          }
                        />
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col items-center gap-4">
                      {(note.files || []).map((f: any, index: number) => {
                        const ext = f.split(".").pop()?.toLowerCase() || "";
                        const FileIcon: IconType = getIcon(ext);
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between w-full gap-2 border-b pb-2"
                          >
                            <div className="flex items-center gap-2">
                              <FileIcon className="text-purple-600" />
                              <span className="truncate max-w-40">{f}</span>
                            </div>
                            {mode === "edit" && (
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon">
                                  <Pencil className="size-4 text-violet-600" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="size-4 text-destructive" />
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {mode === "edit" && (
                        <Button size="sm" className="mt-2 bg-primary-bg">
                          Add File
                        </Button>
                      )}
                    </div>
                  </TableCell>

                  {/* ROW ACTIONS */}
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="outline">
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(startIndex + i)}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view cards */}
      <div className="md:hidden">
        {isCreating && (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <NewNoteForm
                setIsCreating={setIsCreating}
                createNewNote={createNewNote}
              />
            </CardContent>
          </Card>
        )}

        {paginatedNotes.length === 0 ? (
          <Card className="p-8 text-center">
            <p>No notes found. {searchTerm && "Try adjusting your search."}</p>
          </Card>
        ) : (
          paginatedNotes.map((note, i) => renderMobileCard(note, i))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none cursor-pointer opacity-50"
                    : ""
                }
              />
            </PaginationItem>

            {getPageNumbers().map((page, i) =>
              page === "ellipsis-start" || page === "ellipsis-end" ? (
                <PaginationItem key={`ellipsis-${i}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(Number(page))}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none cursor-pointer opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Delete confirmation dialog */}
      <DeleteConfirmationDialog 
        confirmDelete={confirmDelete}
        deleteDialogOpen={deleteDialogOpen}
        itemsToDelete={itemsToDelete}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
    </div>
  );
};

export default NotesTable;
