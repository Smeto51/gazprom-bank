"use client";

import Image from "next/image";
import { TitleLinkCashBack } from "./TitleLink";
import { TitleBannerInfoCashBack } from "./TitleBannerInfo";

export const TitleBannerProduct = () => {
  return (
    <div className="relative pl-11 pr-11 xl:mt-10">
      <div
        className="xl:bg-blue-600 xl:flex xl:rounded-2xl xl:w-[calc(100vw-88px)] xl:justify-center
        xl:relative xl:left-1/2 xl:-translate-x-1/2 transition-all duration-300 xl:max-h-[492px]"
      >
        <div className="relative xl:w-7xl duration-300  xl:ml-11 ">
          <TitleLinkCashBack />
          <div className="flex flex-wrap max-xl:flex-col xl:flex-row xl:gap-10  duration-300 ">
            <div className="flex flex-col max-xl:items-center gap-4 flex-1">
              <button className="bg-black text-white p-2 rounded-lg max-w-fit mt-5 cursor-pointer">
                Дебетовая карта «Мир»
              </button>

              <h1 className="text-[44px] leading-12 font-bold max-w-[632px] max-xl:mx-auto max-xl:text-center xl:text-white xl:text-left">
                100% кэшбэк в супермаркетах
              </h1>

              <button className="bg-black text-white px-4 py-5 rounded-lg mt-10 xl:bg-white xl:text-black xl:mt-auto xl:mb-33 xl:max-w-fit cursor-pointer">
                Оформить карту
              </button>
            </div>

            <div className="max-xl:bg-blue-600 rounded-2xl mt-10 xl:mt-0 xl:flex-none lg:order-3 xl:order-2 xl:-translate-y-26">
              <div className="relative mx-auto xl:mr-0 w-full max-w-[510px] h-[352px] xl:w-[712px] xl:h-[492px] duration-300">
                <Image
                  fill
                  alt="Изображение: Кэшбэк 100%"
                  src="/cashback/TitleBannerProduct/cash100.png"
                  className="duration-300 object-contain"
                  sizes="(max-width: 768px) 100vw, 712px"
                />
              </div>
            </div>
            <div className="lg:order-2 xl:order-3 lg:w-full max-lg:mt-6 xl:-translate-y-23">
              <TitleBannerInfoCashBack />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:mt-60" />
    </div>
  );
};
