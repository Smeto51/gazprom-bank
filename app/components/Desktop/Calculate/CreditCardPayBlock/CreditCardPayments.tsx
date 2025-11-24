"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { InputCreditCard } from "./InputCreditCard";
import { useEffect, useRef, useState } from "react";
import { formatDateRu } from "@/app/utils/formatDateRu";

import { CalendarDatePicker } from "./Calendar/Calendar";
import { parseDate } from "./Calendar/utils/parsedate";
import Link from "next/link";
import {
  getDayWord,
  getMaxDate,
  getMinDate,
} from "./Calendar/utils/dateModifiers";
import { PurchaseAmountSlider } from "./PurchaseAmountSlider";

export const CreditCardPayments = () => {
  const [dateStartCard, setDateStartCard] = useState("");
  const [dateSend, setDateSend] = useState("");
  const [openPicker, setOpenPicker] = useState<"start" | "send" | null>(null);

  const startWrapperRef = useRef<HTMLDivElement | null>(null);
  const sendWrapperRef = useRef<HTMLDivElement | null>(null);

  const [startError, setStartError] = useState("");
  const [sendError, setSendError] = useState("");

  const START_MIN_DATE = getMinDate();
  const START_MAX_DATE = getMaxDate();

  const validateStartDate = (value: string) => {
    const d = parseDate(value);

    if (!d || isNaN(d.getTime())) {
      setStartError("");
      return;
    }
    if (d < START_MIN_DATE) {
      setStartError(
        "Выберите год в диапазоне от 2025 до 2026; Дата должна быть не раньше 31.05.2025"
      );
    } else {
      if (d > START_MAX_DATE) {
        setStartError(
          "Выберите год в диапазоне от 2025 до 2026; Дата должна быть не позже 31.05.2025"
        );
      } else setStartError("");
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

  const getDaysFromMonthToMonth = () => {
    const [day, month, year] = dateSend.split(".").map(Number);
    const selectedDate = new Date(year, month - 1, day);

    const [daySt, monthSt, yearSt] = dateStartCard.split(".").map(Number);
    const startDate = new Date(yearSt, monthSt - 1, daySt);

    const lastMonth = new Date(startDate);
    lastMonth.setMonth(startDate.getMonth() + 2);

    const lastDayOfLustMonth = new Date(
      lastMonth.getFullYear(),
      lastMonth.getMonth() + 1,
      0
    );
    const timeOff = lastDayOfLustMonth.getTime() - selectedDate.getTime();
    const dayCount = Math.ceil(timeOff / (1000 * 60 * 60 * 24));

    return dayCount + getDayWord(dayCount);
  };
  const getLastDate = () => {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const [, month, year] = dateStartCard.split(".").map(Number);
    const lastDate = new Date(year, month + 2, 0);

    return (
      "до " +
      lastDate.getDate() +
      " " +
      months[lastDate.getMonth()] +
      " " +
      lastDate.getFullYear()
    );
  };

  const getSendMaxDate = () => {
    const [, month, year] = dateStartCard.split(".").map(Number);
    return new Date(year, month + 2, 0);
  };

  return (
    <div className="lg:bg-[#000]/5  lg:pt-[124px] lg:pb-[124px] rounded-2xl ">
      <div
        className="lg:flex gap-4
        lg:pl-11 lg:pr-11"
      >
        <div className="relative bg-white p-[52px] max-lg:p-4 rounded-2xl lg:w-[calc(60%-8px)]">
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
              maxDate={getSendMaxDate()}
            />
          </div>
          <PurchaseAmountSlider
            dateSend={dateSend}
            minPayDate={getSendMaxDate()}
            dateMaturity={getLastDate()}
          />
        </div>
        <div className="relative lg:w-[calc(40%-8px)]  h-full max-lg:mx-4">
          <div
            className="p-[52px]  bg-white rounded-2xl
          max-lg:p-4 max-lg:bg-gray-100 "
          >
            <p className="text-[14px] text-gray-400">
              Первый беспроцентный период
            </p>
            <span className="text-[24px] font-semibold text-blue-500">
              {getDaysFromMonthToMonth()}
            </span>
            <p className="text-[14px] text-gray-400">
              Оплатите задолженность без&nbsp;%
            </p>
            <span className="text-[24px] font-semibold ">{getLastDate()}</span>
          </div>
          <div className="mt-2 bg-blue-600/90 rounded-[8px] hover:bg-blue-700 duration-300">
            <Link
              href="#"
              className="flex text-white justify-center px-4 py-2 "
            >
              Оформить карту
            </Link>
          </div>
          <p className="text-[14px] text-gray-400 lg:mt-5 max-lg:py-8 ">
            Расчет калькулятора предварительный. Персональные условия вы сможете
            узнать после оформления заявки
          </p>
        </div>
      </div>
    </div>
  );
};
