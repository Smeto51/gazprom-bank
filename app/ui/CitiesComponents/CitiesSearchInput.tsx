"use client";

import { useState } from "react";
import { Magnifier } from "../SvgElements";

type CityInputProps = {
  value: string;
  onChange: (value: string) => void;
};
const CitySearchInput = ({ value, onChange }: CityInputProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="">
      <h1 className="font-[Arial, sans-serif] text-[28px] font-semibold ">
        Выберите город
      </h1>
      <div
        className="
          relative flex border border-gray-300 rounded-[8px] duration-300 
        focus-within:border-blue-500 h-14 p-1 items-center"
      >
        <span
          className={`absolute left-4 transform transition-all duration-400 pointer-events-none z-10
            ${
              isInputFocused || value.length > 0
                ? "text-[14px] -translate-y-5 mt-3"
                : "text-gray-500 text-[16px]"
            }
            ${isInputFocused ? "text-blue-500" : "text-gray-500"}
           `}
        >
          Поиск по городам
        </span>
        <input
          type="text"
          id="city"
          className="relative w-full h-full px-3 pt-4 text-[16px] focus:outline-none focus:border-blue-500 hover:bg-[#f4f6fa] rounded-[8px]"
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          value={value}
          onChange={(city) => onChange(city.target.value)}
          autoComplete="off"
        />
        <div className="absolute text-gray-400 right-4">
          <Magnifier />
        </div>
      </div>
    </div>
  );
};

export default CitySearchInput;
