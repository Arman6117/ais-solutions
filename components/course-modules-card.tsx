import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PencilIcon, Plus, Trash2 } from "lucide-react";
import React from "react";

const CourseModulesCard = ({
  modules,
  mode,
  name,
}: {
  modules: string[];
  mode: "view" | "edit";
  name: string;
}) => {
  return (
    <>
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-3 bg-gray-50 border-b">
          <CardTitle className="text-xl">{name} Modules</CardTitle>
          {mode === "edit" && (
            <Button
              size="sm"
              className="flex bg-primary-bg cursor-pointer hover:bg-primary-bg/90 items-center gap-1"
            >
              <Plus size={16} /> Add Module
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-1 p-4 overflow-y-auto max-h-[400px]">
          {modules && modules.length > 0 ? (
            modules?.map((mod, i) => (
              <div
                key={i}
                className="flex items-center cursor-pointer group justify-between p-3 rounded-md hover:bg-gray-50 border-b last:border-0"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-primary-bg/10 h-6 w-6 rounded-full flex items-center justify-center text-black text-xs font-medium group-hover:bg-primary-bg group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <span className="font-medium">{mod}</span>
                </div>
                {mode === "edit" && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 cursor-pointer text-gray-500 hover:text-gray-700"
                    >
                      <PencilIcon size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <p className="text-muted-foreground mb-2">
                No modules added yet.
              </p>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-1" /> Add Your First Module
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default CourseModulesCard;
