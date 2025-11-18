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
      setDateSend(formatDateRu(parsed));
    }
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
              handleInputChange={setDateSend}
              textInput="Дата покупки"
              svgElement={<SVGComponet.Calendar />}
              onOpenCalendar={() => setOpenPicker("send")}
            />
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
