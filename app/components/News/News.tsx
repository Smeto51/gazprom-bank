"use client";

import Link from "next/link";
import { NEWS_ITEMS } from "./data/constant";
import { ArrowSVG } from "@/app/ui/SvgElements";

export const LastNews = () => {
  return (
    <div className="lg:pr-11 lg:pl-11 xl:max-w-7xl mx-auto">
      <h2
        className="text-[28px] font-semibold m-[32px]
        justify-center flex
        lg:text-[40px] lg:leading-12"
      >
        Будьте в курсе последних новостей
      </h2>
      <div
        className="p-4
      lg:flex lg:flex-wrap"
      >
        {NEWS_ITEMS.map((news, index) => (
          <div
            key={news.id}
            className={`p-6 bg-gray-100 rounded-2xl max-lg:mb-10
          lg:m-3 xl:basis-[calc(33%-24px)] xl:shrink-0 grow-0 h-full
          ${
            index === 2
              ? "lg:basis-[calc(100%)] lg:mb-10"
              : "lg:basis-[calc(50%-24px)]"
          }`}
          >
            <Link href={news.link} className="">
              <p className="font-normal text-[14px] leading-4 mb-6 text-[#6f6f6f]">
                {news.data}
              </p>
              <h3 className="text-[16px] xl:text-[20px] leading-5 lg:font-semibold">
                {news.desc}
              </h3>
              <div className="flex mt-6">
                Читать
                <div className=" h-3 w-6 mb-2 opacity-[.64]">
                  <ArrowSVG />
                </div>
              </div>
            </Link>
          </div>
        ))}
        <div className="lg:mx-auto lg:pb-12 lg:pt-10">
          <Link
            href="#"
            className="bg-black p-6 text-white rounded-[8px] flex items-center justify-center
          max-lg:w-full max-lg:rounded-2xl"
          >
            Все новости
          </Link>
        </div>
      </div>
    </div>
  );
};
