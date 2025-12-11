"use client";

import { FallBackImg } from "@/app/utils/FallBackImg";
import { CALCULATION_ITEMS } from "./data/constant";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import { useSearchBlockContext } from "@/app/contextApi/SearchBlockContext";
import { CrossSVG } from "@/app/ui/SvgElements";

export const Calculation = () => {
  const [activePage, setActivePage] = useState(0);
  const { width } = useWindowSize();

  const isMobile = width < 1024;
  const [isOpenCalculation, setIsOpenCalculation] = useState(false);
  const { setIsSearchBlockOpen } = useSearchBlockContext();

  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const handleItemClick = (index: number) => {
    if (isMobile) {
      setActivePage(index);
      setIsOpenCalculation(true);

      setTimeout(() => {
        const element = contentRefs.current[index];
        if (element) {
          const newHeight = element.scrollHeight;
          setContentHeight(newHeight);
        }
      }, 50);
    } else {
      setActivePage(index);
    }
  };
  useEffect(() => {
    if (isOpenCalculation && isMobile) {
      setTimeout(() => {
        const element = contentRefs.current[activePage];
        if (element) {
          setContentHeight(element.scrollHeight);
        }
      }, 50);
    }
  }, [isOpenCalculation, isMobile, activePage]);
  useEffect(() => {
    if (isOpenCalculation) {
      setIsSearchBlockOpen(false);
    } else setIsSearchBlockOpen(true);
  }, [isOpenCalculation, setIsSearchBlockOpen]);

  useEffect(() => {
    if (isMobile && isOpenCalculation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpenCalculation]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isOpenCalculation) {
        setDragY(0);
        return;
      }

      setIsDragging(true);
      startYRef.current = e.clientY;
      const target = e.target as HTMLElement;
      target.setPointerCapture?.(e.pointerId);
    },
    [isOpenCalculation]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !isOpenCalculation) return;
      const delta = e.clientY - startYRef.current;
      setDragY(delta);
    },
    [isDragging, isOpenCalculation]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      if (dragY >= 450) {
        setIsOpenCalculation(false);
        setDragY(0);
      } else setDragY(0);
      const target = e.target as HTMLElement;
      target.releasePointerCapture?.(e.pointerId);
    },
    [isDragging, dragY]
  );

  return (
    <div className="max-lg:pt-8 max-lg:pb-8 lg:mt-20  xl:max-w-[1280px] xl:pl-7 xl:pr-7 mx-auto">
      <div
        className="
        max-lg:bg-[#F5F5F5] pt-6 pb-6 rounded-2xl max-lg:max-w-3xl max-lg:ml-auto max-lg:mr-auto 
        lg:flex lg:flex-col lg:mx-auto "
      >
        <h2
          className="
          text-[28px] lg:text-[40px] leading-8 font-semibold pl-4 pr-4
          lg:mx-auto
        "
        >
          Рассчитайте
        </h2>
        <p className="text-[#6f6f6f] leading-5 pt-4 pl-4 pr-4 lg:hidden">
          Платежи по кредитке, кредит наличными, доход от вклада или автокредит
        </p>
        <div
          className="
          flex pt-4 gap-3 overflow-x-auto pl-4 pr-4 scrollbar-hide lg:justify-center 
          lg:pt-20"
        >
          <div className="flex border-gray-200 min-lg:border rounded-[8px] justify-center mx-auto p-1 gap-2">
            {CALCULATION_ITEMS.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(index)}
                className={`relative rounded-2xl  pl-3 pr-3 overflow-hidden transition-colors duration-300 ease-in-out
                max-lg:bg-white max-lg:min-w-[140px] max-lg:pt-4 max-lg:pb-30
                lg:py-3 lg:rounded-[8px] cursor-pointer
                  ${
                    activePage == index
                      ? "bg-black text-white max-lg:text-black"
                      : "bg-white text-black min-lg:hover:bg-gray-200"
                  }`}
              >
                <p className="font-medium">{item.title}</p>

                <span className="absolute left-5 top-20 min-w-[140px] lg:hidden">
                  <FallBackImg
                    src={item.icon}
                    offIcon={item.localIcon}
                    alt={item.title}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
          <div className="hidden lg:block lg:pt-[60px] lg:pb-[64px] max-w-[1536px]">
            {CALCULATION_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`${activePage === index ? "" : "hidden"}`}
              >
                {item.blockLg}
              </div>
            ))}
          </div>
        )}

        <div
          className={`transition-opacity duration-100 ${
            isMobile && !isOpenCalculation
              ? "opacity-0  "
              : "fixed inset-x-0 top-0 h-dvh bg-black/70 z-1 cursor-pointer opacity-100 min-lg:hidden"
          }`}
        />

        <div
          className={`fixed top-0 bottom-0 w-3xl bg-white z-45 max-w-3xl pointer-events-none min-lg:hidden
              ${isOpenCalculation ? "opacity-100" : "opacity-0"}`}
          style={{
            transform: isOpenCalculation
              ? `translateY(calc(50% + ${dragY}px)`
              : `translateY(120%)`,
            transition: isDragging ? "none" : "transform 0.5s ease-out",
          }}
        />

        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none min-lg:hidden">
          <div
            className={`
              w-full max-w-3xl pointer-events-auto
              bg-white rounded-t-2xl overflow-hidden flex flex-col 
              max-h-[calc(100vh-80px)]
              
            `}
            style={{
              transform: isOpenCalculation
                ? `translateY(${dragY}px)`
                : `translateY(120%)`,
              transition: isDragging ? "none" : "transform 0.5s ease-out",
            }}
          >
            <>
              <div
                className="absolute py-4 mx-auto left-1/2 -translate-x-1/2 flex cursor-grab active:cursor-grabbing  touch-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
              >
                <div className="w-12 h-1 bg-gray-300 rounded-full mb-3 " />
              </div>
              <div
                className="p-4 items-center cursor-grab active:cursor-grabbing touch-none"
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
              >
                <div className="flex justify-between ">
                  <h3 className="font-semibold text-lg">
                    {CALCULATION_ITEMS[activePage].title}
                  </h3>
                  <button
                    onClick={() => setIsOpenCalculation(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 mb-1"
                  >
                    <div className="w-5 h-5">
                      <CrossSVG />
                    </div>
                  </button>
                </div>
                <div className="border rounded-2xl p-2 overflow-x-auto">
                  <div className="flex gap-4 w-max">
                    {CALCULATION_ITEMS.map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => handleItemClick(index)}
                        className={`relative  pl-3 pr-3 overflow-hidden transition-colors duration-300 ease-in-out 
                        max-lg:min-w-[140px] py-3 rounded-[8px] cursor-pointer
                     
                  ${
                    activePage == index
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-200"
                  }`}
                      >
                        <p className="font-medium justify-center flex  whitespace-nowrap">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
            {isMobile && (
              <div
                className="overflow-y-auto max-lg:max-w-3xl overflow-x-hidden transition-all duration-500 ease-in-out"
                style={{
                  height: contentHeight > 0 ? `${contentHeight}px` : "auto",
                }}
              >
                {CALCULATION_ITEMS.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      contentRefs.current[index] = el;
                    }}
                    className={`duration-100 transition-all ${
                      activePage === index
                        ? "opacity-100 block"
                        : "opacity-0 absolute"
                    }`}
                  >
                    {item.blockLg}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
