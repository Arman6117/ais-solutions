import React from "react";
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
import { FilesType, NoteTableType, VideoLinksType } from "@/lib/types/note.type";

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
  handleDelete: (index: number) => void;
};

const DesktopTable = ({
  paginatedNotes,
  selectedRows,
  handleSelectAllChange,
  isCreating,
  isMobile,
  createNewNote,
  setIsCreating,
  searchTerm,
  startIndex,
  handleRowCheckboxChange,
  mode,
  updateNoteLinks,
  handleDelete,
}: DesktopTableProps) => {
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
          />
        )}

        {paginatedNotes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8">
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
              <TableCell>{note.session?.name || "—"}</TableCell>
              <TableCell>{note.createdAt}</TableCell>

              <TableCell className="text-center truncate max-w-44">
                <div className="flex flex-col items-center gap-4">
                  {(note.videoLinks || []).map((v: VideoLinksType, index: number) => (
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
                  {(note.files || []).map((f: FilesType, index: number) => {
                    const ext = f.label?.split(".").pop()?.toLowerCase() || "";
                    const FileIcon: IconType = getIcon(ext);
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between w-full gap-2 border-b pb-2"
                      >
                        <div className="flex items-center gap-2">
                          <FileIcon className="text-purple-600" />
                          <span className="truncate max-w-40">{f.label}</span>
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
  );
};

export default DesktopTable;
