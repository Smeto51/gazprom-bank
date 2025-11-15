"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { InputCreditCard } from "./InputCreditCard";
import { useEffect, useRef, useState } from "react";
import { formatDateRu } from "@/app/utils/formatDateRu";

import { CalendarDatePicker } from "./Calendar/Calendar";

export const CreditCardPayments = () => {
  const [dateStartCard, setDateStartCard] = useState("");
  const [dateSend, setDateSend] = useState("");
  const [openPicker, setOpenPicker] = useState<"start" | "send" | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDateRu(today);
    setDateStartCard(formattedDate);
    setDateSend(formattedDate);
  }, []);

  return (
    <div className="bg-[#000]/5  pt-[124px] pb-[124px] rounded-2xl ">
      <div
        className="flex gap-4
        lg:pl-11 lg:pr-11"
      >
        <div className="relative bg-white p-[52px] rounded-2xl lg:w-[calc(60%-8px)]">
          <h3 className="text-[28px] font-semibold mb-10">Параметры покупки</h3>
          <div
            className="relative mb-4"
            ref={openPicker === "start" ? pickerRef : null}
          >
            <InputCreditCard
              value={dateStartCard}
              handleInputChange={setDateStartCard}
              textInput="Дата получения карты"
              svgElement={<SVGComponet.Calendar />}
              onOpenCalendar={() => setOpenPicker("start")}
            />
            <CalendarDatePicker
              openPicker={openPicker}
              dateStartCard={dateStartCard}
              setDateStartCard={setDateStartCard}
              pickerRef={pickerRef}
              setOpenPicker={setOpenPicker}
            />
          </div>

          <div
            className="relative mb-10"
            ref={openPicker === "send" ? pickerRef : null}
          >
            <InputCreditCard
              value={dateSend}
              handleInputChange={setDateSend}
              textInput="Дата покупки"
              svgElement={<SVGComponet.Calendar />}
              onOpenCalendar={() => setOpenPicker("send")}
            />
            <div
              className={`absolute left-0 top-full mt-2 z-20
              transition-all duration-200 
              ${
                openPicker === "send"
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"
              }`}
            ></div>
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
