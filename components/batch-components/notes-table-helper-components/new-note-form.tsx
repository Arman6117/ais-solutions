import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import React, { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  FileSpreadsheet,
  Presentation,
  FileType,
} from "lucide-react";
import { toast } from "sonner";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define allowed file types
const ALLOWED_FILE_TYPES = {
  "application/pdf": {
    icon: FileText,
    displayType: "PDF",
  },
  "application/vnd.ms-powerpoint": {
    icon: Presentation,
    displayType: "PPT",
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    icon: Presentation,
    displayType: "PPTX",
  },
  "application/msword": {
    icon: FileType,
    displayType: "DOC",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: FileType,
    displayType: "DOCX",
  },
  "application/vnd.ms-excel": {
    icon: FileSpreadsheet,
    displayType: "XLS",
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    icon: FileSpreadsheet,
    displayType: "XLSX",
  },
};

// Max file size in MB
const MAX_FILE_SIZE_MB = 10;

// Define a type for file uploads
interface FileUpload {
  file: File;
  name: string;
  type: string;
  displayType: string;
  previewUrl?: string;
}

type NewNoteFormProps = {
  newNote: {
    moduleName?: string;
    chapterName?: string;
    dateCreated?: string;
    youtubeLinks?: string[];
    files?: Array<{ name: string; type: string }>;
  };
  setNewNote: (note: any) => void;
  handleCreateNote: () => void;
  setIsCreating: (isCreating: boolean) => void;
};

const NewNoteForm = ({
  newNote,
  setNewNote,
  handleCreateNote,
  setIsCreating,
}: NewNoteFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);

  // Helper to get file extension
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || "";
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file type
      if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
        toast.error(
          "Unsupported file type. Please upload PDF, PowerPoint, Word, or Excel files"
        );
        return;
      }

      // Size validation (10MB limit)
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File size should be less than ${MAX_FILE_SIZE_MB}MB`);
        return;
      }

      // Get display type for the file
      const fileInfo =
        ALLOWED_FILE_TYPES[file.type as keyof typeof ALLOWED_FILE_TYPES];
      const displayType = fileInfo
        ? fileInfo.displayType
        : getFileExtension(file.name).toUpperCase();

      // Add to uploads
      const newFileUpload: FileUpload = {
        file,
        name: file.name,
        type: file.type,
        displayType,
      };

      setFileUploads([...fileUploads, newFileUpload]);

      // Add to note's files array with name and type
      setNewNote({
        ...newNote,
        files: [...(newNote.files || []), { name: file.name, type: file.type }],
      });

      // Reset input so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success(`Added file: ${file.name}`);
    }
  };

  // Remove a file from the uploads
  const removeFile = (index: number) => {
    const updatedUploads = [...fileUploads];
    updatedUploads.splice(index, 1);
    setFileUploads(updatedUploads);

    // Also remove from the note's files array
    const updatedFiles = [...(newNote.files || [])];
    updatedFiles.splice(index, 1);
    setNewNote({
      ...newNote,
      files: updatedFiles,
    });
  };

  // Get appropriate icon for file type
  const getFileIcon = (fileType: string) => {
    const fileInfo =
      ALLOWED_FILE_TYPES[fileType as keyof typeof ALLOWED_FILE_TYPES];
    if (fileInfo) {
      const Icon = fileInfo.icon;
      return <Icon size={12} />;
    }
    return <FileText size={12} />;
  };

  // Submit the form with files
  const handleSubmit = async () => {
    // In a real application, you would upload the files to your server here
    // For demonstration, we'll simulate a successful upload

    if (fileUploads.length > 0) {
      // Here you would typically create a FormData object and upload the files
      // const formData = new FormData();
      // fileUploads.forEach(upload => {
      //   formData.append("files", upload.file);
      // });
      // await fetch("/api/upload", { method: "POST", body: formData });

      toast.success(`${fileUploads.length} file(s) uploaded successfully`);
    }

    // Call the original create note function
    handleCreateNote();
  };

  // Get accepted file types for input
  const getAcceptedFileTypes = () => {
    return (
      Object.keys(ALLOWED_FILE_TYPES).join(",") +
      ",.pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx"
    );
  };

  return (
    <TableRow>
      <TableCell />
      <TableCell>
        <Input
          value={newNote.moduleName || ""}
          onChange={(e) =>
            setNewNote({ ...newNote, moduleName: e.target.value })
          }
          placeholder="Module Name"
        />
      </TableCell>
      <TableCell>
        <Input
          value={newNote.chapterName || ""}
          onChange={(e) =>
            setNewNote({ ...newNote, chapterName: e.target.value })
          }
          placeholder="Chapter Name"
        />
      </TableCell>
      <TableCell>
        <Input
          type="date"
          value={newNote.dateCreated || ""}
          onChange={(e) =>
            setNewNote({ ...newNote, dateCreated: e.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const link = prompt("Enter YouTube link:");
            if (link) {
              setNewNote({
                ...newNote,
                youtubeLinks: [...(newNote.youtubeLinks || []), link],
              });
            }
          }}
        >
          Add Link
        </Button>
        {newNote.youtubeLinks && newNote.youtubeLinks.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">
            {newNote.youtubeLinks.length} link(s) added
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2">
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={getAcceptedFileTypes()}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload size={16} /> Upload Files
          </Button>

          {/* Show list of uploaded files */}
          {fileUploads.length > 0 && (
            <div className="mt-2 space-y-1">
              {fileUploads.map((upload, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs bg-secondary p-1 rounded"
                >
                  {/* <TooltipProvider> */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1 overflow-hidden">
                          {getFileIcon(upload.type)}
                          <span className=" max-w-[200px]">
                            {upload.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            [{upload.displayType}]
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{upload.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  {/* </TooltipProvider> */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => removeFile(index)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Save</Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIsCreating(false);
              setNewNote({});
              setFileUploads([]);
            }}
          >
            Cancel
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NewNoteForm;
