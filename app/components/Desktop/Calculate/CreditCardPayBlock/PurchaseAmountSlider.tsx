"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { useState } from "react";
import { IMaskInput } from "react-imask";
const MIN = 100;
const MAX = 1000000;
const STEP = 100;

export const PurchaseAmountSlider = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(40000);
  const percent = ((value - MIN) / (MAX - MIN)) * 100;

  const rangeNewValue = (num: number) => {
    if (Number.isNaN(num)) return MIN;
    return Math.min(MAX, Math.max(MIN, num));
  };

  const handleAccept = (val: string | number) => {
    let num: number;
    if (typeof val === "number") {
      num = val;
    } else if (typeof val === "string") {
      num = Number(val.replace(/[^\d]/g, ""));
    } else {
      return;
    }
    setValue(rangeNewValue(num));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    const clamped = rangeNewValue(next);
    setValue(clamped);
  };

  return (
    <div className="relative">
      <div>
        <h3 className="text-[28px] font-semibold mb-5">Минимальные платежи</h3>
        <p
          className={`duration-200 transition-colors
        ${isFocused ? "text-blue-500" : "text-gray-700"}`}
        >
          Сумма покупки
        </p>
        <IMaskInput
          className="text-2xl font-semibold  outline-none w-full"
          mask={Number}
          scale={0}
          thousandsSeparator=" "
          min={MIN}
          max={MAX}
          autofix={true}
          value={value.toString()}
          onAccept={handleAccept}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="button"
          className={`absolute  hover:text-blue-500 duration-200 rounded-full transition-colors w-8 h-10 right-0
            ${isFocused ? "text-blue-500" : "text-gray-500"}`}
        >
          <SVGComponet.Pen />
        </button>
      </div>
      <div>
        <div>
          <div className="relative mt-2">
            <div className="absolute inset-0 rounded-full bg-gray-200 h-2" />
            <div
              className="absolute inset-y-4 left-0 top-0 rounded-full bg-blue-500 cursor-pointer"
              style={{ width: `${percent}%` }}
            />

            <input
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={value}
              onChange={handleRangeChange}
              className="relative w-full appearance-none bg-transparent items-center bottom-1.5 cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-white
                       [&::-webkit-slider-thumb]:border
                       [&::-webkit-slider-thumb]:border-blue-500
                       [&::-webkit-slider-thumb]:shadow
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:w-4
                       [&::-moz-range-thumb]:h-4
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-white
                       [&::-moz-range-thumb]:border
                       [&::-moz-range-thumb]:border-blue-500
                       [&::-moz-range-thumb]:cursor-pointer
                       "
            />
          </div>
        </div>
      </div>
      <div className="realtive text-gray-400 text-[14px]">
        <div className="mt-1">
          <span className="">от 100 ₽</span>
          <span className="absolute right-3">до 1 000 000 ₽</span>
        </div>
      </div>
    </div>
  );
};
