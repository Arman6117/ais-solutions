import { Button } from "@/components/ui/button";
import { Download, File, FileText, PencilIcon, Trash2Icon } from "lucide-react";
import React from "react";

type VideoLink = {
  id: string;
  label: string;
  link: string;
};

type NoteFile = {
  id: string;
  fileName: string;
  fileSize?: string;
  fileType?: string;
  downloadUrl: string;
};

type Chapter = {
  id: number;
  name: string;
  description: string;
  videoLinks: VideoLink[];
  files?: NoteFile[];
};
type ModuleChapterNotesFilesProps = {
  mode: "view" | "edit";
  chap: Chapter;
};
const ModuleChapterNotesFiles = ({
  chap,
  mode,
}: ModuleChapterNotesFilesProps) => {
  const handleFileChange = (fileId: string) => {
    console.log(`Changing file with ID: ${fileId}`);
  };

  const handleFileDelete = (fileId: string) => {
    console.log(`Deleting file with ID: ${fileId}`);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <FileText className="text-primary-bg" />
        <span className="text-lg font-semibold">Lecture Notes</span>
      </div>

      <div className="ml-8">
        {chap.files && chap.files.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 p-3 border-b font-medium text-gray-600">
              <div className="col-span-7 flex items-center">File Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-3">Actions</div>
            </div>

            {chap.files.map((file, index) => (
              <div
                key={index}
                className="grid grid-cols-12 p-3 border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* <div >{file}</div> */}
                <div className="col-span-7 flex items-center">
                  <File className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="font-medium truncate">{file.fileName}</span>
                </div>
                <div className="col-span-2 flex items-center text-sm text-gray-500">
                  {file.fileSize || "-"}
                </div>
                <div className="col-span-3 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(file.downloadUrl, "_blank")}
                    title="Download"
                  >
                    <Download size={16} />
                  </Button>

                  {mode === "edit" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full hover:bg-primary-bg hover:text-white"
                        title="Change File"
                        onClick={() => handleFileChange(file.id)}
                      >
                        <PencilIcon size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full hover:bg-red-500 hover:text-white"
                        title="Remove File"
                        onClick={() => handleFileDelete(file.id)}
                      >
                        <Trash2Icon size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-lg text-gray-500">
            No notes available for this chapter
          </div>
        )}
      </div>
    </>
  );
};

export default ModuleChapterNotesFiles;
