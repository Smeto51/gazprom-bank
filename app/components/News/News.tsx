"use client";

import Link from "next/link";
import { NEWS_ITEMS } from "./data/constant";
import { ArrowSVG } from "@/app/ui/SvgElements";

export const LastNews = () => {
  return (
    <>
      <h2 className="text-[28px] font-semibold m-[32px]">
        Будьте в курсе последних новостей
      </h2>
      <div className="p-4">
        {NEWS_ITEMS.map((news) => (
          <div key={news.id} className="p-6 bg-gray-100 rounded-2xl mb-10">
            <Link href={news.link} className="">
              <p className="font-normal text-[14px] leading-4 mb-6 text-[#6f6f6f]">
                {news.data}
              </p>
              <h3 className="text-[16px] leading-5">{news.desc}</h3>
              <div className="flex mt-6">
                Читать
                <div className=" h-3 w-6 mb-2 opacity-[.64]">
                  <ArrowSVG />
                </div>
              </div>
            </Link>
          </div>
        ))}
        <Link
          href="#"
          className="bg-black p-6 text-white rounded-2xl w-full flex items-center justify-center"
        >
          Все новости
        </Link>
      </div>
    </>
  );
};
