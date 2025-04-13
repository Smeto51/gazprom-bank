"use client";

import { ThreeDots } from "../SvgElements";

import QRCodeButton from "./QRCodeButton";
import BecomeClinetButton from "./BecomeClientButton";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import { useEffect, useState } from "react";
import { useElementSize } from "@/app/hooks/useElementSize";

const CLASS_HOVER_BLUE = "hover:text-[#4768BF] transition-colors duration-200";
export const BUTTON_BLACK =
  "bg-black text-white rounded-[8px] hover:bg-gray-800  active:bg-gray-900 transition-colors duration-200 cursor-pointer focus:outline-none p-2.5";

const NAV_ITEMS = [
  { id: 1, title: "Карты" },
  { id: 2, title: "Вклады и счета" },
  { id: 3, title: "Кредиты" },
  { id: 4, title: "Премиум" },
  { id: 5, title: "Инвестиции" },
  { id: 6, title: "Автокредитование" },
  { id: 7, title: "Ипотека" },
  { id: 8, title: "Услуги и сервисы" },
  { id: 9, title: "Обмен валют" },
  { id: 10, title: "Привилегии" },
];

const HeaderNavPanel = () => {
  const { width } = useWindowSize();
  const [isLoaded, setIsLoaded] = useState(false);

  const [rightBlockRef, rightBlockRefSize] = useElementSize();
  const [leftBlockRef, leftBlockRefSize] = useElementSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="relative lg:h-22 h-full border-b border-gray-300 z-10 bg-white">
      <div className="container wrapper mx-auto flex h-full text-[16px] min-[1920px]:w-480 ">
        {!isLoaded && (
          <div className="flex space-x-7 whitespace-nowrap items-center">
            {NAV_ITEMS.map((item) => (
              <div
                key={`loader-${item.id}`}
                className="h-4 w-16 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>
        )}

        <div
          className={`flex space-x-7 whitespace-nowrap items-center w-full ${
            !isLoaded ? "hidden" : ""
          }`}
          ref={leftBlockRef}
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.id} className={CLASS_HOVER_BLUE}>
              {width >= 1920 ? (
                <span className={`${item.id == 10 ? "flex items-center" : ""}`}>
                  {item.title}
                  {item.id == 10 && (
                    <div className="opacity-0">
                      <ThreeDots />
                    </div>
                  )}
                </span>
              ) : (
                <>
                  {item.id < 9
                    ? item.title
                    : item.id == 9 && (
                        <div
                          className="
                          hover:bg-[#96969b29] text-[16px] transition-colors duration-200 
                          rounded-[8px] p-1 pl-2 pr-2 pb-2 cursor-pointer  hover:text-blue-600 items-center"
                        >
                          <ThreeDots />
                        </div>
                      )}
                </>
              )}
            </div>
          ))}
        </div>
        <div
          className="flex items-center ml-auto space-x-4 relative"
          ref={rightBlockRef}
        >
          <BecomeClinetButton />
          <QRCodeButton />
        </div>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-100 bg-gray-200 p-20 rounded shadow text-[20px] text-black ">
          <div>Навигационая панель</div>
          <br />
          <div>
            Правый блок: {rightBlockRefSize.width}px ×{" "}
            {rightBlockRefSize.height}px
          </div>
          <div>
            Левый блок: {leftBlockRefSize.width}px × {leftBlockRefSize.height}px
          </div>
          <div>
            Общая ширина: {leftBlockRefSize.width + rightBlockRefSize.width}px
          </div>
        </div>
      )}
    </nav>
  );
};
export default HeaderNavPanel;
