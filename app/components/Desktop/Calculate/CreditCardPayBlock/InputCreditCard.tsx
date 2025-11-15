"use client";

import { formatDateRu } from "@/app/utils/formatDateRu";
import { useState, useRef } from "react";
import { IMaskInput } from "react-imask";

type InputProps = {
  value?: string;
  handleInputChange?: (e: string) => void;
  handleBlur?: () => void;
  textInput?: string;
  svgElement?: React.ReactNode;
  onOpenCalendar?: () => void;
};

export const InputCreditCard = ({
  value = formatDateRu(new Date()),
  handleInputChange,
  handleBlur,
  textInput,
  svgElement,
  onOpenCalendar,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getNextInputPosition = (val: string) => {
    const firstUnderscore = val.indexOf("_");
    return firstUnderscore !== -1 ? firstUnderscore : val.length;
  };

  const onFocus = () => {
    setIsFocused(true);
    onOpenCalendar?.();
    if (!value) {
      handleInputChange?.("__.__.____");
    }

    setTimeout(() => {
      if (inputRef.current) {
        const position = value ? getNextInputPosition(value) : 0;
        inputRef.current.setSelectionRange(position, position);
      }
    }, 0);
  };

  const onClick = () => {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        const position = value ? getNextInputPosition(value) : 0;
        inputRef.current.setSelectionRange(position, position);
      }
    });
  };

  const onAccept = (value: string) => {
    if (handleInputChange) {
      handleInputChange(value === "__.__.____" ? "" : value);
    }
  };

  const onBlur = () => {
    setIsFocused(false);
    if (handleBlur) handleBlur();
    if (handleInputChange) {
      handleInputChange(value === "__.__.____" ? "" : value);
    }
  };

  const showMask = isFocused || value.length > 0;

  return (
    <div
      className={`relative border-1 rounded-[8px] w-full border-gray-400 duration-300 
      focus-within:border-blue-500 focus-within:text-blue-500 hover:text-blue-500
      flex items-center p-1 pr-2 `}
    >
      <IMaskInput
        mask="00.00.0000"
        placeholderChar="_"
        lazy={false}
        value={value}
        onAccept={onAccept}
        onFocus={onFocus}
        onClick={onClick}
        onBlur={onBlur}
        inputRef={inputRef}
        className={`relative text-[16px] p-3 w-full rounded-[8px] duration-300 pt-5 pb-1
       hover:bg-gray-100
        ${
          showMask
            ? "text-black caret-black"
            : "text-transparent caret-transparent"
        }`}
      />
      <p
        className={`absolute  left-[17px]  duration-200 transition-all pointer-events-none
        ${isFocused ? "text-blue-500" : "text-[#6f6f6f] "}
        ${
          value.length == 0 && !isFocused
            ? "text-[16px] top-4"
            : "text-[14px] top-1"
        }`}
      >
        {textInput}
      </p>

      <div onClick={onOpenCalendar} className="absolute right-4 cursor-auto">
        {svgElement}
      </div>
    </div>
  );
};
