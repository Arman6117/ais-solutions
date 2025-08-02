"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Calendar as CalendarIcon, X, Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import AddLinkDialog from "./add-link-dialog";
import AddFileDialog from "./add-file-dialog";
import SelectSessionDialog from "./select-sessioin-dialog";
import { Session } from "@/lib/types/types";
import { dummyNoteSessions } from "@/lib/static";
import ModuleSelector from "./module-selector";
import ChapterSelector from "./chapter-selector";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const moduleData: Record<string, string[]> = {
  "Module 1": ["Intro", "Basics"],
  "Module 2": ["Setup", "Types"],
  "Module 3": ["Functions", "Scope"],
};

const NewNoteForm = ({
  setIsCreating,
  createNewNote,
  isMobile,
}: {
  setIsCreating: (state: boolean) => void;
  createNewNote: (newNote: any) => void;
  isMobile: boolean;
}) => {
  const [moduleName, setModuleName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [linkLabel, setLinkLabel] = useState("");
  const [link, setLink] = useState("");
  const [videoLinks, setVideoLinks] = useState<Array<{ label: string; link: string }>>([]);
  const [files, setFiles] = useState<Array<string>>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const handleSave = () => {
    if (!moduleName || !chapterName || !date) return;
    const formattedDate = format(date, "yyyy-MM-dd");

    const newNote = {
      module: moduleName,
      chapter: chapterName,
      dateCreated: formattedDate,
      videoLinks,
      files,
    };

    createNewNote(newNote);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
  };

  const onAddLink = (label: string, url: string) => {
    if (label && url) {
      setVideoLinks([...videoLinks, { label, link: url }]);
      setLinkLabel("");
      setLink("");
    }
  };

  const availableChapters = moduleName ? moduleData[moduleName] || [] : [];

  return (
    <TableRow className="h-20 bg-muted/50">
      <TableCell className="text-center">
        <Checkbox disabled />
      </TableCell>

      <TableCell>
        <ModuleSelector
          modules={Object.keys(moduleData)}
          selectedModule={moduleName}
          onChange={(val) => {
            setModuleName(val);
            setChapterName(""); // reset chapter when module changes
          }}
        />
      </TableCell>

      <TableCell>
        <ChapterSelector
          chapters={availableChapters}
          selectedChapter={chapterName}
          onChange={setChapterName}
        />
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-2 max-w-40">
          {selectedSession ? (
            <div className="text-sm space-y-1">
              <p className="font-medium">{selectedSession.name}</p>
              <p className="text-xs text-muted-foreground">{format(selectedSession.date, "MMM dd, yyyy")}</p>
              <p className="text-xs text-muted-foreground">Module: {selectedSession.module}</p>
              <p className="text-xs text-muted-foreground">Instructor: {selectedSession.instructor}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No session selected</p>
          )}
          <SelectSessionDialog sessions={dummyNoteSessions} onSelect={setSelectedSession} />
        </div>
      </TableCell>

      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal max-w-40", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "MMM dd, yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-2">
          {videoLinks.map((videoLink, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="truncate max-w-32">{videoLink.label}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => {
                  const newLinks = [...videoLinks];
                  newLinks.splice(index, 1);
                  setVideoLinks(newLinks);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mt-1">
                <Plus className="mr-2 h-3 w-3" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a new Video link</DialogTitle>
              </DialogHeader>
              <AddLinkDialog
                label={linkLabel}
                link={link}
                setLinkLabel={setLinkLabel}
                setLink={setLink}
                onAddLink={onAddLink}
              />
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col gap-2">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="truncate max-w-32">{file}</span>
            </div>
          ))}
          <AddFileDialog onAddFile={(file: string) => setFiles([...files, file])} />
        </div>
      </TableCell>

      <TableCell>
        <div className="flex gap-2 justify-center">
          <Button variant="ghost" onClick={handleCancel}>
            <X />
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NewNoteForm;
