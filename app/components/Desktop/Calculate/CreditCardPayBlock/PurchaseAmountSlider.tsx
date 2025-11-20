"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { useState } from "react";
import { InputRange } from "../InputRange";
import { InputMaskNumber } from "../InputMaskNumber";
import {
  formatedNumberRange,
  rangeNewValue,
} from "../utils/formatedNumberRange";
const MIN = 100;
const MAX = 1000000;
const STEP = 100;

const MONTH = [
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

type PropPurchaseAmount = {
  dateSend: string;
  minPayDate: Date;
  dateMaturity: string;
};
export const PurchaseAmountSlider = ({
  dateSend,
  minPayDate,
  dateMaturity,
}: PropPurchaseAmount) => {
  const [isOpenGraphic, setIsOpenGraphic] = useState(false);
  const [value, setValue] = useState(40000);

  const getDayAndMonthWord = (): string => {
    const [day, month, year] = dateSend.split(".").map(Number);
    const dm = new Date(year, month, day);
    if (!dm || isNaN(dm.getMonth())) return "";

    return dm.getDay() + " " + MONTH[dm.getMonth()];
  };

  const handleAccept = (val: string | number) => {
    setValue(formatedNumberRange(val, MIN, MAX));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    const clamped = rangeNewValue(next, MIN, MAX);
    setValue(clamped);
  };

  const formatDateToWord = (date: Date): string => {
    return (
      "до " +
      date.getDate() +
      " " +
      MONTH[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  };
  return (
    <div className="relative">
      <div>
        <h3 className="text-[28px] font-semibold mb-5">Минимальные платежи</h3>
        <InputMaskNumber
          value={value}
          handleAccept={handleAccept}
          nameInput="Сумма покупки"
        />
      </div>
      <div>
        <div>
          <InputRange
            MIN={MIN}
            MAX={MAX}
            STEP={STEP}
            value={value}
            handleRangeChange={handleRangeChange}
          />
        </div>
      </div>

      <div className="relative text-blue-500 ">
        <p
          onClick={() => {
            setIsOpenGraphic(!isOpenGraphic);
          }}
          className="mt-10 text-sm cursor-pointer"
        >
          График минимальных платежей
        </p>

        <button
          type="button"
          onClick={() => {
            setIsOpenGraphic(!isOpenGraphic);
          }}
          className={`flex absolute scale-5 inset-0 items-center translate-x-1/2 cursor-pointer duration-300
            ${isOpenGraphic ? "rotate-180" : "rotate-0"}`}
        >
          <SVGComponet.ArrowTop />
        </button>
      </div>
      <div
        className={`relative top-8 duration transition-opacity ${
          isOpenGraphic ? "opacity-100" : "opacity-0 h-0 "
        }`}
      >
        <span className="text-[12px] text-gray-400">
          {getDayAndMonthWord()}
        </span>
        <div className="relative mb-2">
          <p className="text-sm">Покупка</p>
          <span className="absolute top-0 right-0 font-semibold">
            – {value.toLocaleString("ru-Ru")} ₽
          </span>
          <div className="inset-0 rounded-full bg-gray-200 h-0.5 mt-3" />
        </div>
        <span className="text-[12px] text-gray-400">
          {formatDateToWord(minPayDate)}
        </span>
        <div className="relative mb-2">
          <p className="text-sm">Минимальный платеж</p>
          <span className="absolute top-0 right-0 font-semibold">
            {(value * 0.09).toLocaleString("ru-Ru")} ₽
          </span>
          <div className="inset-0 rounded-full bg-gray-200 h-0.5 mt-3" />
        </div>
        <span className="text-[12px] text-gray-400">{dateMaturity}</span>
        <div className="relative">
          <span className="text-sm">Погашение задолженности</span>
          <span className="absolute top-0 right-0 font-semibold">
            {(value - value * 0.09).toLocaleString("ru-Ru")} ₽
          </span>
        </div>

        <div className="mb-10" />
      </div>
    </div>
  );
};
