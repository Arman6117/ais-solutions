import React from "react";

import AddLinkButton from "./add-link-button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

import { IconType } from "react-icons/lib";
import { getIcon } from "@/lib/utils";

import { Pencil, Trash2 } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { FilesType, NoteTableType, VideoLinksType } from "@/lib/types/note.type";

type MobileCardViewProps = {
  startIndex: number;
  index: number;
  selectedRows: Set<number>;
  handleRowCheckboxChange: (index: number) => void;
  handleDelete: (index: number) => void;
  note: NoteTableType
  mode:'edit'|'view'|'create'
  updateNoteLinks:(index:number,newLinks:VideoLinksType[]) =>void
};

const MobileCardView = ({
  handleDelete,
  handleRowCheckboxChange,
  index,
  selectedRows,
  startIndex,
  note,
  mode,
  updateNoteLinks
}: MobileCardViewProps) => {
  return (
    <Card key={startIndex + index} className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedRows.has(startIndex + index)}
            onCheckedChange={() => handleRowCheckboxChange(startIndex + index)}
          />
          <CardTitle className="text-sm font-medium">{note.module}</CardTitle>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="outline" className="h-8 w-8">
            <Pencil className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => handleDelete(startIndex + index)}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-medium">Chapter:</div>
          <div>{note.chapter}</div>

          <div className="font-medium">Created:</div>
          <div>{note.createdAt}</div>

          {note.videoLinks && note.videoLinks.length > 0 && (
            <>
              <div className="font-medium col-span-2 mt-2">Video Links:</div>
              <div className="col-span-2">
                {note.videoLinks.map((v: VideoLinksType, vIndex: number) => (
                  <div key={vIndex} className="flex items-center gap-2 mb-1">
                    <FaYoutube className="text-purple-600 flex-shrink-0" />
                    <span className="truncate">{v.label}</span>
                  </div>
                ))}
                {mode === "edit" && (
                  <div className="mt-1">
                    <AddLinkButton
                      notesLinks={note.videoLinks || []}
                      setNotesLinks={(newLinks) =>
                        updateNoteLinks(startIndex + index, newLinks)
                      }
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
                  const ext = f.label.split(".").pop()?.toLowerCase() || "";
                  const FileIcon: IconType = getIcon(ext);
                  return (
                    <div key={fIndex} className="flex items-center gap-2 mb-1">
                      <FileIcon className="text-purple-600 flex-shrink-0" />
                      <span className="truncate">{f.label}</span>
                    </div>
                  );
                })}
                {mode === "edit" && (
                  <Button size="sm" className="mt-2 bg-primary-bg">
                    Add File
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileCardView;
