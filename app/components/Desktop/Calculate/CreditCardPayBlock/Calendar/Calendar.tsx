"use client";

import { DayPicker } from "react-day-picker";
import { ru } from "react-day-picker/locale";
import { parseDate } from "./utils/parsedate";
import { useEffect, useRef, useState } from "react";
import { formatDateRu } from "@/app/utils/formatDateRu";
import { ModalYears } from "./componets/ModalYerars";
import { DAY_PICKER_CLASSES, DAY_PICKER_STYLES } from "./utils/const";
import {
  isWeekendInCurrentMonth,
  isWeekendOutsideMonth,
} from "./utils/dateModifiers";
import { CalendarCaption } from "./componets/CalendarCaption";

type DateProps = {
  openPicker: string | null;
  pickerType: "start" | "send";
  dateValue: string;
  setDateValue: (date: string) => void;
  setOpenPicker: (value: "start" | "send" | null) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  minDate?: Date | null;
};

export const CalendarDatePicker = ({
  openPicker,
  pickerType,
  dateValue,
  setDateValue,
  setOpenPicker,
  containerRef,
  minDate,
}: DateProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showYearModal, setShowYearModal] = useState(false);
  const yearModalRef = useRef<HTMLDivElement | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = openPicker === pickerType;

  const getEffectiveMinDate = () => {
    if (!minDate || isNaN(minDate.getTime())) return undefined;

    if (pickerType === "send") {
      return minDate;
    } else {
      const date = new Date(minDate);
      date.setMonth(date.getMonth() + 1, 0);
      return date;
    }
  };

  const effectiveMinDate = getEffectiveMinDate();

  const handleYearSelect = (year: number) => {
    const newDate = new Date(selectedMonth);
    newDate.setFullYear(year);
    setSelectedMonth(newDate);
    setDateValue(formatDateRu(newDate));
    setCurrentYear(year);
    setShowYearModal(false);
  };

  useEffect(() => {
    if (!isVisible) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsidePicker = pickerRef.current?.contains(target);
      const clickedInsideYearModal = yearModalRef.current?.contains(target);
      const clickedInsideContainer = containerRef.current?.contains(target);

      if (
        !clickedInsidePicker &&
        !clickedInsideYearModal &&
        !clickedInsideContainer
      ) {
        setOpenPicker(null);
        setShowYearModal(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpenPicker, isVisible, containerRef]);

  useEffect(() => {
    const parsed = parseDate(dateValue);
    if (parsed && !isNaN(parsed.getTime())) {
      setSelectedMonth(parsed);
    }
  }, [dateValue]);

  useEffect(() => {
    setCurrentYear(selectedMonth.getFullYear());
  }, [selectedMonth]);

  return (
    <>
      <div
        ref={pickerRef}
        className={`absolute left-0 top-full mt-2 z-20
        transition-all duration-100 bg-white rounded-2xl
        ${
          isVisible
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        <div className={`${DAY_PICKER_STYLES}`}>
          <DayPicker
            mode="single"
            locale={ru}
            selected={parseDate(dateValue)}
            showOutsideDays
            required
            captionLayout="label"
            month={selectedMonth}
            onMonthChange={setSelectedMonth}
            startMonth={new Date(2025, 4)}
            endMonth={new Date(2026, 4)}
            onSelect={(day) => {
              if (!day) return;

              if (effectiveMinDate && day < effectiveMinDate) {
                return;
              }
              setDateValue(formatDateRu(day));
              setOpenPicker(null);
            }}
            disabled={
              effectiveMinDate ? { before: effectiveMinDate } : undefined
            }
            //onDayClick даёт возможность выбрать уже выбранный день ранее
            //Но снимает выделение, поэтому сохраняем onSelect
            onDayClick={(day) => {
              setDateValue(formatDateRu(day));
              setOpenPicker(null);
            }}
            modifiers={{
              weekendCurrent: (date) =>
                isWeekendInCurrentMonth(date, selectedMonth),
              weekendOutside: (date) =>
                isWeekendOutsideMonth(date, selectedMonth),
            }}
            modifiersClassNames={{
              weekendCurrent: "text-red-500 font-semibold",
              weekendOutside: "!text-red-500/70",
              disabled:
                "text-gray-300 opacity-60 cursor-default pointer-events-none ",
            }}
            components={{
              CaptionLabel: () => (
                <div className="relative bottom-14">
                  <CalendarCaption
                    selectedMonth={selectedMonth}
                    currentYear={currentYear}
                    onYearClick={() => setShowYearModal(true)}
                  />
                  <ModalYears
                    handleYearSelect={handleYearSelect}
                    showYearModal={showYearModal}
                    yearModalRef={yearModalRef}
                    currentYear={currentYear}
                  />
                </div>
              ),
            }}
            classNames={DAY_PICKER_CLASSES}
          />
        </div>
      </div>
    </>
  );
};
