"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import NewNoteForm from "./batch-components/new-note-form";

import { Card, CardContent } from "./ui/card";
import MobileCardView from "./batch-components/mobile-card-view";
import DeleteConfirmationDialog from "./batch-components/delete-confirmation-dialog";
import NotesTablePagination from "./notes-table/notes-table-pagination";
import SearchAndControls from "./notes-table/search-and-controls";
import DesktopTable from "./notes-table/desktop-tables";

type NotesTableProps = {
  mode: "view" | "edit" | "create";
  role: "admin" | "student";
  notes: any[];
  batchId?: string;
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      key={index}
    />
  );

  return (
    <div className="space-y-4">
      {/* Search and controls */}
      <SearchAndControls
        handleBulkDelete={handleBulkDelete}
        searchTerm={searchTerm}
        selectedRows={selectedRows}
        setSearchTerm={setSearchTerm}
        sortDirection={sortDirection}
        toggleSortDirection={toggleSortDirection}
      />
      {/* Desktop view table */}
      <div className="hidden md:block overflow-x-auto">
        <DesktopTable
          createNewNote={createNewNote}
          handleDelete={handleDelete}
          handleRowCheckboxChange={handleRowCheckboxChange}
          handleSelectAllChange={handleSelectAllChange}
          isCreating={isCreating}
          isMobile={isMobile}
          mode={mode}
          paginatedNotes={paginatedNotes}
          searchTerm={searchTerm}
          selectedRows={selectedRows}
          setIsCreating={setIsCreating}
          startIndex={startIndex}
          updateNoteLinks={updateNoteLinks}
        />
      </div>

      {/* Mobile view cards */}
      {isMobile && (
        <div className="md:hidden">
          {isCreating && (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <NewNoteForm
                  setIsCreating={setIsCreating}
                  createNewNote={createNewNote}
                  isMobile={true}
                />
              </CardContent>
            </Card>
          )}

          {paginatedNotes.length === 0 ? (
            <Card className="p-8 text-center">
              <p>
                No notes found. {searchTerm && "Try adjusting your search."}
              </p>
            </Card>
          ) : (
            paginatedNotes.map((note, i) => renderMobileCard(note, i))
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <NotesTablePagination
          currentPage={currentPage}
          getPageNumbers={getPageNumbers}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
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
