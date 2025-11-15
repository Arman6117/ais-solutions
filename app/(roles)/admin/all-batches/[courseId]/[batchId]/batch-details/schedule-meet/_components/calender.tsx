import React, { JSX, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarMode = "single" | "multiple" | "range";

interface CalendarProps {
  mode?: CalendarMode;
  selected?: Date | Date[] | null;
  onSelect?: (date: Date | Date[]) => void;
  className?: string;
  maxDates?: number;
}

const Calendar: React.FC<CalendarProps> = ({
  mode = "single",
  selected,
  onSelect,
  className = "",
  maxDates = 15,
}) => {
  const [viewDate, setViewDate] = useState<Date>(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getDaysInMonth = (date: Date): number =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date): number =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isSelected = (date: Date): boolean => {
    if (mode === "single") {
      return isSameDay(date, selected as Date);
    } else if (mode === "multiple") {
      const selectedDates = (selected as Date[]) || [];
      return selectedDates.some(d => isSameDay(d, date));
    }
    return false;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
    setViewDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    if (mode === "single") {
      onSelect?.(date);
    } else if (mode === "multiple") {
      const selectedDates = (selected as Date[]) || [];
      const isDateSelected = selectedDates.some(d => isSameDay(d, date));

      if (isDateSelected) {
        const newDates = selectedDates.filter(d => !isSameDay(d, date));
        onSelect?.(newDates);
      } else {
        if (selectedDates.length >= maxDates) {
          return;
        }
        onSelect?.([...selectedDates, date]);
      }
    }
  };

  const renderCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days: JSX.Element[] = [];

    // Previous month trailing days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(new Date(prevYear, prevMonth));

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
      const isDateSelected = isSelected(date);

      days.push(
        <button
          key={`prev-${daysInPrevMonth - i}`}
          type="button"
          className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 p-0 transition-colors ${
            isDateSelected
              ? "bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {daysInPrevMonth - i}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDateSelected = isSelected(date);
      const isTodayDate = isToday(date);

      let dayClasses =
        "inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 p-0 transition-colors";

      if (isDateSelected) {
        dayClasses +=
          " bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-600 focus:text-white font-semibold";
      } else if (isTodayDate) {
        dayClasses +=
          " bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200";
      } else {
        dayClasses += " hover:bg-blue-50 hover:text-blue-600";
      }

      days.push(
        <button
          key={day}
          type="button"
          className={dayClasses}
          onClick={() => handleDateClick(date)}
          aria-selected={isDateSelected}
        >
          {day}
        </button>
      );
    }

    // Next month leading days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(nextYear, nextMonth, day);
      const isDateSelected = isSelected(date);

      days.push(
        <button
          key={`next-${day}`}
          type="button"
          className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 p-0 transition-colors ${
            isDateSelected
              ? "bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const selectedDates = mode === "multiple" ? (selected as Date[]) || [] : [];

  return (
    <div className={`p-3 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 p-0 border border-gray-200 bg-white hover:bg-gray-100 transition-colors"
          onClick={() => navigateMonth("prev")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
        </h2>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 p-0 border border-gray-200 bg-white hover:bg-gray-100 transition-colors"
          onClick={() => navigateMonth("next")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {mode === "multiple" && (
        <div className="mb-3 text-sm text-gray-600 text-center">
          {selectedDates.length} of {maxDates} dates selected
        </div>
      )}

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-gray-600 rounded-md w-9 font-medium text-sm flex items-center justify-center h-9"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
