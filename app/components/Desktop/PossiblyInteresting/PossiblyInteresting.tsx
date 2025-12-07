"use client";

import { useWindowSize } from "@/app/hooks/useWindowSize";
import { SVGComponet } from "@/app/ui/SvgElements";
import Image from "next/image";
import { useRef, useState } from "react";

const links = [
  {
    title: "Рефинансирование кредитов",
    desc: "Обновите условия - платите меньше",
    src: "/PossibleInteresting/refinance.png",
  },
  {
    title: "Кредит наличными под залог недвижимости",
    desc: "Получите кредит в день оформления",
    src: "/PossibleInteresting/credit_nalich.png",
  },
];

export const PossiblyInteresting = () => {
  const [isVisibleArrowLeft, setIsVisibleArrowLeft] = useState(false);
  const [isVisibleArrowRight, setIsVisibleArrowRight] = useState(true);
  const { width } = useWindowSize();

  const scrollRef = useRef<HTMLDivElement>(null);
  const arrowWidhtHide = width < 1312 ? true : false;
  const scrollRight = () => {
    if (!scrollRef.current) return;
    const cardWidht = 640 + 16;
    scrollRef.current.scrollLeft += cardWidht;
    setIsVisibleArrowRight(false);
    setIsVisibleArrowLeft(true);
  };

  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const cardWidht = 640 + 16;

    scrollRef.current.scrollLeft -= cardWidht;
    setIsVisibleArrowRight(true);
    setIsVisibleArrowLeft(false);
  };

  return (
    <div className="relative justify-center ">
      <h2 className="text-[40px] font-semibold flex justify-center mb-20">
        Возможно, будет интересно
      </h2>
      <div
        className={`z-1 absolute top-0 -right-1 h-full w-32 bg-gradient-to-l from-white to-transparent pointer-events-none
            duration-100 transition-opacity
        ${isVisibleArrowRight && arrowWidhtHide ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`z-1 absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white to-transparent pointer-events-none
            duration-100 transition-opacity
        ${isVisibleArrowLeft && arrowWidhtHide ? "opacity-100" : "opacity-0"}`}
      />
      <div className="relative ">
        <div
          ref={scrollRef}
          className="relative flex h-full gap-4 transition-transform duration-400 overflow-x-auto scrollbar-hide
        scroll-smooth snap-mandatory snap-x z-0 
        "
        >
          {links.map((items, index) => (
            <div
              key={index}
              className="relative min-w-[590px]  bg-gray-100/70 p-11 rounded-2xl h-[344px] snap-start"
            >
              <h6 className="text-[28px] font-semibold leading-8 mb-4 ">
                {items.title}
              </h6>
              <span className="text-[14px]">{items.desc}</span>
              <br />
              <div className="absolute w-[280px] h-[272px] right-0 bottom-0">
                <Image
                  src={items.src}
                  alt={`Изображение: ${items.title}`}
                  fill
                  sizes="(max-width: 1279px) 100vw, 1280px"
                />
              </div>

              <button className="absolute bottom-8 px-6 py-3 bg-gray-200 rounded-[8px]">
                Подробнее
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className={`absolute top-1/2  -translate-y-1/2 right-0 z-10
          bg-gray-100 w-10 h-10 rounded-full
         flex items-center justify-center
         transition-opacity duration-600 cursor-pointer
          ${
            isVisibleArrowRight && arrowWidhtHide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-7 h-7 bg-white rounded-full">
            <SVGComponet.ArrowNext />
          </div>
        </button>
        <button
          onClick={scrollLeft}
          className={`absolute top-1/2  -translate-y-1/2 left-0 z-10
         bg-gray-100 w-10 h-10 rounded-full
         flex items-center justify-center rotate-180
         transition-opacity duration-600 cursor-pointer
         ${
           isVisibleArrowLeft && arrowWidhtHide
             ? "opacity-100"
             : "opacity-0 pointer-events-none"
         }`}
        >
          <div className="w-7 h-7 bg-white rounded-full">
            <SVGComponet.ArrowNext />
          </div>
        </button>
      </div>
    </div>
  );
};
