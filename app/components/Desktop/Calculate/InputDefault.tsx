"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { formatNumber } from "@/app/utils/AnimatedCounter";
import { useState } from "react";

type InputProps = {
  value?: number;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: () => void;
  textInput?: string;
};

export const InputDefault = ({
  value = 15000,
  handleInputChange,
  handleBlur,
  textInput,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const displayValue = isFocused
    ? formatNumber(value)
    : `${formatNumber(value)} ₽`;

  const onFocus = () => {
    setIsFocused(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!handleInputChange) return;

    const raw = e.target.value.replace(/\s/g, "").replace("₽", "");
    const clonedEvent = {
      ...e,
      target: {
        ...e.target,
        value: raw,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(clonedEvent);
  };
  const onBlur = () => {
    setIsFocused(false);
    if (handleBlur) handleBlur();
  };
  return (
    <div
      className={`
    relative border-1 rounded-[8px] w-full border-gray-400 duration-300 focus-within:border-blue-500
    flex items-center p-1 pr-2  `}
    >
      <input
        type="text"
        id="Deposits"
        maxLength={11}
        value={displayValue}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`relative text-[16px] p-3 w-full rounded-[8px] duration-300 pt-5 pb-1
          hover:bg-gray-100 
           `}
        autoComplete="off"
      />
      <p
        className={`absolute text-[14px] left-[17px] top-1  duration-200
        ${isFocused ? "text-blue-500" : "text-[#6f6f6f] "}`}
      >
        {textInput}
      </p>

      <div className="absolute text-blue-500 right-4 cursor-auto">
        <SVGComponet.Calculation />
      </div>
    </div>
  );
};
