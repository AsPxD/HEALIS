import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDays?: Date[];
}

const DatePicker = ({ 
  selected, 
  onSelect, 
  className = '',
  minDate,
  maxDate,
  disabledDays 
}: DatePickerProps) => {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      disabled={disabledDays}
      fromDate={minDate}
      toDate={maxDate}
      className={`p-3 bg-white rounded-xl shadow-lg ${className}`}
      classNames={{
        day_selected: "bg-violet-500 text-white hover:bg-violet-600",
        day_today: "bg-violet-50 text-violet-900",
        day: "w-10 h-10 lg:w-12 lg:h-12 p-0 flex items-center justify-center rounded-full hover:bg-violet-50 hover:text-violet-900 transition-colors",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-gray-900",
        nav: "flex items-center",
        nav_button: "h-7 w-7 bg-transparent hover:bg-violet-50 rounded-full transition-colors duration-200",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex font-medium text-gray-900",
        head_cell: "text-sm w-10 lg:w-12 font-normal text-gray-500",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-violet-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_outside: "text-gray-400",
        day_disabled: "text-gray-400 cursor-not-allowed opacity-50",
        day_range_middle: "aria-selected:bg-violet-50 aria-selected:text-violet-900",
        day_hidden: "invisible",
      }}
    />
  );
};

export default DatePicker;