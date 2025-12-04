// components/batch-components/new-note-form.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Calendar as CalendarIcon,
  X,
  Plus,
  Save,
  ChevronsUpDown,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import AddLinkDialog from "./add-link-dialog";
import AddFileDialog from "./add-file-dialog";
import SelectSessionDialog from "./select-sessioin-dialog";
import ModuleSelector from "./module-selector";
import ChapterSelector from "./chapter-selector";
import TopicsInput from "./topics-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  FilesType,
  NoteTableSessionType,
  NoteTableType,
  VideoLinksType,
} from "@/lib/types/note.type";
import { ModulesForSession } from "@/lib/types/sessions.type";
import { getModulesWithSubtopics } from "@/actions/shared/get-modules-with-subtopics";
import { toast } from "sonner";
import { getAllMeetingsByBatchId } from "@/actions/admin/sessions/get-all-meetings-by-batch-id";
import { getBatchesByCourse } from "@/actions/admin/batches/get-batches-by-course";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const NewNoteForm = ({
  setIsCreating,
  createNewNote,
  batchId,
  courseId,
  isEditing = false,
  setIsEditing,
  editNote,
  updateNote,
}: {
  setIsCreating: (state: boolean) => void;
  createNewNote: (
    newNote: NoteTableType,
    additionalBatchIds?: string[]
  ) => void;
  isMobile: boolean;
  batchId: string;
  courseId?: string;
  isEditing?: boolean;
  setIsEditing?: (state: boolean) => void;
  editNote?: NoteTableType;
  updateNote?: (
    updatedNote: NoteTableType,
    additionalBatchIds?: string[]
  ) => void;
}) => {
  const [batchModule, setBatchModule] = useState<ModulesForSession[]>([]);
  const [batchSession, setBatchSession] = useState<NoteTableSessionType[]>([]);
  const [moduleName, setModuleName] = useState(
    isEditing && editNote ? editNote.module || "" : ""
  );
  const [chapterName, setChapterName] = useState(
    isEditing && editNote ? editNote.chapter || "" : ""
  );
  const [topics, setTopics] = useState<string[]>(
    isEditing && editNote ? editNote.topics || [] : []
  );
  const [date, setDate] = useState<Date | undefined>(
    isEditing && editNote && editNote.createdAt
      ? new Date(editNote.createdAt)
      : new Date()
  );
  const [linkLabel, setLinkLabel] = useState("");
  const [link, setLink] = useState("");
  const [videoLinks, setVideoLinks] = useState<VideoLinksType[]>(
    isEditing && editNote ? editNote.videoLinks || [] : []
  );
  const [fileLabel, setFileLabel] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [files, setFiles] = useState<FilesType[]>(
    isEditing && editNote ? editNote.files || [] : []
  );
  const [selectedSession, setSelectedSession] =
    useState<NoteTableSessionType | null>(
      isEditing && editNote ? editNote.session || null : null
    );

  // Batch selection state
  const [availableBatches, setAvailableBatches] = useState<
    { _id: string; name: string }[]
  >([]);
  const [selectedBatchIds, setSelectedBatchIds] = useState<string[]>([]);
  const [openBatchSelect, setOpenBatchSelect] = useState(false);

  const fetchModules = useCallback(async () => {
    try {
      const res = await getModulesWithSubtopics(batchId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setBatchModule(res.data);
      if (!isEditing) {
        toast.success("Modules fetched successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch modules");
    }
  },[batchId,isEditing]);

  const fetchSessions = useCallback(async () => {
    try {
      const res = await getAllMeetingsByBatchId(batchId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      const sessions = res.data.map((session) => ({
        _id: session._id,
        meetingName: session.meetingName,
        date: session.date,
        time: session.time,
        chapter: session.chapters,
        module: session.module,
        instructor: session.instructor,
      }));

      setBatchSession(sessions);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch sessions");
    }
  },[batchId]);

  const fetchOtherBatches = useCallback(async () => {
    if (!courseId) return;
    try {
      const res = await getBatchesByCourse(courseId);
      if (res.success && Array.isArray(res.data)) {
        // Filter out current batch
        setAvailableBatches(res.data.filter((b: {_id:string}) => b._id !== batchId));
      }
    } catch (error) {
      console.error("Failed to fetch batches", error);
    }
  },[courseId,batchId]);

  useEffect(() => {
    fetchModules();
    fetchSessions();
    fetchOtherBatches();
  }, [fetchModules,fetchSessions,fetchOtherBatches]);

  const handleSave = () => {
    if (!moduleName || !chapterName || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (isEditing && editNote && updateNote) {
      const updatedNote = {
        ...editNote,
        module: moduleName,
        chapter: chapterName,
        topics: topics,
        createdAt: date,
        videoLinks,
        files,
        session: selectedSession,
      };

      updateNote(updatedNote, selectedBatchIds);
      if (setIsEditing) {
        setIsEditing(false);
      }
      toast.success("Note updated successfully");
    } else {
      const newNote = {
        module: moduleName,
        chapter: chapterName,
        topics: topics,
        createdAt: date,
        videoLinks,
        files,
        session: selectedSession,
      };

      createNewNote(newNote, selectedBatchIds);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    if (isEditing && setIsEditing) {
      setIsEditing(false);
    } else {
      setIsCreating(false);
    }
  };

  const onAddLink = (label: string, url: string) => {
    if (label && url) {
      setVideoLinks([...videoLinks, { label, link: url }]);
      setLinkLabel("");
      setLink("");
    }
  };

  const removeVideoLink = (index: number) => {
    const newLinks = [...videoLinks];
    newLinks.splice(index, 1);
    setVideoLinks(newLinks);
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const moduleChapterMap = batchModule.reduce(
    (acc, module) => {
      acc[module.name] = module.chapters.map((chapter) => chapter.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const availableChapters = moduleName
    ? moduleChapterMap[moduleName] || []
    : [];

  return (
    <TableRow
      className={cn("h-20", isEditing ? "bg-blue-50/50" : "bg-muted/50")}
    >
      <TableCell className="text-center">
        <Checkbox disabled />
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2">
          <ModuleSelector
            modules={batchModule.map((module) => module.name)}
            selectedModule={moduleName}
            onChange={(val) => {
              setModuleName(val);
              if (!isEditing) {
                setChapterName("");
              } else if (editNote) {
                const newModuleChapters = moduleChapterMap[val] || [];
                if (
                  newModuleChapters.length > 0 &&
                  !newModuleChapters.includes(chapterName)
                ) {
                  setChapterName("");
                }
              }
            }}
          />
          {/* Batch Selector - Modified to show when editing too */}
          {availableBatches.length > 0 && (
            <Popover open={openBatchSelect} onOpenChange={setOpenBatchSelect}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openBatchSelect}
                  className="w-full justify-between text-xs h-8"
                >
                  {selectedBatchIds.length > 0
                    ? `${selectedBatchIds.length} extra batches`
                    : isEditing
                    ? "Copy to other batches"
                    : "Add to other batches"}
                  <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search batch..." />
                  <CommandEmpty>No batch found.</CommandEmpty>
                  <CommandGroup>
                    {availableBatches.map((batch) => (
                      <CommandItem
                        key={batch._id}
                        value={batch.name}
                        onSelect={() => {
                          setSelectedBatchIds((prev) =>
                            prev.includes(batch._id)
                              ? prev.filter((id) => id !== batch._id)
                              : [...prev, batch._id]
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedBatchIds.includes(batch._id)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {batch.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </TableCell>
      <TableCell>
        <ChapterSelector
          chapters={availableChapters}
          selectedChapter={chapterName}
          onChange={setChapterName}
        />
      </TableCell>
      <TableCell className="max-w-xs">
        <TopicsInput
          topics={topics}
          onChange={setTopics}
          placeholder="Add topics..."
        />
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2 max-w-40">
          {selectedSession ? (
            <div className="text-sm space-y-1">
              <p className="font-medium">{selectedSession.meetingName}</p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(selectedSession.date), "MMM dd, yyyy")}
              </p>
              <p className="text-xs text-muted-foreground">
                Module: {selectedSession.module}
              </p>
              <p className="text-xs text-muted-foreground">
                Instructor: {selectedSession.instructor}
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No session selected</p>
          )}
          <SelectSessionDialog
            sessions={batchSession}
            onSelect={setSelectedSession}
            triggerLabel={isEditing ? "Change Session" : "Select Session"}
          />
        </div>
      </TableCell>
      <TableCell>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal max-w-40",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "MMM dd, yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2">
          {videoLinks.map((videoLink, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <span className="truncate max-w-32">{videoLink.link}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeVideoLink(index)}
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
              <span className="truncate max-w-32">{file.label}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <AddFileDialog
            label={fileLabel}
            fileLink={fileLink}
            setFileLabel={setFileLabel}
            setFileLink={setFileLink}
            onAddFile={(file: FilesType) => setFiles([...files, file])}
          />
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
