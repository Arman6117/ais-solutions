import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { FaYoutube } from "react-icons/fa";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import AddLinkButton from "../batch-components/add-link-button";
import { IconType } from "react-icons/lib";
import { getIcon } from "@/lib/utils";
import NewNoteForm from "../batch-components/new-note-form";
import {
  FilesType,
  NoteTableType,
  VideoLinksType,
} from "@/lib/types/note.type";
import { format } from "date-fns";
import { toast } from "sonner";
import AddFileDialog from "../batch-components/add-file-dialog";
import AddFileButton from "../batch-components/add-file-button";

type DesktopTableProps = {
  paginatedNotes: NoteTableType[];
  selectedRows: Set<number>;
  handleSelectAllChange: () => void;
  isMobile: boolean;
  isCreating: boolean;
  setIsCreating: (state: boolean) => void;
  createNewNote: (newNote: NoteTableType) => void;
  searchTerm: string;
  startIndex: number;
  handleRowCheckboxChange: (index: number) => void;
  mode: "edit" | "view" | "create";
  updateNoteLinks: (noteIndex: number, newLinks: VideoLinksType[]) => void;
  updateNoteFiles: (noteIndex: number, newFiles: FilesType[]) => void;
  handleDelete: (index: number) => void;
  batchId: string;
  // New props for edit functionality
  updateNote?: (noteIndex: number, updatedNote: NoteTableType) => void;
};

const DesktopTable = ({
  paginatedNotes,
  selectedRows,
  handleSelectAllChange,
  isCreating,
  isMobile,
  createNewNote,
  setIsCreating,
  batchId,
  searchTerm,
  startIndex,
  handleRowCheckboxChange,
  mode,
  updateNoteLinks,
  handleDelete,
  updateNote,
  updateNoteFiles,
}: DesktopTableProps) => {
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);

  const startEditing = (noteIndex: number) => {
    setEditingNoteIndex(noteIndex);
    setIsCreating(false); // Close create form if open
  };

  const stopEditing = () => {
    setEditingNoteIndex(null);
  };

  const handleUpdateNote = (updatedNote: NoteTableType) => {
    if (editingNoteIndex !== null && updateNote) {
      updateNote(editingNoteIndex, updatedNote);
      stopEditing();
    }
  };

  return (
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
          <TableHead className="text-center">Session</TableHead>
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
        {!isMobile && isCreating && (
          <NewNoteForm
            setIsCreating={setIsCreating}
            createNewNote={createNewNote}
            isMobile={false}
            batchId={batchId}
            isEditing={false}
          />
        )}

        {paginatedNotes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8">
              No notes found. {searchTerm && "Try adjusting your search."}
            </TableCell>
          </TableRow>
        ) : (
          paginatedNotes.map((note, i) => {
            const currentIndex = startIndex + i;
            const isCurrentlyEditing = editingNoteIndex === currentIndex;

            // If this note is being edited, show the edit form
            if (isCurrentlyEditing) {
              return (
                <NewNoteForm
                  key={currentIndex}
                  setIsCreating={setIsCreating}
                  createNewNote={createNewNote}
                  isMobile={false}
                  batchId={batchId}
                  isEditing={true}
                  setIsEditing={stopEditing}
                  editNote={note}
                  updateNote={handleUpdateNote}
                />
              );
            }

            // Otherwise show the regular row
            return (
              <TableRow
                key={currentIndex}
                className="text-center space-x-4 text-sm font-medium"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(currentIndex)}
                    onCheckedChange={() =>
                      handleRowCheckboxChange(currentIndex)
                    }
                  />
                </TableCell>
                <TableCell>{note.module}</TableCell>
                <TableCell>{note.chapter}</TableCell>
                <TableCell>{note.session?.name || "—"}</TableCell>
                <TableCell>{format(new Date(note.createdAt!), "PP")}</TableCell>

                <TableCell className="text-center truncate max-w-44">
                  <div className="flex flex-col items-center gap-4">
                    {(note.videoLinks || []).map(
                      (v: VideoLinksType, index: number) => (
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
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                                onClick={() => {
                                  // Handle individual link edit
                                  toast.info(
                                    "Edit individual link - feature coming soon"
                                  );
                                }}
                              >
                                <Pencil className="size-4 text-violet-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                                onClick={() => {
                                  // Handle individual link delete
                                  const newLinks =
                                    note.videoLinks?.filter(
                                      (_, linkIndex) => linkIndex !== index
                                    ) || [];
                                  updateNoteLinks(currentIndex, newLinks);
                                  toast.success("Video link removed successfully");
                                }}
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </div>
                      )
                    )}

                    {mode === "edit" && (
                      <AddLinkButton
                        notesLinks={note.videoLinks || []}
                        setNotesLinks={(newLinks) =>
                          updateNoteLinks(currentIndex, newLinks)
                        }
                      />
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col items-center gap-4">
                    {(note.files || []).map((f: FilesType, index: number) => {
                      const ext =
                        f.label?.split(".").pop()?.toLowerCase() || "";
                      const FileIcon: IconType = getIcon(ext);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between w-full gap-2 border-b pb-2"
                        >
                          <div 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => window.open(f.link || f.link)}
                          >
                            <FileIcon className="text-purple-600" />
                            <span className="truncate max-w-40">{f.label}</span>
                          </div>
                          {mode === "edit" && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  // Handle individual file edit
                                  toast.info(
                                    "Edit individual file - feature coming soon"
                                  );
                                }}
                              >
                                <Pencil className="size-4 text-violet-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  // Handle individual file delete - NOW WORKING!
                                  const newFiles =
                                    note.files?.filter(
                                      (_, fileIndex) => fileIndex !== index
                                    ) || [];
                                  updateNoteFiles(currentIndex, newFiles);
                                  toast.success("File removed successfully");
                                }}
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {mode === "edit" && (
                      <AddFileButton
                        notesFiles={note.files || []}
                        setNotesFiles={(newFiles) =>
                          updateNoteFiles(currentIndex, newFiles)
                        }
                      />
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => startEditing(currentIndex)}
                      title="Edit note"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleDelete(currentIndex)}
                      title="Delete note"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};

export default DesktopTable;