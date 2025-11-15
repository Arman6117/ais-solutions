import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
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
import AddFileButton from "../batch-components/add-file-button";
import { Badge } from "../ui/badge";

type DesktopTableProps = {
  paginatedNotes: NoteTableType[];
  selectedRows: Set<string>; // Changed from Set<number>
  handleSelectAllChange: () => void;
  isMobile: boolean;
  isCreating: boolean;
  setIsCreating: (state: boolean) => void;
  createNewNote: (newNote: NoteTableType) => void;
  searchTerm: string;
  startIndex: number;
  handleRowCheckboxChange: (noteId: string) => void; // Changed from index
  mode: "edit" | "view" | "create";
  updateNoteLinks: (noteId: string, newLinks: VideoLinksType[]) => void;
  updateNoteFiles: (noteId: string, newFiles: FilesType[]) => void;
  handleDelete: (noteId: string) => void;
  batchId: string;
  updateNote?: (noteId: string, updatedNote: NoteTableType) => void;
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
  handleRowCheckboxChange,
  mode,
  updateNoteLinks,
  handleDelete,
  updateNote,
  updateNoteFiles,
}: DesktopTableProps) => {
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  const startEditing = (noteId: string) => {
    setEditingNoteId(noteId);
    setIsCreating(false);
  };

  const stopEditing = () => {
    setEditingNoteId(null);
  };

  const handleUpdateNote = (updatedNote: NoteTableType) => {
    if (editingNoteId && updateNote) {
      updateNote(editingNoteId, updatedNote);
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
          <TableHead className="text-center">Topics</TableHead>
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
            <TableCell colSpan={9} className="text-center py-8">
              No notes found. {searchTerm && "Try adjusting your search."}
            </TableCell>
          </TableRow>
        ) : (
          paginatedNotes.map((note) => {
            const isCurrentlyEditing = editingNoteId === note._id;
            const isSelected = note._id ? selectedRows.has(note._id) : false;

            if (isCurrentlyEditing) {
              return (
                <NewNoteForm
                  key={note._id}
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

            return (
              <TableRow
                key={note._id}
                className="text-center space-x-4 text-sm font-medium"
              >
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() =>
                      note._id && handleRowCheckboxChange(note._id)
                    }
                  />
                </TableCell>
                <TableCell>{note.module}</TableCell>
                <TableCell>{note.chapter}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 justify-center max-w-xs">
                    {note.topics && note.topics.length > 0 ? (
                      note.topics.map((topic, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {topic}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-xs">
                        No topics
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{note.session?.meetingName || "—"}</TableCell>
                <TableCell>
                  {note.createdAt
                    ? format(new Date(note.createdAt), "PP")
                    : "—"}
                </TableCell>

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
                                onClick={() => {
                                  const newLinks =
                                    note.videoLinks?.filter(
                                      (_, linkIndex) => linkIndex !== index
                                    ) || [];
                                  if (note._id) {
                                    updateNoteLinks(note._id, newLinks);
                                    toast.success(
                                      "Video link removed successfully"
                                    );
                                  }
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
                          note._id && updateNoteLinks(note._id, newLinks)
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
                            onClick={() => window.open(f.link)}
                          >
                            <FileIcon className="text-purple-600" />
                            <span className="truncate max-w-40">
                              {f.label}
                            </span>
                          </div>
                          {mode === "edit" && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newFiles =
                                    note.files?.filter(
                                      (_, fileIndex) => fileIndex !== index
                                    ) || [];
                                  if (note._id) {
                                    updateNoteFiles(note._id, newFiles);
                                    toast.success("File removed successfully");
                                  }
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
                          note._id && updateNoteFiles(note._id, newFiles)
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
                      onClick={() => note._id && startEditing(note._id)}
                      title="Edit note"
                      disabled={!note._id}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => note._id && handleDelete(note._id)}
                      title="Delete note"
                      disabled={!note._id}
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
