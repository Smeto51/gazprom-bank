"use client";

import Image from "next/image";
import { GazpromBankSvg, SVGComponet } from "./SvgElements";
import Link from "next/link";
import Cities from "./Cities";
import { FOOTER_INFO, FOOTER_ITEMS } from "./data/constant";
import { useState } from "react";

export const Footer = () => {
  const [showAll, setShowAll] = useState(false);
  const headItems = FOOTER_ITEMS.slice(0, 5);
  const tailItems = FOOTER_ITEMS.slice(5);
  return (
    <footer
      className="p-4 bg-gray-200/60 rounded-t-2xl space-y-8 mt-6  
    "
    >
      <div className="max-[1023px]:max-w-3xl w-full mx-auto px-4">
        <div className="text-blue-500">
          <GazpromBankSvg />
        </div>
        <div className="flex">
          <div className="-ml-4">
            <Image
              src="/Calculation/platezi.png"
              alt="Приложение Андроид"
              width={60}
              height={60}
            />
          </div>

          <div className="ml-2">
            <p>Газпромбанк</p>
            <Link href="#" className="text-[14px] text-black/50">
              для Android
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[14px] text-black/50">Бесплатно по России</p>
          <Link href="tel:88001000701" className="font-medium text-[18px]">
            8 800 100 07 01
          </Link>
        </div>
        <div>
          <p className="text-[14px] text-black/50">Бесплатно c мобильных</p>
          <Link href="tel:400" className="font-medium text-[18px]">
            400
          </Link>
        </div>
        <div>
          <p className="text-[14px] text-black/50">Задать вопрос</p>
          <div className="flex">
            <Link
              href="#"
              className="font-medium  text-white bg-black p-4 rounded-[8px] mt-4"
            >
              Обращение в банк
            </Link>
          </div>
        </div>
        <div>
          <p className="text-[14px] text-black/50">Ваше местоположение</p>
          <div className="flex text-blue-600">
            <div className=" w-5 h-5 items-center mt-1">
              <SVGComponet.Geo />
            </div>
            <span className="ml-1"></span>
            <Cities />
          </div>
        </div>
        <div>
          <p className="text-[14px] text-black/50">Адрес головного офиса:</p>
          <p className="text-[14px]">
            117420, г. Москва, ул. Наметкина, дом 16, корпус 1
          </p>
        </div>
        <div className="flex flex-col">
          {headItems.map((items) => (
            <div key={items.id} className="mb-4">
              <Link href={items.link}>
                <span className="text-[16px] leading-5 ">{items.title}</span>
              </Link>
            </div>
          ))}
          <div
            className={`grid transition-all duration-500 ease-out
          ${showAll ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
          >
            <div className="overflow-hidden">
              {tailItems.map((item, i) => (
                <div
                  key={i}
                  className={`mb-4 transition-opacity duration-500
              ${
                showAll
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
                  style={{ transitionDelay: showAll ? `${i * 40}ms` : "0ms" }}
                >
                  <Link href={item.link}>
                    <span className="text-[16px] leading-5">{item.title}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {tailItems.length > 0 && !showAll && (
            <button
              className="text-blue-500 text-left mt-2"
              onClick={() => setShowAll(true)}
            >
              Показать все
            </button>
          )}
        </div>
        <div className="leading-5 text-[14px] text-black/50 space-y-2 flex flex-wrap">
          {FOOTER_INFO.map((i) => (
            <Link href={i.link} key={i.id}>
              {i.title}
            </Link>
          ))}
        </div>
        <div className="">
          <p className="leading-5 text-[14px] text-black/50">
            Сайт Газпромбанка (Акционерное общество) использует{" "}
            <a
              className="leading-5 text-[14px] text-black"
              href="javascript:void(0)"
            >
              cookie-файлы
            </a>
            . Что это значит? Сookie — это небольшие файлы, которые содержат
            информацию о предыдущих посещениях сайта. Они используются для
            персонализации сервисов и для повышения удобства работы с сайтом.
            Если вы не хотите, чтобы сookie хранились на вашем устройстве, вы
            можете запретить их в настройках браузера или с помощью специальных
            программ. Обратите внимание, что после их отключения сайт может
            работать хуже
          </p>
        </div>
        <div className="flex gap-3">
          {[
            <SVGComponet.Vk key="vk" />,
            <SVGComponet.Ok key="ok" />,
            <SVGComponet.Telegram key="tg" />,
          ].map((Icon, i) => (
            <Link
              key={i}
              href="javascript:void(0)"
              className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gray-400/30 hover:bg-gray-400 transition-colors" />
              <div className="relative flex w-6 z-10">{Icon}</div>
            </Link>
          ))}
        </div>
        <p className="leading-5 text-[14px] text-black/50">
          © 1990-2025, Банк ГПБ (АО) Генеральная лицензия Банка России № 354
        </p>
        <div className="mt-5 "></div>
      </div>
    </footer>
  );
};
