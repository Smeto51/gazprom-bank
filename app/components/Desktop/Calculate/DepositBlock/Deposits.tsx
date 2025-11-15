"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { InputDeposit } from "../DepositBlock/InputDeposit";
import Link from "next/link";
import { DurationDepositsBlock, itemsDepositsBlock } from "./data/const";
import { AnimatedCounter, formatNumber } from "@/app/utils/AnimatedCounter";

export const DepositsBlock = () => {
  const [activeItem, setActivItem] = useState(0);
  const [depositValue, setDepositValue] = useState(15000);
  const [gpbDepositValue, setGpbDepositValue] = useState(0);
  const [activePeriod, setActivePeriod] = useState(0);
  const [income, setIncome] = useState(580.5);
  const [baseIncome, setBaseIncome] = useState(0);
  const [rate, setRate] = useState(15.5);
  const [checkBox, setCheckBox] = useState(false);

  const calculateIncome = (
    value: number,
    currentRate: number,
    currentPeriod: number
  ) => {
    const duration =
      DurationDepositsBlock[currentPeriod].period === "мес"
        ? DurationDepositsBlock[currentPeriod].duration
        : DurationDepositsBlock[currentPeriod].duration * 12;

    const percent = ((currentRate / 12) * duration) / 100;
    return Number(value) * percent;
  };

  const calculationRate = useCallback(
    (
      value: number,
      newGpbValue: number,
      rate?: number,
      per?: number,
      checkbox?: boolean
    ) => {
      const index = per == undefined ? activePeriod : per;
      const maxRate = rate ? rate : DurationDepositsBlock[index].rate;
      const baseRate = (rate ? rate : DurationDepositsBlock[index].rate) - 1;
      let newRate = (1 / value) * -newGpbValue;
      if (rate) {
        newRate = newRate + rate;
      } else {
        newRate = newRate + DurationDepositsBlock[index].rate;
      }
      newRate = Number(newRate.toFixed(2));

      const newCheck = checkbox === undefined ? checkBox : !checkBox;
      setRate(newCheck ? newRate : maxRate);
      setIncome(
        calculateIncome(newCheck ? value - newGpbValue : value, maxRate, index)
      );

      if (newCheck) {
        setBaseIncome(calculateIncome(newGpbValue, baseRate, index));
      } else setBaseIncome(0);

      return newRate;
    },
    [activePeriod, checkBox]
  );

  const handleClickPage = useCallback(
    (index: number) => {
      setActivItem(index);
      if (index === 4) {
        const newValue = 300000;
        setDepositValue(newValue);
        setIncome(calculateIncome(newValue, rate, activePeriod));
      }
    },
    [rate, activePeriod]
  );

  const handleClickPeriod = useCallback(
    (index: number) => {
      calculationRate(
        depositValue,
        gpbDepositValue,
        DurationDepositsBlock[index].rate,
        index
      );

      setActivePeriod(index);
    },
    [depositValue, calculationRate, gpbDepositValue]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (/^\d*$/.test(value)) {
        const numValue = Number(value) > 100000000 ? 100000000 : Number(value);
        const newGpbValue =
          gpbDepositValue > numValue ? numValue : gpbDepositValue;
        calculationRate(numValue, newGpbValue);
        setGpbDepositValue(newGpbValue);
        setDepositValue(numValue);
      }
    },
    [gpbDepositValue, calculationRate]
  );

  const handleInputGPBChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
        const numValue =
          Number(value) > depositValue ? depositValue : Number(value);
        setGpbDepositValue(numValue);
        calculationRate(depositValue, numValue);
      }
    },
    [depositValue, calculationRate]
  );

  const handleBlur = useCallback(() => {
    const minValue = activeItem === 4 ? 300000 : 15000;
    if (depositValue < minValue) {
      setDepositValue(minValue);
      setIncome(calculateIncome(minValue, rate, activePeriod));
    }
  }, [depositValue, activeItem, rate, activePeriod]);

  return (
    <div className="bg-[#000]/5  pt-[124px] pb-[124px] rounded-2xl ">
      <h2 className="text-3xl font-semibold items-center my-auto justify-center flex -translate-y-2/2">
        Вклад «Новые деньги»
      </h2>
      <div
        className="flex gap-4
        lg:pl-11 lg:pr-11"
      >
        <div className="bg-white p-[52px] rounded-2xl lg:w-[calc(60%-8px)]">
          <div className="bg-white  flex flex-col flex-wrap gap-4  transition-all ">
            <div className="flex gap-4 flex-wrap ">
              {itemsDepositsBlock.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleClickPage(index)}
                  className={` rounded-full px-4 py-2 duration-200 ease-in-out cursor-pointer
                  ${
                    activeItem === index
                      ? "bg-black text-white"
                      : "bg-[#0a0a0b14] hover:bg-[#0a0a0b14]/150"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            {activePeriod === 1 ? (
              <>
                <div className=" text-2xl font-semibold leading-0 pt-5">
                  Ставка максимальная —{" "}
                  <span className="text-blue-500">
                    {rate.toString().replace(".", ",")}%
                  </span>
                </div>

                <span className="flex text-[14px] text-black/50">
                  Вы можете увеличить сумму вклада, ставка не изменится
                </span>
              </>
            ) : (
              <>
                <div className=" text-2xl font-semibold leading-0 pt-5">
                  Ставка —{" "}
                  <span className="text-blue-500">
                    <AnimatedCounter value={rate} isFloor={false} /> %
                  </span>
                </div>

                <button
                  onClick={() => {
                    calculationRate(
                      depositValue,
                      gpbDepositValue,
                      DurationDepositsBlock[1].rate
                    );
                    setActivePeriod(1);
                  }}
                  type="button"
                  className="flex text-[14px] text-blue-500 cursor-pointer hover:text-blue-700"
                >
                  Получить максимальную ставку
                </button>
              </>
            )}

            <InputDeposit
              value={depositValue}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
              textInput={"Сумма вклада"}
            />
            <div className="text-[14px] text-gray-500 -mt-3">
              {activeItem === 4 ? "от 300 000 ₽" : "от 15 000 ₽"}
            </div>
            <div
              className="flex relative items-center gap-2
              transition-all "
            >
              <span
                className={`block flex-shrink w-[36px] h-[20px] rounded-[96px] cursor-pointer
                  duration-200 
              ${checkBox ? "bg-blue-600" : "bg-[#a5a5a5]"} `}
                onClick={() => {
                  setCheckBox(!checkBox);
                  calculationRate(
                    depositValue,
                    gpbDepositValue,
                    undefined,
                    undefined,
                    checkBox
                  );
                }}
              />
              <span
                className={`absolute h-3 w-3 left-0 rounded-[50%] bg-white duration-200 cursor-pointer
                ${checkBox ? "translate-x-5" : "translate-x-1"} `}
                onClick={() => {
                  setCheckBox(!checkBox);
                  calculationRate(
                    depositValue,
                    gpbDepositValue,
                    undefined,
                    undefined,
                    checkBox
                  );
                }}
              />
              <span>Я клиент Газпромбанка</span>
            </div>
            {checkBox && (
              <div>
                <div className="bg-gray-200/90 p-4 rounded-2xl py-6 mb-5">
                  <p>
                    Если вы собираетесь положить на вклад деньги, которые лежат
                    в банке больше 30 дней, укажите сумму
                  </p>
                </div>
                <InputDeposit
                  value={gpbDepositValue}
                  handleInputChange={handleInputGPBChange}
                  textInput={"Сумма со счетов Газпромбанка"}
                />
                <div className="relative flex mt-2">
                  <div className="text-[14px] text-gray-500 ">от 0 ₽</div>
                  <div className="absolute text-[14px] text-gray-500 right-0">
                    до {formatNumber(depositValue)} ₽
                  </div>
                </div>
              </div>
            )}
            <h3 className="text-[24px] font-semibold">Срок</h3>
            <div className="flex gap-4 transition-all flex-wrap cursor-pointer">
              {DurationDepositsBlock.map((items, index) => (
                <div
                  onClick={() => handleClickPeriod(index)}
                  key={index}
                  className={` rounded-2xl px-3 py-1 duration-200 cursor-po
              ${
                activePeriod === index
                  ? "bg-black text-white"
                  : "bg-gray-200/90 hover:bg-gray-300"
              }`}
                >
                  {items.duration} {items.period}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-[calc(40%-8px)]">
          <div className="bg-white p-[52px] rounded-2xl">
            <div className=" flex flex-col  gap-4  transition-all leading-0">
              <p className="text-gray-500 l-">Ставка</p>
              <p className="text-5xl font-bold text-blue-500 mb-4">
                <AnimatedCounter value={rate} isFloor={false} /> %
              </p>
              <p className="text-gray-500">Доход по повышенной ставке</p>
              <p className="text-2xl font-bold mb-4">
                <AnimatedCounter value={Math.trunc(income)} /> ₽
              </p>
              <div className={`${baseIncome < 1 ? "hidden" : ""}`}>
                <p className="text-gray-500">Доход по базовой ставке</p>
                <p className="text-2xl font-bold mb-4 mt-3">
                  <AnimatedCounter value={Math.trunc(baseIncome)} /> ₽
                </p>
              </div>

              <p className="text-gray-500">Сумма в конце срока</p>
              <p className="text-2xl font-bold ">
                <AnimatedCounter
                  value={Math.trunc(income + depositValue + baseIncome)}
                />{" "}
                ₽
              </p>
            </div>
          </div>
          <div className="mt-2 bg-blue-600/90 rounded-[8px] hover:bg-blue-700 duration-300">
            <Link
              href="#"
              className="flex text-white justify-center px-4 py-2 "
            >
              Подробнее
            </Link>
          </div>

          <p className="text-[14px] text-gray-500 mt-6">
            Расчет является предварительным
          </p>
        </div>
      </div>
    </div>
  );
};
