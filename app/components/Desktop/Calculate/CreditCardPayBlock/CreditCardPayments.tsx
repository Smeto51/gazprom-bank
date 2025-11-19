"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { InputCreditCard } from "./InputCreditCard";
import { useEffect, useRef, useState } from "react";
import { formatDateRu } from "@/app/utils/formatDateRu";

import { CalendarDatePicker } from "./Calendar/Calendar";
import { parseDate } from "./Calendar/utils/parsedate";

export const CreditCardPayments = () => {
  const [dateStartCard, setDateStartCard] = useState("");
  const [dateSend, setDateSend] = useState("");
  const [openPicker, setOpenPicker] = useState<"start" | "send" | null>(null);

  const startWrapperRef = useRef<HTMLDivElement | null>(null);
  const sendWrapperRef = useRef<HTMLDivElement | null>(null);

  const [startError, setStartError] = useState("");
  const [sendError, setSendError] = useState("");
  const START_MIN_DATE = new Date(2025, 4, 31);
  const START_MAX_DATE = new Date(2026, 4, 31);

  const validateStartDate = (value: string) => {
    const d = parseDate(value);

    if (!d || isNaN(d.getTime())) {
      setStartError("");
      return;
    }

    if (d < START_MIN_DATE || d > START_MAX_DATE) {
      setStartError(
        "Выберите год в диапазоне от 2025 до 2026; Дата должна быть не раньше 31.05.2025"
      );
    } else {
      setStartError("");
    }
  };

  const validateSendDate = (value: string, startValue: string) => {
    const d = parseDate(value);
    const start = parseDate(startValue);

    if (!d || isNaN(d.getTime()) || !start || isNaN(start.getTime())) {
      setSendError("");
      return;
    }

    if (d < start) {
      setSendError("Дата должна быть не раньше даты получения карты");
    } else {
      setSendError("");
    }
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDateRu(today);
    setDateStartCard(formattedDate);
    setDateSend(formattedDate);
  }, []);

  const handleStartDateChange = (value: string) => {
    setDateStartCard(value);
    const parsed = parseDate(value);
    if (parsed && !isNaN(parsed.getTime())) {
      const formatted = formatDateRu(parsed);
      setDateSend(formatDateRu(parsed));
      validateSendDate(formatted, formatted);
    }
    validateStartDate(value);
  };
  const handleSendDateChange = (value: string) => {
    setDateSend(value);
    validateSendDate(value, dateStartCard);
  };
  const getMinDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 6);
    console.log("date = ", date);
    return date;
  };

  return (
    <div className="bg-[#000]/5  pt-[124px] pb-[124px] rounded-2xl ">
      <div
        className="flex gap-4
        lg:pl-11 lg:pr-11"
      >
        <div className="relative bg-white p-[52px] rounded-2xl lg:w-[calc(60%-8px)]">
          <h3 className="text-[28px] font-semibold mb-10">Параметры покупки</h3>
          <div ref={startWrapperRef} className="relative mb-4">
            <InputCreditCard
              value={dateStartCard}
              handleInputChange={handleStartDateChange}
              textInput="Дата получения карты"
              svgElement={<SVGComponet.Calendar />}
              onOpenCalendar={() => setOpenPicker("start")}
            />
            {startError && (
              <p className="mt-1 text-xs text-red-500">{startError}</p>
            )}
            <CalendarDatePicker
              openPicker={openPicker}
              pickerType="start"
              dateValue={dateStartCard}
              setDateValue={handleStartDateChange}
              setOpenPicker={setOpenPicker}
              containerRef={startWrapperRef}
              minDate={getMinDate()}
            />
          </div>

          <div ref={sendWrapperRef} className="relative mb-10">
            <InputCreditCard
              value={dateSend}
              handleInputChange={handleSendDateChange}
              textInput="Дата покупки"
              svgElement={<SVGComponet.Calendar />}
              onOpenCalendar={() => setOpenPicker("send")}
            />
            {sendError && (
              <p className="mt-1 text-xs text-red-500">{sendError}</p>
            )}
            <CalendarDatePicker
              openPicker={openPicker}
              pickerType="send"
              dateValue={dateSend}
              setDateValue={setDateSend}
              setOpenPicker={setOpenPicker}
              containerRef={sendWrapperRef}
              minDate={parseDate(dateStartCard)}
            />
          </div>

          <h3 className="text-[28px] font-semibold">Минимальные платежи</h3>
          <span>Сумма покупки</span>
          <div className="realtive text-gray-300 text-[14px]">
            <span>от 100 ₽</span>
            <span className="absolute right-3">до 1 000 000 ₽</span>
          </div>

          <p className="mt-10">График минимальных платежей</p>
        </div>
        <div className="lg:w-[calc(40%-8px)] mt-20"></div>
      </div>
    </div>
  );
};
