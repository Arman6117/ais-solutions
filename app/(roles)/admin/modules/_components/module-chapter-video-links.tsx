import { Button } from "@/components/ui/button";
import { ExternalLink, PencilIcon, Trash2Icon } from "lucide-react";
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
  files?: NoteFile[] | undefined;
};
type ModuleChapterVideoLinksProps = {
  chapter: Chapter;
  mode: "view" | "edit";
};

const openLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
const ModuleChapterVideoLinks = ({
  chapter,
  mode,
}: ModuleChapterVideoLinksProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <ExternalLink className="text-primary-bg" />
        <span className="text-lg font-semibold">Lecture Materials</span>
      </div>

      <div className="ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {chapter.videoLinks?.map((link) => (
          <div
            key={link.id}
            className="flex flex-col p-3 border rounded-lg hover:border-primary-bg transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{link.label}</h3>
              {mode === "edit" && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full hover:bg-primary-bg hover:text-white"
                  >
                    <PencilIcon size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full hover:bg-red-500 hover:text-white"
                  >
                    <Trash2Icon size={16} />
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              className="mt-auto text-primary-bg border-primary-bg hover:bg-primary-bg hover:text-white"
              onClick={() => openLink(link.link)}
            >
              <ExternalLink size={16} className="mr-2" />
              View Lecture
            </Button>
          </div>
        ))}

        {(!chapter.videoLinks || chapter.videoLinks.length === 0) && (
          <div className="col-span-full text-center py-6 border border-dashed rounded-lg text-gray-500">
            No lecture materials available for this chapter
          </div>
        )}
      </div>
    </>
  );
};

export default ModuleChapterVideoLinks;
