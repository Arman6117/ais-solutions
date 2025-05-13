"use client";
import React, { useState } from "react";
import { TableCell, TableRow } from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "../ui/calendar";
import { Calendar as CalendarIcon, X, Plus, Save } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { cn } from "@/lib/utils";
import AddLinkDialog from "./add-link-dialog";

const NewNoteForm = ({
  setIsCreating,
  createNewNote,
}: {
  setIsCreating: (state: boolean) => void;
  createNewNote: (newNote: any) => void;
}) => {
  const [moduleName, setModuleName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [linkLabel, setLinkLabel] = useState("");
  const [link, setLink] = useState("");
  const [videoLinks, setVideoLinks] = useState<Array<{ label: string; link: string }>>([]);
  const [files, setFiles] = useState<Array<string>>(["a file"]);
  
  const isMobileView = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  };

  const handleSave = () => {
    // Validate required fields
    if (!moduleName.trim() || !chapterName.trim() || !date) {
      return;
    }

    const formattedDate = date ? format(date, "MMM dd, yyyy") : "";
    
    const newNote = {
      module: moduleName,
      chapter: chapterName,
      dateCreated: formattedDate,
      videoLinks: videoLinks,
      files: files,
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

  // Mobile view (Card layout)
  if (isMobileView()) {
    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Add New Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="moduleName" className="text-sm font-medium">Module Name</label>
            <Input
              id="moduleName"
              placeholder="Enter module name"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="chapterName" className="text-sm font-medium">Chapter Name</label>
            <Input
              id="chapterName"
              placeholder="Enter chapter name"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
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
                  <div key={index} className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0">
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
                  <div key={index} className="flex items-center justify-between text-sm">
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
  }

  // Desktop view (Table Row layout)
  return (
    <TableRow className="h-20 bg-muted/50">
      <TableCell className="text-center">
        <Checkbox disabled />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Module name"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          className="max-w-40"
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Chapter name"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
          className="max-w-40"
        />
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
          <Button variant="outline" size="sm" className="mt-1">
            <Plus className="mr-2 h-3 w-3" />
            Add File
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2 justify-center">
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NewNoteForm;