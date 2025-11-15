import React, { useState } from "react";

import AddLinkButton from "./add-link-button";
import AddFileButton from "./add-file-button";
import NewNoteForm from "./new-note-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

import { IconType } from "react-icons/lib";
import { getIcon } from "@/lib/utils";

import { Pencil, Trash2 } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import {
  FilesType,
  NoteTableType,
  VideoLinksType,
} from "@/lib/types/note.type";
import { toast } from "sonner";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

type MobileCardViewProps = {
  startIndex: number;
  index: number;
  selectedRows: Set<string>; // Changed from Set<number>
  handleRowCheckboxChange: () => void; // Now wrapped, no params needed
  note: NoteTableType;
  mode: "edit" | "view" | "create";
  updateNoteLinks: (newLinks: VideoLinksType[]) => void; // Wrapped, no noteId needed
  updateNoteFiles: (newFiles: FilesType[]) => void; // Wrapped, no noteId needed
  handleDelete: () => void; // Wrapped, no noteId needed
  batchId: string;
  updateNote?: (updatedNote: NoteTableType) => void; // Wrapped, no noteId needed
  createNewNote: (newNote: NoteTableType) => void;
  setIsCreating: (state: boolean) => void;
};

const MobileCardView = ({
  handleRowCheckboxChange,

  selectedRows,

  note,
  mode,
  updateNoteLinks,
  handleDelete,
  updateNote,
  updateNoteFiles,
  batchId,
  createNewNote,
  setIsCreating,
}: MobileCardViewProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
    setIsCreating(false);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  const handleUpdateNote = (updatedNote: NoteTableType) => {
    if (updateNote) {
      updateNote(updatedNote);
      stopEditing();
    }
  };

  if (isEditing) {
    return (
      <Card className="mb-4 border-blue-200 bg-blue-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">
            Editing Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <NewNoteForm
              setIsCreating={setIsCreating}
              createNewNote={createNewNote}
              isMobile={true}
              batchId={batchId}
              isEditing={true}
              setIsEditing={stopEditing}
              editNote={note}
              updateNote={handleUpdateNote}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Check if this note is selected using note._id
  const isSelected = note._id ? selectedRows.has(note._id) : false;

  return (
    <Card key={note._id} className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleRowCheckboxChange}
          />
          <CardTitle className="text-sm font-medium">{note.module}</CardTitle>
        </div>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={startEditing}
            title="Edit note"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={handleDelete}
            title="Delete note"
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-medium">Chapter:</div>
          <div>{note.chapter}</div>
          
          {note.topics && note.topics.length > 0 && (
            <>
              <div className="font-medium col-span-2 mt-2">Topics:</div>
              <div className="col-span-2 flex flex-wrap gap-1">
                {note.topics.map((topic, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </>
          )}

          <div className="font-medium">Created:</div>
          <div>
            {note.createdAt
              ? format(new Date(note.createdAt), "MMM dd, yyyy")
              : "No date"}
          </div>

          {note.session && (
            <>
              <div className="font-medium">Session:</div>
              <div>{note.session.meetingName}</div>
            </>
          )}

          {note.videoLinks && note.videoLinks.length > 0 && (
            <>
              <div className="font-medium col-span-2 mt-2">Video Links:</div>
              <div className="col-span-2">
                {note.videoLinks.map((v: VideoLinksType, vIndex: number) => (
                  <div
                    key={vIndex}
                    className="flex items-center justify-between gap-2 mb-2 p-2 bg-gray-50 rounded"
                  >
                    <div
                      className="flex items-center gap-2 cursor-pointer flex-1"
                      onClick={() => window.open(v.link)}
                    >
                      <FaYoutube className="text-purple-600 flex-shrink-0" />
                      <span className="truncate">{v.label}</span>
                    </div>
                    {mode === "edit" && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            const newLinks =
                              note.videoLinks?.filter(
                                (_, linkIndex) => linkIndex !== vIndex
                              ) || [];
                            updateNoteLinks(newLinks);
                            toast.success("Video link removed successfully");
                          }}
                        >
                          <Trash2 className="size-3 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {mode === "edit" && (
                  <div className="mt-2">
                    <AddLinkButton
                      notesLinks={note.videoLinks || []}
                      setNotesLinks={updateNoteLinks}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {note.files && note.files.length > 0 && (
            <>
              <div className="font-medium col-span-2 mt-2">Files:</div>
              <div className="col-span-2">
                {note.files.map((f: FilesType, fIndex: number) => {
                  const ext = f.label?.split(".").pop()?.toLowerCase() || "";
                  const FileIcon: IconType = getIcon(ext);
                  return (
                    <div
                      key={fIndex}
                      className="flex items-center justify-between gap-2 mb-2 p-2 bg-gray-50 rounded"
                    >
                      <div
                        className="flex items-center gap-2 cursor-pointer flex-1"
                        onClick={() => window.open(f.link)}
                      >
                        <FileIcon className="text-purple-600 flex-shrink-0" />
                        <span className="truncate">{f.label}</span>
                      </div>
                      {mode === "edit" && (
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              const newFiles =
                                note.files?.filter(
                                  (_, fileIndex) => fileIndex !== fIndex
                                ) || [];
                              updateNoteFiles(newFiles);
                              toast.success("File removed successfully");
                            }}
                          >
                            <Trash2 className="size-3 text-destructive" />
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {mode === "edit" && (
                  <div className="mt-2">
                    <AddFileButton
                      notesFiles={note.files || []}
                      setNotesFiles={updateNoteFiles}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {mode === "edit" &&
            (!note.videoLinks || note.videoLinks.length === 0) && (
              <>
                <div className="font-medium col-span-2 mt-2">Video Links:</div>
                <div className="col-span-2">
                  <AddLinkButton notesLinks={[]} setNotesLinks={updateNoteLinks} />
                </div>
              </>
            )}

          {mode === "edit" && (!note.files || note.files.length === 0) && (
            <>
              <div className="font-medium col-span-2 mt-2">Files:</div>
              <div className="col-span-2">
                <AddFileButton notesFiles={[]} setNotesFiles={updateNoteFiles} />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileCardView;
