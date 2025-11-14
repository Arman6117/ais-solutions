import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {  DummyBatches, prCourse } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import React from "react";

const StatusCard = ({
  course,
  batches,
  name,
  createdAt,
  updatedAt,
  onRemove
}: {
  onRemove?: () => void;
  createdAt?:string
  updatedAt?:string
  course?: prCourse;
  batches?: DummyBatches[];
  name: string;
}) => {

  return (
    <>
      <Card className="border-0 shadow-md">
        <CardHeader className={"pb-3 bg-gray-50 border-b flex justify-between"}>
          <CardTitle className="text-xl">{name} Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4 ">
          <div className={cn("space-y-4")}>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">{format(createdAt!, "PP")}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">{format(updatedAt!, "PP")}</span>
            </div>
            {batches && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  Published
                </Badge>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Students</span>
              <span className="font-medium">{course?.numberOfStudents}</span>
            </div>
            {batches && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Batches</span>
                <span className="font-medium">{batches?.length}</span>
              </div>
            )}

            <>
              <Separator className="my-2" />

              <div className="mt-4 pt-2">
                <Button
                  variant="outline"
                  onClick={onRemove}
                  className="w-full cursor-pointer border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Remove {name}
                </Button>
              </div>
            </>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default StatusCard;
