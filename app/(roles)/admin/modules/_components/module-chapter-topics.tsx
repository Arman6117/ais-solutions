"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, List, PencilIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import AddModuleChapterTopicButton from "./add-module-chapter-topic-button";

type ContentTopic = {
  id: number;
  title: string;
  description: string;
};
type ModuleChapterTopicsProps = {
  mode: "view" | "edit";
  topics: ContentTopic[] ;
  chapterId: number;
  addTopicToChapter: (chapterId: number, newTopic: ContentTopic) => void;
};
const ModuleChapterTopics = ({
  mode,
  topics,
  addTopicToChapter,
  chapterId,
}: ModuleChapterTopicsProps) => {
  const [chapTopics, setChapTopics] = useState(topics || []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <List className="text-green-600" />
        <span className="text-lg font-semibold">Content Covered</span>
      </div>

      <div className="ml-8">
        {chapTopics && chapTopics.length > 0 ? (
          <div className="space-y-4">
            {chapTopics.map((topic) => (
              <div
                key={topic.id}
                className="border rounded-lg p-4 bg-green-50/50 hover:bg-green-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-medium text-lg text-gray-900">
                        {topic.title}
                      </h3>
                      {topic.description && (
                        <p className="text-gray-600 mt-1">
                          {topic.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {mode === "edit" && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full hover:bg-green-600 hover:text-white"
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
              </div>
            ))}

            {mode === "edit" && (
              <AddModuleChapterTopicButton
                topics={topics}
                setChapTopics={setChapTopics}
                addTopicToChapter={addTopicToChapter}
                chapterId={chapterId}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-lg text-gray-500">
            {mode === "edit" ? (
              <div className="flex flex-col items-center gap-2">
                <p>No topics defined for this chapter yet</p>
                <AddModuleChapterTopicButton
                  topics={topics}
                  setChapTopics={setChapTopics}
                  addTopicToChapter={addTopicToChapter}
                  chapterId={chapterId}
                />
              </div>
            ) : (
              <p>No topics available for this chapter</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleChapterTopics;
