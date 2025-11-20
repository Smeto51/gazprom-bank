"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { useState } from "react";
import { IMaskInput } from "react-imask";

type PropsInputMaskNumber = {
  value: number;
  handleAccept: (val: string | number) => void;
  nameInput: string;
  handleBlur?: () => void;
};
export const InputMaskNumber = ({
  value,
  handleAccept,

  nameInput,
  handleBlur,
}: PropsInputMaskNumber) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative">
      <p
        className={`duration-200 transition-colors
            ${isFocused ? "text-blue-500" : "text-gray-700"}`}
      >
        {nameInput}
      </p>
      <IMaskInput
        className="text-2xl font-semibold  outline-none w-full"
        mask={Number}
        scale={0}
        thousandsSeparator=" "
        //min={MIN}
        //max={MAX}
        //autofix={true}
        value={value.toLocaleString("ru-RU")}
        onAccept={handleAccept}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          handleBlur?.();
        }}
      />
      <button
        type="button"
        className={`absolute  hover:text-blue-500 duration-200 rounded-full transition-colors w-8 h-10 right-0
                ${isFocused ? "text-blue-500" : "text-gray-500"}`}
      >
        <SVGComponet.Pen />
      </button>
    </div>
  );
};
