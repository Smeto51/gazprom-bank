"use client";

import { useState } from "react";

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
      <span
        className={`absolute p-3 mt-5.5 transform transition-all duration-400 -z-1  
            ${
              isInputFocused || value.length > 0
                ? "-translate-y-5 text-blue-500 text-[14px]"
                : "text-gray-500 text-[16px]"
            }`}
      >
        Поиск по городам
      </span>
      <input
        type="text"
        id="city"
        className="w-[100%] border border-gray-300 rounded-[5px] mt-4 h-14 pl-3 p-7 pb-2 text-[16px] focus:outline-none focus:border-blue-500 "
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        value={value}
        onChange={(city) => onChange(city.target.value)}
        autoComplete="off"
      />
    </div>
  );
};

export default CitySearchInput;
