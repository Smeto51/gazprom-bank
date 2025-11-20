"use client";

import { useState } from "react";
import { InputMaskNumber } from "../InputMaskNumber";
import { rangeNewValue } from "../utils/formatedNumberRange";
import { InputRange } from "../InputRange";
import Link from "next/link";
import { AnimatedCounter } from "@/app/utils/AnimatedCounter";
import {
  calculateDifferentiatedPayment,
  getDynamicMonthlyRate,
} from "../utils/calculationAnnuityPayment";
const MIN = 10000;
const MAX = 7000000;
const STEP = 100;

const MIN_MONTH = 13;
const MAX_MONTH = 60;
const STEP_MONTH = 1;

export const CashLoanBlock = () => {
  const [value, setValue] = useState(7000000);
  const [months, setMonths] = useState(60);
  const [checkBox, setCheckBox] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState(245127);
  const [loverRate, setLoverRate] = useState(0);

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

  const handleClick = () => {
    let rate;
    setCheckBox(!checkBox);
    if (!checkBox) {
      rate = 0.15 / 12;
    } else rate = 0;

    setLoverRate(rate);
    const currentStavka = getDynamicMonthlyRate(months, rate);
    const payment = calculateDifferentiatedPayment(
      value,
      months,
      currentStavka
    );
    setMonthlyPayment(payment);
  };
  return (
    <div className="bg-[#000]/5  pt-[124px] pb-[124px] rounded-2xl ">
      <div
        className="flex gap-4
        lg:pl-11 lg:pr-11"
      >
        <div className="relative bg-white p-[52px] rounded-2xl lg:w-[calc(60%-8px)]">
          <h3 className="text-[28px] font-semibold mb-5">Параметры кредита</h3>

          <InputMaskNumber
            value={value}
            handleAccept={handleAccept}
            handleBlur={handleBlurValue}
            nameInput="Сумма кредита"
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
          <h3 className="text-[24px] font-semibold mb-5 mt-10">
            Дополнительные опции
          </h3>
          <div className="relative flex items-center gap-2">
            <span
              onClick={handleClick}
              className={`w-[36px] h-[20px] rounded-[96px] cursor-pointer duration-200 
              ${checkBox ? "bg-blue-600" : "bg-[#a5a5a5]"} `}
            />
            <span
              onClick={handleClick}
              className={`absolute h-3 w-3 left-0 rounded-[50%] bg-white duration-200 cursor-pointer
                ${checkBox ? "translate-x-5" : "translate-x-1"} `}
            />
            <span onClick={handleClick} className="cursor-pointer">
              Снизить процентную ставку
            </span>
            <div className="absolute right-0 top-0 bg-[#43bb3a] p-1 text-white rounded-[8px] w-10 text-[12px] justify-center flex">
              -15%
            </div>
          </div>

          <Link href="#" className="text-blue-600 text-sm mx-11">
            Подробнее
          </Link>
        </div>
        <div className="relative lg:w-[calc(40%-8px)] h-full flex flex-col">
          <div className="p-[40px] bg-white rounded-2xl">
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
