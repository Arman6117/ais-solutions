import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, PencilIcon, Plus, Trash2, Users } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const CourseBatchesCards = ({ batches }: { batches: any[] }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Batches</h2>
        <Button
          size="sm"
          className="flex items-center gap-1 cursor-pointer bg-primary-bg hover:bg-primary-bg/90"
        >
          {/* //TODO:Add batch page */}
          <Plus size={16} /> Add Batch
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {batches.map((batch) => (
          <Card
            key={batch.id}
            className="border border-gray-200 hover:border-gray-300 transition-all"
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{batch.name}</h3>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      {batch.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} className="text-primary" />
                      <span>Starts: {batch.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} className="text-primary" />
                      <span>Ends: {batch.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={14} className="text-primary" />
                      <span>{batch.students} Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={14} className="text-primary" />
                      <span>
                        {batch.time} ({batch.schedule})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:self-start">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 cursor-pointer"
                  >
                    <PencilIcon size={14} className="mr-1" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => toast.success("Batch removed")}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {batches.length === 0 && (
        <div className="text-center p-8 border border-dashed rounded-lg bg-gray-50">
          <p className="text-muted-foreground">
            No batches created for this course yet.
          </p>
          <Button className="mt-2  cursor-pointer bg-primary-bg hover:bg-primary-bg/90">
            <Plus size={16} className="mr-1" /> Create Your First Batch
          </Button>
        </div>
      )}
    </>
  );
};

export default CourseBatchesCards;
