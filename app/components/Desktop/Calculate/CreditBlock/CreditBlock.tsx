"use client";

import { useEffect, useState } from "react";
import { InputMaskNumber } from "../InputMaskNumber";
import { rangeNewValue } from "../utils/formatedNumberRange";
import { InputRange } from "../InputRange";
import Link from "next/link";
import { AnimatedCounter } from "@/app/utils/AnimatedCounter";
import {
  calculateDifferentiatedPayment,
  getDynamicMonthlyRate,
} from "../utils/calculationAnnuityPayment";
import { getMonthWord } from "../utils/formatedNumberToText";

type PropsCreditBlock = {
  MIN: number;
  MAX: number;
  STEP: number;
  MIN_MONTH: number;
  MAX_MONTH: number;
  STEP_MONTH: number;
  defaultValue: number;
  children?: React.ReactNode;
  loverRate?: number;
};

export const CreditBlock = ({
  MIN,
  MAX,
  STEP,
  MIN_MONTH,
  MAX_MONTH,
  STEP_MONTH,
  defaultValue,
  children,
  loverRate = 0,
}: PropsCreditBlock) => {
  const [value, setValue] = useState(defaultValue);
  const [months, setMonths] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(245127);

  const handleAccept = (val: string | number) => {
    const startVal = Number(String(val).replace(/[^\d]/g, ""));
    let raw = startVal;
    setValue(raw);
    if (!raw || raw < MIN) {
      raw = MIN;
    }
    if (raw > MAX) {
      raw = MAX;
    }
    if (
      val.toString().length > 9 ||
      (val.toString().length > 7 && startVal > MAX)
    )
      setValue(raw);
    const currentStavka = getDynamicMonthlyRate(months, loverRate);
    const payment = calculateDifferentiatedPayment(raw, months, currentStavka);
    setMonthlyPayment(payment);
  };

  const handleBlurValue = () => {
    const valid = rangeNewValue(value, MIN, MAX);
    setValue(valid);

    const currentStavka = getDynamicMonthlyRate(months, loverRate);
    const payment = calculateDifferentiatedPayment(
      valid,
      months,
      currentStavka
    );
    setMonthlyPayment(payment);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    const clamped = rangeNewValue(next, MIN, MAX);
    setValue(clamped);
    const currentStavka = getDynamicMonthlyRate(months, loverRate);
    const payment = calculateDifferentiatedPayment(
      clamped,
      months,
      currentStavka
    );
    setMonthlyPayment(payment);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    const clamped = rangeNewValue(next, MIN_MONTH, MAX_MONTH);
    setMonths(clamped);
    const currentStavka = getDynamicMonthlyRate(months, loverRate);
    const payment = calculateDifferentiatedPayment(
      value,
      clamped,
      currentStavka
    );
    setMonthlyPayment(payment);
  };

  const handleAcceptDate = (val: string | number) => {
    const startVal = Number(String(val).replace(/[^\d]/g, ""));
    let raw = startVal;
    setMonths(raw);
    if (!raw || raw < MIN_MONTH) raw = MIN_MONTH;
    if (raw > MAX_MONTH) raw = MAX_MONTH;
    if (val.toString().length > 2 || startVal > raw) setMonths(raw);
    const currentStavka = getDynamicMonthlyRate(raw, loverRate);
    const payment = calculateDifferentiatedPayment(value, raw, currentStavka);
    setMonthlyPayment(payment);
  };

  const handleBlurMonths = () => {
    const valid = rangeNewValue(months, MIN_MONTH, MAX_MONTH);
    setMonths(valid);

    const currentStavka = getDynamicMonthlyRate(valid, loverRate);
    const payment = calculateDifferentiatedPayment(value, valid, currentStavka);
    setMonthlyPayment(payment);
  };

  useEffect(() => {
    const currentStavka = getDynamicMonthlyRate(months, loverRate);
    const payment = calculateDifferentiatedPayment(
      value,
      months,
      currentStavka
    );
    setMonthlyPayment(payment);
  }, [loverRate, value, months]);
  return (
    <div className="lg:bg-[#000]/5  lg:pt-[124px] lg:pb-[124px] rounded-2xl">
      <div
        className="lg:flex gap-4
        lg:pl-11 lg:pr-11 justify-center"
      >
        <div className="relative bg-white p-4 lg:p-[52px] rounded-2xl lg:w-[calc(60%-96px)]">
          <h3 className="text-[28px] font-semibold mb-5">Параметры кредита</h3>

          <InputMaskNumber
            value={value}
            handleAccept={handleAccept}
            handleBlur={handleBlurValue}
            nameInput="Сумма кредита"
            suffixChar="₽"
          />
          <div>
            <InputRange
              MIN={MIN}
              MAX={MAX}
              STEP={STEP}
              value={value}
              handleRangeChange={handleRangeChange}
            />
          </div>

          <InputMaskNumber
            value={months}
            handleAccept={handleAcceptDate}
            handleBlur={handleBlurMonths}
            nameInput="Срок кредита"
            suffixChar={getMonthWord(months)}
            inputLenght={4}
            isSetFixedSvg={true}
          />
          <div>
            <InputRange
              MIN={MIN_MONTH}
              MAX={MAX_MONTH}
              STEP={STEP_MONTH}
              value={months}
              handleRangeChange={handleDateRangeChange}
              typeText="month"
            />
          </div>
          {children}
        </div>
        <div className="relative lg:w-[calc(40%-96px)] h-full flex flex-col mx-4 max-lg:mb-10">
          <div className="lg:p-[40px] p-4 lg:bg-white rounded-2xl bg-gray-100">
            <h3 className="text-[24px] font-semibold">Ежемесячный платеж</h3>
            <p className="text-2xl font-bold mb-4 text-blue-500">
              <AnimatedCounter value={Math.trunc(monthlyPayment)} /> ₽
            </p>
          </div>
          <Link
            href="#"
            className="flex bg-blue-500 text-white w-full mt-4 rounded-[8px] py-4 justify-center"
          >
            Оформить кредит
          </Link>

          <Link
            href="#"
            className="flex bg-gray-200  w-full mt-4 rounded-[8px] py-4 justify-center"
          >
            Подробные условия
          </Link>
          <span className="mt-5 text-gray-600/70 text-sm">
            Расчет является предварительным
          </span>
        </div>
      </div>
    </div>
  );
};
