import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, AlertCircle } from "lucide-react";
import { BatchesIdsNames } from "@/actions/shared/get-batches-ids";
import { FormData, FormErrors } from "./schedule-meet-form";


interface BatchSelectionSectionProps {
  selectedBatchId: string;
  batches: BatchesIdsNames[];
  selectedBatch?: BatchesIdsNames;
  errors: FormErrors;
  onUpdate: (updates: Partial<FormData>) => void;
}

export default function BatchSelectionSection({
  selectedBatchId,
  batches,
  selectedBatch,
  errors,
  onUpdate,
}: BatchSelectionSectionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
        <Users className="w-5 h-5 text-blue-600" />
        Select Batch *
      </Label>
      <Select 
        value={selectedBatchId} 
        onValueChange={(value) => onUpdate({ selectedBatchId: value })}
      >
        <SelectTrigger
          className={`w-full ${
            errors.batch ? "border-red-500" : "border-gray-300"
          }`}
        >
          <SelectValue placeholder="Choose a batch" />
        </SelectTrigger>
        <SelectContent>
          {batches.map((batch) => (
            <SelectItem key={batch._id} value={batch._id}>
              {batch.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedBatch && (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          Selected: {selectedBatch.name}
        </Badge>
      )}
      {errors.batch && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {errors.batch}
        </p>
      )}
    </div>
  );
}