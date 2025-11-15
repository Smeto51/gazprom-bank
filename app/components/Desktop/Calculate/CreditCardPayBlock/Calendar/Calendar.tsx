"use client";

import { DayPicker } from "react-day-picker";
import { ru } from "react-day-picker/locale";
import { parseDate } from "./utils/parsedate";
import { useEffect, useRef, useState } from "react";
import { formatDateRu } from "@/app/utils/formatDateRu";

const DAY_PICKER_CLASS = `
    [&_.rdp-day_button:hover:not(.rdp-selected):not(.rdp-outside)]:bg-gray-200
    [&_.rdp-selected]:!bg-black
    [&_.rdp-selected]:!text-white
    [&_.rdp-selected]:rounded-full
    [&_.rdp-day_button.rdp-selected:hover]:!bg-black
    [&_.rdp-selected.rdp-day_button:hover]:!bg-black
    [&_.rdp-caption_label]:text-transparent`;

type DateProps = {
  openPicker: string | null;
  dateStartCard: string;
  setDateStartCard: (date: string) => void;
  pickerRef: React.RefObject<HTMLDivElement | null>;
  setOpenPicker: (value: "start" | "send" | null) => void;
};

export const CalendarDatePicker = ({
  openPicker,
  dateStartCard,
  setDateStartCard,
  pickerRef,
  setOpenPicker,
}: DateProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 2 }, (_, i) => 2025 + i);
  const [showYearModal, setShowYearModal] = useState(false);
  const yearModalRef = useRef<HTMLDivElement | null>(null);

  const handleYearSelect = (year: number) => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(year);
    setSelectedMonth(newDate);
    setCurrentYear(year);
    setShowYearModal(false);
  };

  useEffect(() => {
    if (!openPicker && !showYearModal) return;

    const handleClick = (e: MouseEvent) => {
      const clickedInsidePicker = pickerRef.current?.contains(e.target as Node);
      const clickedInsideYearModal = yearModalRef.current?.contains(
        e.target as Node
      );

      if (!clickedInsidePicker && !clickedInsideYearModal) {
        setOpenPicker(null);
        setShowYearModal(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openPicker, showYearModal, pickerRef, setOpenPicker]);

  useEffect(() => {
    setCurrentYear(selectedMonth.getFullYear());
  }, [selectedMonth]);

  return (
    <>
      <div
        className={`absolute left-0 top-full mt-2 z-20
        transition-all duration-100 bg-white rounded-2xl
        ${
          openPicker === "start"
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className={`${DAY_PICKER_CLASS}`}>
          <DayPicker
            mode="single"
            locale={ru}
            selected={parseDate(dateStartCard)}
            showOutsideDays
            required
            captionLayout="label"
            month={selectedMonth}
            onMonthChange={setSelectedMonth}
            onSelect={(day) => {
              if (!day) return;
              setDateStartCard(formatDateRu(day));
              setOpenPicker(null);
            }}
            //onDayClick даёт возможность выбрать уже выбранный день ранее
            //Но снимает выделение, поэтому сохраняем onSelect
            onDayClick={(day) => {
              setDateStartCard(formatDateRu(day));
              setOpenPicker(null);
            }}
            modifiers={{
              weekendCurrent: (date) => {
                const day = date.getDay();

                const currentMonth = selectedMonth.getMonth();
                const currentYear = selectedMonth.getFullYear();
                const isCurrentMonth =
                  date.getMonth() === currentMonth &&
                  date.getFullYear() === currentYear;
                const isWeekend = day === 0 || day === 6;
                return isWeekend && isCurrentMonth;
              },
              weekendOutside: (date) => {
                const day = date.getDay();
                const currentMonth = selectedMonth.getMonth();
                const currentYear = selectedMonth.getFullYear();
                const isOutsideMonth =
                  date.getMonth() !== currentMonth ||
                  date.getFullYear() !== currentYear;
                const isWeekend = day === 0 || day === 6;
                return isWeekend && isOutsideMonth;
              },
            }}
            modifiersClassNames={{
              weekendCurrent: "text-red-500 font-semibold",
              weekendOutside: "!text-red-500/70",
            }}
            components={{
              CaptionLabel: () => (
                <div className="absolute top-5 left-1/2 -translate-x-1/2">
                  <span className="capitalize font-semibold text-lg">
                    {selectedMonth.toLocaleDateString("ru-RU", {
                      month: "long",
                    })}
                  </span>
                  <button
                    onClick={() => setShowYearModal(true)}
                    className="text-blue-500 hover:text-blue-600 cursor-pointer transition-colors font-semibold z-10 text-lg ml-3"
                  >
                    {currentYear}
                  </button>
                </div>
              ),
            }}
            classNames={{
              root: "shadow-lg p-5 bg-white pb-20 rounded-2xl",
              nav: "flex justify-between w-full",
              today: "font-bold text-blue-500",
              day_button:
                "cursor-pointer w-10 h-10 rounded-full transition-all",
              outside:
                "opaciti-40 pointer-events-none cursor-default text-gray-400",
              button_previous:
                "mb-2 ml-4 hover:text-blue-500 fill-current duration-200 transition-colors",
              button_next:
                "mr-4 hover:text-blue-500 fill-current duration-200 transition-colors",
            }}
          />
        </div>
      </div>
      <div
        className={`absolute -inset-5 flex items-center justify-center z-40 top-60 right-50 -left-12
              transition-all duration-100
              ${
                showYearModal
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible pointer-events-none"
              }`}
      >
        <div
          ref={yearModalRef}
          className="bg-white shadow-2xl max-w-[280px] w-full mx-4 rounded-2xl min-h-65"
        >
          <div className="grid grid-cols-3 gap-3 max-h-80  mt-5 p-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                className={`py-3 rounded-lg font-semibold transition-all cursor-pointer
                          ${
                            year === currentYear
                              ? "bg-black text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
