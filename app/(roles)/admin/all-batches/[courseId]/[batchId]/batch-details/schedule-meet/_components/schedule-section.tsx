import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarClock, Clock, AlertCircle, X } from "lucide-react";
import { format } from "date-fns";
import { FormData, FormErrors } from "./schedule-meet-form";
import Calendar from "./calender";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface ScheduleSectionProps {
  date: Date | undefined;
  dates?: Date[]; // For multiple mode
  time: string;
  errors: FormErrors;
  onUpdate: (updates: Partial<FormData>) => void;
  multipleMode?: boolean;
  onMultipleModeToggle?: (enabled: boolean) => void;
}

const QUICK_TIME_OPTIONS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function ScheduleSection({
  date,
  dates = [],
  time,
  errors,
  onUpdate,
  multipleMode = false,
  onMultipleModeToggle,
}: ScheduleSectionProps) {
  const [isMultipleMode, setIsMultipleMode] = useState(multipleMode);

  const handleMultipleModeToggle = (checked: boolean) => {
    setIsMultipleMode(checked);
    onMultipleModeToggle?.(checked);
    
    // Reset dates when toggling
    if (checked) {
      onUpdate({ dates: date ? [date] : [], date: undefined });
    } else {
      onUpdate({ date: dates[0] || new Date(), dates: [] });
    }
  };

  const removeDate = (dateToRemove: Date) => {
    const newDates = dates.filter(d => d.getTime() !== dateToRemove.getTime());
    onUpdate({ dates: newDates });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="text-xl font-semibold text-gray-800">
          Schedule
        </h3>
        <div className="flex items-center gap-2">
          <Label htmlFor="multiple-mode" className="text-sm text-gray-600">
            Multiple Dates
          </Label>
          <Switch
            id="multiple-mode"
            checked={isMultipleMode}
            onCheckedChange={handleMultipleModeToggle}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
            <CalendarClock className="w-5 h-5 text-blue-600" />
            {isMultipleMode ? "Select Multiple Dates *" : "Select Date *"}
          </Label>
          
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <Calendar
              mode={isMultipleMode ? "multiple" : "single"}
              onSelect={(selectedDate) => {
                if (isMultipleMode) {
                  onUpdate({ dates: selectedDate as Date[] });
                } else {
                  onUpdate({ date: selectedDate as Date });
                }
              }}
              selected={isMultipleMode ? dates : date}
              maxDates={15}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>

          {/* Selected Dates Display for Multiple Mode */}
          {isMultipleMode && dates.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900 mb-3">
                📅 Selected Dates ({dates.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {dates
                  .sort((a, b) => a.getTime() - b.getTime())
                  .map((d, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-white border border-blue-300 rounded-md px-3 py-1.5 text-sm"
                    >
                      <span className="text-blue-800 font-medium">
                        {format(d, "MMM dd, yyyy")}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeDate(d)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Single Date Display */}
          {!isMultipleMode && date && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm font-medium">
                📅 Selected: {format(date, "EEEE, MMMM do, yyyy")}
              </p>
            </div>
          )}

          {errors.date && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.date}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-blue-600" />
            Time (HH:MM) *
          </Label>
          <div className="space-y-4">
            <Input
              type="time"
              value={time}
              onChange={(e) => onUpdate({ time: e.target.value })}
              className={`w-full text-lg h-12 ${
                errors.time
                  ? "border-red-500 focus-visible:ring-red-200"
                  : "border-gray-300 focus-visible:ring-blue-200 focus-visible:border-blue-500"
              }`}
            />

            {/* Quick Time Suggestions */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Quick select:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_TIME_OPTIONS.map((quickTime) => (
                  <Button
                    key={quickTime}
                    type="button"
                    onClick={() => onUpdate({ time: quickTime })}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      time === quickTime
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                  >
                    {quickTime}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          {errors.time && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.time}
            </p>
          )}

          {/* Summary Alert */}
          {isMultipleMode && dates.length > 0 && time && (
            <Alert className="bg-green-50 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ✅ {dates.length} meeting{dates.length > 1 ? 's' : ''} will be created at {time}
              </AlertDescription>
            </Alert>
          )}

          {!isMultipleMode && date && time && (
            <Alert className="bg-green-50 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ✅ Meeting scheduled for:{" "}
                {format(date, "EEEE, MMMM do, yyyy")} at {time}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
