"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { InputDefault } from "./InputDefault";
import Link from "next/link";
import { DurationDepositsBlock, itemsDepositsBlock } from "./data/const";
import { AnimatedCounter } from "@/app/utils/AnimatedCounter";

export const DepositsBlock = () => {
  const [activeItem, setActivItem] = useState(0);
  const [depositValue, setDepositValue] = useState(15000);
  const [activePeriod, setActivePeriod] = useState(0);
  const [income, setIncome] = useState(580.5);
  const [rate, setRate] = useState("15,5");

  const calculateIncome = (
    value: number,
    currentRate: string,
    currentPeriod: number
  ) => {
    const duration =
      DurationDepositsBlock[currentPeriod].period === "мес"
        ? DurationDepositsBlock[currentPeriod].duration
        : DurationDepositsBlock[currentPeriod].duration * 12;
    const percent =
      ((parseFloat(currentRate.replace(",", ".")) / 12) * duration) / 100;
    return Number(value) * percent;
  };

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
      const newRate = DurationDepositsBlock[index].rate;
      setActivePeriod(index);
      setRate(newRate);
      setIncome(calculateIncome(depositValue, newRate, index));
    },
    [depositValue]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (/^\d*$/.test(value)) {
        const numValue = Number(value);
        setDepositValue(numValue);
        setIncome(calculateIncome(numValue, rate, activePeriod));
      }
    },
    [rate, activePeriod]
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
                  <span className="text-blue-500">{rate}%</span>
                </div>

                <span className="flex text-[14px] text-black/50">
                  Вы можете увеличить сумму вклада, ставка не изменится
                </span>
              </>
            ) : (
              <>
                <div className=" text-2xl font-semibold leading-0 pt-5">
                  Ставка — <span className="text-blue-500">{rate}%</span>
                </div>

                <button
                  onClick={() => {
                    setActivePeriod(1);
                    setRate(DurationDepositsBlock[1].rate);
                    setIncome(
                      calculateIncome(
                        depositValue,
                        DurationDepositsBlock[1].rate,
                        1
                      )
                    );
                  }}
                  type="button"
                  className="flex text-[14px] text-blue-500 cursor-pointer hover:text-blue-700"
                >
                  Получить максимальную ставку
                </button>
              </>
            )}

            <InputDefault
              value={depositValue}
              handleInputChange={handleInputChange}
              handleBlur={handleBlur}
            />
            <div className="text-[14px] text-gray-500 -mt-3">
              {activeItem === 4 ? "от 300 000 ₽" : "от 15 000 ₽"}
            </div>
            <div>Я клиент Газпромбанка</div>
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
              <p className="text-5xl font-bold text-blue-500 mb-4">{rate}%</p>
              <p className="text-gray-500">Доход по повышенной ставке</p>
              <p className="text-2xl font-bold mb-4">
                <AnimatedCounter value={Math.trunc(income)} /> ₽
              </p>
              <p className="text-gray-500">Сумма в конце срока</p>
              <p className="text-2xl font-bold ">
                <AnimatedCounter value={Math.trunc(income + depositValue)} /> ₽
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
