"use client";

import React, { useEffect, useState } from "react";

import NewNoteForm from "./batch-components/new-note-form";
import { Card, CardContent } from "./ui/card";
import MobileCardView from "./batch-components/mobile-card-view";
import DeleteConfirmationDialog from "./batch-components/delete-confirmation-dialog";
import NotesTablePagination from "./notes-table/notes-table-pagination";
import SearchAndControls from "./notes-table/search-and-controls";
import DesktopTable from "./notes-table/desktop-tables";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FilesType,
  NoteTableType,
  VideoLinksType,
} from "@/lib/types/note.type";
import { createNote } from "@/actions/admin/notes/create-note";
import { toast } from "sonner";
import { bulkDeleteNotes, deleteNote } from "@/actions/admin/notes/delete-note";
import { updateNoteAction } from "@/actions/admin/notes/update-note";

type NotesTableProps = {
  mode: "view" | "edit" | "create";
  role: "admin" | "student";
  notes: NoteTableType[];
  batchId: string;
  isCreating: boolean;
  setIsCreating: (state: boolean) => void;
};

const ITEMS_PER_PAGE = 5;

const NotesTable = ({
  batchId,
  mode,
  notes,
  isCreating,
  setIsCreating,
}: NotesTableProps) => {
  const [noteList, setNoteList] = useState<NoteTableType[]>(notes);

  useEffect(() => {
    setNoteList(notes);
  }, [notes]);

  const [filteredNotes, setFilteredNotes] = useState<NoteTableType[]>(notes);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);

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
  const paginatedNotes = filteredNotes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    let result = [...noteList];

    if (searchTerm) {
      result = result.filter(
        (note) =>
          note.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
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
  }, [noteList, notes, searchTerm, sortDirection, moduleFilter]);

  const createNewNote = async (newNote: NoteTableType) => {
    try {
      const res = await createNote(batchId!, newNote);
      if (!res.success) {
        toast.error(res.message);
        return;
      }

      // Add the note with the _id from the server response
      if (res.data) {
        setNoteList([res.data, ...noteList]);
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create note");
    }
  };

  const updateNote = async (noteId: string, updatedNote: NoteTableType) => {
    try {
      if (!noteId) {
        toast.error("Note ID not found");
        return;
      }

      const res = await updateNoteAction(noteId, updatedNote);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      setNoteList((prev) =>
        prev.map((note) =>
          note._id === noteId ? { ...updatedNote, _id: noteId } : note
        )
      );

      toast.success(res.message);
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    }
  };

  const updateNoteLinks = async (noteId: string, newLinks: VideoLinksType[]) => {
    try {
      const noteToUpdate = noteList.find((n) => n._id === noteId);
      if (!noteToUpdate) {
        toast.error("Note not found");
        return;
      }

      const res = await updateNoteAction(noteId, {
        ...noteToUpdate,
        videoLinks: newLinks,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      setNoteList((prev) =>
        prev.map((note) =>
          note._id === noteId ? { ...note, videoLinks: newLinks } : note
        )
      );

      toast.success("Video links updated");
    } catch (error) {
      console.error("Error updating video links:", error);
      toast.error("Failed to update video links");
    }
  };

  const updateNoteFiles = async (noteId: string, newFiles: FilesType[]) => {
    try {
      const noteToUpdate = noteList.find((n) => n._id === noteId);
      if (!noteToUpdate) {
        toast.error("Note not found");
        return;
      }

      const res = await updateNoteAction(noteId, {
        ...noteToUpdate,
        files: newFiles,
      });

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      setNoteList((prev) =>
        prev.map((note) =>
          note._id === noteId ? { ...note, files: newFiles } : note
        )
      );

      toast.success("Files updated");
    } catch (error) {
      console.error("Error updating files:", error);
      toast.error("Failed to update files");
    }
  };

  const handleDelete = (noteId: string) => {
    setItemsToDelete([noteId]);
    setDeleteDialogOpen(true);
  };

  const handleBulkDelete = () => {
    if (selectedRows.size > 0) {
      setItemsToDelete(Array.from(selectedRows));
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      const noteIds = itemsToDelete.filter(Boolean);

      if (noteIds.length === 0) {
        toast.error("No valid notes to delete");
        return;
      }

      const res =
        noteIds.length === 1
          ? await deleteNote(noteIds[0])
          : await bulkDeleteNotes(noteIds);

      if (!res.success) {
        toast.error(res.message);
        setDeleteDialogOpen(false);
        return;
      }

      const newNotes = noteList.filter((note) => !noteIds.includes(note._id!));
      setNoteList(newNotes);
      setSelectedRows(new Set());
      setDeleteDialogOpen(false);

      toast.success(res.message);
    } catch (error) {
      console.error("Error deleting notes:", error);
      toast.error("Failed to delete notes");
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSelectAllChange = () => {
    if (selectedRows.size === paginatedNotes.length) {
      setSelectedRows(new Set());
    } else {
      const allIds = new Set(
        paginatedNotes.map((note) => note._id).filter(Boolean) as string[]
      );
      setSelectedRows(allIds);
    }
  };

  const handleRowCheckboxChange = (noteId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(noteId)) {
      newSelected.delete(noteId);
    } else {
      newSelected.add(noteId);
    }
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
      createNewNote={createNewNote}
      setIsCreating={setIsCreating}
      handleDelete={() => handleDelete(note._id!)}
      handleRowCheckboxChange={() => handleRowCheckboxChange(note._id!)}
      index={index}
      mode={mode}
      note={note}
      selectedRows={selectedRows}
      startIndex={startIndex}
      updateNoteLinks={(newLinks) => updateNoteLinks(note._id!, newLinks)}
      updateNoteFiles={(newFiles) => updateNoteFiles(note._id!, newFiles)}
      batchId={batchId}
      updateNote={(updatedNote) => updateNote(note._id!, updatedNote)}
      key={note._id}
    />
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <SearchAndControls
          handleBulkDelete={handleBulkDelete}
          searchTerm={searchTerm}
          selectedRows={selectedRows}
          setSearchTerm={setSearchTerm}
          sortDirection={sortDirection}
          toggleSortDirection={toggleSortDirection}
        />

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

      <div className="hidden md:block">
        <DesktopTable
          paginatedNotes={paginatedNotes}
          selectedRows={selectedRows}
          handleSelectAllChange={handleSelectAllChange}
          isMobile={false}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          createNewNote={createNewNote}
          searchTerm=""
          startIndex={startIndex}
          handleRowCheckboxChange={handleRowCheckboxChange}
          mode={mode}
          updateNoteLinks={updateNoteLinks}
          updateNoteFiles={updateNoteFiles}
          handleDelete={handleDelete}
          batchId={batchId}
          updateNote={updateNote}
        />
      </div>

      {isMobile && (
        <div className="md:hidden">
          {isCreating && (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <NewNoteForm
                  setIsCreating={setIsCreating}
                  createNewNote={createNewNote}
                  isMobile={true}
                  batchId={batchId}
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

      {totalPages > 1 && (
        <NotesTablePagination
          currentPage={currentPage}
          getPageNumbers={getPageNumbers}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}

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
