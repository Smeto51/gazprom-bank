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
        <div className={`${DAY_PICKER_STYLES}`}>
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
              weekendCurrent: (date) =>
                isWeekendInCurrentMonth(date, selectedMonth),
              weekendOutside: (date) =>
                isWeekendOutsideMonth(date, selectedMonth),
            }}
            modifiersClassNames={{
              weekendCurrent: "text-red-500 font-semibold",
              weekendOutside: "!text-red-500/70",
            }}
            components={{
              CaptionLabel: () => (
                <CalendarCaption
                  selectedMonth={selectedMonth}
                  currentYear={currentYear}
                  onYearClick={() => setShowYearModal(true)}
                />
              ),
            }}
            classNames={DAY_PICKER_CLASSES}
          />
        </div>
      </div>
      <ModalYears
        handleYearSelect={handleYearSelect}
        showYearModal={showYearModal}
        yearModalRef={yearModalRef}
        currentYear={currentYear}
      />
    </>
  );
};
