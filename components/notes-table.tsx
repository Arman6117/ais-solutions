"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import NewNoteForm from "./batch-components/new-note-form";
import { Card, CardContent } from "./ui/card";
import MobileCardView from "./batch-components/mobile-card-view";
import DeleteConfirmationDialog from "./batch-components/delete-confirmation-dialog";
import NotesTablePagination from "./notes-table/notes-table-pagination";
import SearchAndControls from "./notes-table/search-and-controls";
import DesktopTable from "./notes-table/desktop-tables";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NoteTableType } from "@/lib/types/note.type";
import { createNote } from "@/actions/admin/notes/create-note";
import { toast } from "sonner";



type NotesTableProps = {
  mode: "view" | "edit" | "create";
  role: "admin" | "student";
  notes: NoteTableType[];
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
  const [noteList, setNoteList] = useState<NoteTableType[]>(notes);
  const [filteredNotes, setFilteredNotes] = useState<NoteTableType[]>(notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<number[]>([]);

  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const uniqueModules = Array.from(new Set(noteList.map((n) => n.module)));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(filteredNotes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotes = filteredNotes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    let result = [...noteList];

    if (searchTerm) {
      result = result.filter(
        (note) =>
          note.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.files &&
            note.files.some((file) =>
              file.label.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );
    }

    if (moduleFilter !== "all") {
      result = result.filter((note) => note.module === moduleFilter);
    }

    result = result.sort((a, b) => {
      const dateA = new Date(a.createdAt ?? new Date()).getTime();
      const dateB = new Date(b.createdAt ?? new Date()).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredNotes(result);
    setCurrentPage(1);
  }, [noteList, searchTerm, sortDirection, moduleFilter]);

  const createNewNote =async (newNote: NoteTableType) => {
    try {
      const res =await createNote(batchId!, newNote)
      if(!res.success){
        toast.error(res.message)
        return
      }
      setNoteList([newNote, ...noteList]);
      toast.success(res.message)
    } catch (error) {
      console.log(error)
      toast.error("Failed to create note")
    }
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
    const newNotes = noteList.filter((_, index) => !itemsToDelete.includes(index));
    setNoteList(newNotes);
    setSelectedRows(new Set());
    setDeleteDialogOpen(false);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSelectAllChange = () => {
    const newSelected = new Set<number>();
    if (selectedRows.size === paginatedNotes.length) {
      setSelectedRows(new Set());
    } else {
      paginatedNotes.forEach((_, index) => newSelected.add(startIndex + index));
      setSelectedRows(newSelected);
    }
  };

  const handleRowCheckboxChange = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) newSelected.delete(index);
    else newSelected.add(index);
    setSelectedRows(newSelected);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      if (startPage > 2) pages.push("...");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const renderMobileCard = (note: NoteTableType, index: number) => (
    <MobileCardView
      handleDelete={handleDelete}
      handleRowCheckboxChange={handleRowCheckboxChange}
      index={index}
      mode={mode}
      note={note}
      selectedRows={selectedRows}
      startIndex={startIndex}
      updateNoteLinks={() => {}}
      key={index}
    />
  );

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <SearchAndControls
          handleBulkDelete={handleBulkDelete}
          searchTerm={searchTerm}
          selectedRows={selectedRows}
          setSearchTerm={setSearchTerm}
          sortDirection={sortDirection}
          toggleSortDirection={toggleSortDirection}
        />

        {/* Module Filter */}
        <div className="w-full md:w-64">
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by module" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              {uniqueModules.map((mod) => (
                <SelectItem key={mod} value={mod}>
                  {mod}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
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
          updateNoteLinks={() => {}}
        />
      </div>

      {/* Mobile View */}
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
              <p>No notes found. {searchTerm && "Try adjusting your search."}</p>
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

      {/* Delete Dialog */}
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
