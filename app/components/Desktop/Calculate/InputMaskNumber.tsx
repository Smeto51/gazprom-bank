"use client";

import { SVGComponet } from "@/app/ui/SvgElements";
import { useCallback, useEffect, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import { getWordYearMonth } from "./utils/formatedNumberToText";

type PropsInputMaskNumber = {
  value: number;
  handleAccept: (val: string | number) => void;
  nameInput: string;
  handleBlur?: () => void;
  suffixChar?: string;
  isSetFixedSvg?: boolean;
  inputLenght?: number;
  widthInput?: string;
};
export const InputMaskNumber = ({
  value,
  handleAccept,
  nameInput,
  handleBlur,
  suffixChar,
  inputLenght = 15,
  isSetFixedSvg = false,
}: PropsInputMaskNumber) => {
  const [isFocused, setIsFocused] = useState(false);
  const mirrorRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suffixRef = useRef<HTMLInputElement | null>(null);
  const [suffixLeft, setSuffixLeft] = useState<number | null>(null);
  const [suffixRight, setSuffixRight] = useState<number | null>(null);
  const formattedValue =
    value !== undefined && value !== null ? value.toLocaleString("ru-RU") : "";

  const updateRublePos = useCallback(() => {
    const mirror = mirrorRef.current;
    if (!mirror) return;

    const textWidthLeft = mirror.offsetWidth;
    const gap = 8;
    setSuffixLeft(textWidthLeft + gap);

    const suffix = suffixRef.current;
    if (!suffix || !isSetFixedSvg) return;
    const textWidthRight = suffix.offsetWidth;

    setSuffixRight(textWidthLeft + textWidthRight + gap + 16);
  }, [isSetFixedSvg]);

  useEffect(() => {
    updateRublePos();
  }, [formattedValue, isFocused, updateRublePos]);

  useEffect(() => {
    const mirror = mirrorRef.current;
    if (!mirror) return;

    let ro: ResizeObserver | null = null;

    try {
      ro = new ResizeObserver(() => updateRublePos());
      ro.observe(mirror);
    } catch {
      window.addEventListener("resize", updateRublePos);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", updateRublePos);
    };
  }, [updateRublePos]);

  return (
    <div className={`relative`}>
      <p
        className={`duration-200 transition-colors
            ${isFocused ? "text-blue-500" : "text-gray-700"}`}
      >
        {nameInput}
      </p>
      <div>
        <span
          ref={mirrorRef}
          className={`invisible absolute left-0 top-0 text-2xl font-semibold whitespace-nowrap pointer-events-none
          select-none h-0 overflow-visible`}
        >
          {formattedValue}
        </span>
      </div>
      {suffixRight !== null && isSetFixedSvg && (
        <div>
          <button
            type="button"
            className={`absolute  hover:text-blue-500 duration-200 rounded-full transition-colors w-8 h-10 
                ${isFocused ? "text-blue-500" : "text-gray-500"}
                `}
            style={{ left: suffixRight }}
          >
            <SVGComponet.Pen />
          </button>
          <span className="absolute right-0 text-gray-400 font-semibold text-[18px]">
            {getWordYearMonth(value)}
          </span>
        </div>
      )}

      <IMaskInput
        inputRef={(e: HTMLInputElement) => {
          inputRef.current = e;
        }}
        className="text-2xl font-semibold  outline-none w-full"
        mask={Number}
        maxLength={inputLenght}
        scale={0}
        thousandsSeparator=" "
        value={formattedValue}
        onAccept={handleAccept}
        onFocus={() => {
          setIsFocused(true);
          setSuffixLeft(null);
          setSuffixRight(suffixLeft);
        }}
        onBlur={() => {
          setIsFocused(false);
          handleBlur?.();
          setTimeout(updateRublePos, 0);
        }}
      />

      {!isSetFixedSvg && (
        <button
          type="button"
          className={`absolute  hover:text-blue-500 duration-200 rounded-full transition-colors w-8 h-10 right-0
                ${isFocused ? "text-blue-500" : "text-gray-500"}
                `}
        >
          <SVGComponet.Pen />
        </button>
      )}

      {!isFocused && suffixLeft !== null && (
        <span
          ref={suffixRef}
          className="absolute top-6 select-none pointer-events-none text-2xl font-semibold"
          style={{ left: suffixLeft }}
        >
          {suffixChar}
        </span>
      )}
    </div>
  );
};
