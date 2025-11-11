"use client";

import { SVGComponet } from "@/app/ui/SvgElements";

type InputProps = {
  value?: number;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputDefault = ({
  value = 15000,
  handleInputChange,
  handleBlur,
}: InputProps) => (
  <div
    className={`
    relative border-1 rounded-[8px] w-full border-gray-400 duration-300 focus-within:border-blue-500
    flex items-center p-1 pr-2 `}
  >
    <input
      type="text"
      id="Deposits"
      maxLength={57}
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      className={`relative text-[16px] p-3 w-full hover:bg-[#f4f6fa] rounded-[8px] duration-300`}
      autoComplete="off"
    />
    <div className="absolute text-blue-500 right-4 cursor-auto">
      <SVGComponet.Calculation />
    </div>
  </div>
);
