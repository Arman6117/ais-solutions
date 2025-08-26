import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarClock, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { FormData, FormErrors } from "./schedule-meet-form";
import Calendar from "./calender";



interface ScheduleSectionProps {
  date: Date | undefined;
  time: string;
  errors: FormErrors;
  onUpdate: (updates: Partial<FormData>) => void;
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
  time,
  errors,
  onUpdate,
}: ScheduleSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Schedule
      </h3>

      <div className="">
        <div className="space-y-4">
          <Label className="text-base font-medium flex items-center gap-2 text-gray-700">
            <CalendarClock className="w-5 h-5 text-blue-600" />
            Select Date *
          </Label>
          <div className="border rounded-xl p-6 bg-white shadow-sm">
            <Calendar 
              mode="single" 
              onSelect={(selectedDate) => onUpdate({ date: selectedDate })} 
              selected={date} 
            />
          </div>
          {date && (
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

          {date && time && (
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