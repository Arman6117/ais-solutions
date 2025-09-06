import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, Save, X } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddLinkDialog from "./add-link-dialog";
import { format } from "date-fns";
import { VideoLinksType } from "@/lib/types/note.type";

type MobileNewNoteFormProps = {
  moduleName: string;
  setModuleName: (name: string) => void;
  chapterName: string;
  setChapterName: (name: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  linkLabel: string;
  link: string;
  setLinkLabel: (label: string) => void;
  setLink: (url: string) => void;
  onAddLink?: (link: string, label: string) => void;
  videoLinks: VideoLinksType[];
  setVideoLinks:(links:VideoLinksType[]) =>void
  files:string[],
  handleCancel:()=> void
  handleSave:()=> void
};
const MobileNewNoteForm = ({
  chapterName,
  date,
  moduleName,
  setChapterName,
  setDate,
  setModuleName,
  link,
  linkLabel,
  setLink,
  setLinkLabel,
  onAddLink,
  videoLinks,
  setVideoLinks,
  files,
  handleCancel, 
  handleSave
}: MobileNewNoteFormProps) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Add New Note</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="moduleName" className="text-sm font-medium">
            Module Name
          </label>
          <Input
            id="moduleName"
            placeholder="Enter module name"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="chapterName" className="text-sm font-medium">
            Chapter Name
          </label>
          <Input
            id="chapterName"
            placeholder="Enter chapter name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
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
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Video Links</label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
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

          {videoLinks.length > 0 && (
            <div className="space-y-2 border rounded-md p-2">
              {videoLinks.map((videoLink, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                >
                  <span className="truncate max-w-60">{videoLink.label}</span>
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
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Files</label>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-3 w-3" />
              Add File
            </Button>
          </div>

          {files.length > 0 && (
            <div className="space-y-2 border rounded-md p-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="truncate max-w-60">{file}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Note
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MobileNewNoteForm;
