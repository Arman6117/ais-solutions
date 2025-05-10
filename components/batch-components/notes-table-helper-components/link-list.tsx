import { Button } from "@/components/ui/button";
import { Trash2, FileText, FileSpreadsheet, FileType, Presentation } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type LinkField = "youtubeLinks" | "files";

interface FileItem {
  name: string;
  type?: string;
}

type LinkListProps = {
  items: (string | FileItem)[];
  noteId: string;
  fieldName: string;
  handleDelete: (noteId: string, fieldName: LinkField, index: number) => void;
  handleAdd: (noteId: string, fieldName: LinkField) => void;
  isUrl?: boolean;
  isFile?: boolean;
  basePath?: string;
  buttonText?: string;
};

// Helper function to get appropriate icon based on file type
const getFileIcon = (file: FileItem) => {
  // Get file extension from name
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  // Check MIME type first
  if (file.type) {
    if (file.type.includes('pdf')) return <FileText className="h-4 w-4" />;
    if (file.type.includes('spreadsheet') || file.type.includes('excel')) return <FileSpreadsheet className="h-4 w-4" />;
    if (file.type.includes('presentation') || file.type.includes('powerpoint')) return <Presentation className="h-4 w-4" />;
    if (file.type.includes('word') || file.type.includes('document')) return <FileType className="h-4 w-4" />;
  }
  
  // Fall back to extension
  switch (extension) {
    case 'pdf': return <FileText className="h-4 w-4" />;
    case 'xlsx':
    case 'xls': return <FileSpreadsheet className="h-4 w-4" />;
    case 'pptx':
    case 'ppt': return <Presentation className="h-4 w-4" />;
    case 'docx':
    case 'doc': return <FileType className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

// Function to get file type display name
const getFileTypeName = (file: FileItem) => {
  // Check MIME type first
  if (file.type) {
    if (file.type.includes('pdf')) return 'PDF';
    if (file.type.includes('spreadsheet') || file.type.includes('excel')) return file.type.includes('openxml') ? 'XLSX' : 'XLS';
    if (file.type.includes('presentation') || file.type.includes('powerpoint')) return file.type.includes('openxml') ? 'PPTX' : 'PPT';
    if (file.type.includes('word') || file.type.includes('document')) return file.type.includes('openxml') ? 'DOCX' : 'DOC';
  }
  
  // Fall back to extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  return extension ? extension.toUpperCase() : 'FILE';
};

const LinkList = ({
  items,
  noteId,
  fieldName,
  handleDelete,
  handleAdd,
  isUrl = false,
  isFile = false,
  basePath = "",
  buttonText = "Add Item",
}: LinkListProps) => (
  <div className="flex flex-col gap-1">
    {items?.map((item, index) => {
      // Handle files (object with name and type)
      if (isFile && typeof item !== 'string') {
        const file = item as FileItem;
        return (
          <div key={index} className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 max-w-[200px] overflow-hidden">
                    {getFileIcon(file)}
                    <Link
                      href={`${basePath}${file.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      {file.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      [{getFileTypeName(file)}]
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{file.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(noteId, fieldName as LinkField, index);
              }}
              className="h-6 w-6"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        );
      }
      
      // Handle strings (YouTube links or legacy file names)
      const itemAsString = item as string;
      return (
        <div key={index} className="flex items-center gap-2">
          <Link
            href={isUrl ? itemAsString : `${basePath}${itemAsString}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {isUrl ? `Link ${index + 1}` : itemAsString}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(noteId, fieldName as LinkField, index);
            }}
            className="h-6 w-6"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      );
    })}
    <Button
      variant="outline"
      size="sm"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAdd(noteId, fieldName as LinkField);
      }}
      className="mt-1"
    >
      {buttonText}
    </Button>
  </div>
);

export default LinkList;