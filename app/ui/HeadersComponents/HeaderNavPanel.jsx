"use client";

import { ThreeDots } from "../SvgElements";

import QRCodeButton from "./QRCodeButton";
import BecomeClinetButton from "./BecomeClientButton";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useModal } from "@/app/hooks/useModal";

export const BUTTON_BLACK =
  "bg-black text-white rounded-[8px] hover:bg-gray-800  active:bg-gray-900 transition-colors duration-200 cursor-pointer focus:outline-none p-2.5";

const NAV_ITEMS = [
  { id: 1, title: "Карты", href: "#" },
  { id: 2, title: "Вклады и счета", href: "#" },
  { id: 3, title: "Кредиты", href: "#" },
  { id: 4, title: "Премиум", href: "#" },
  { id: 5, title: "Инвестиции", href: "#" },
  { id: 6, title: "Автокредитование", href: "#" },
  { id: 7, title: "Ипотека", href: "#" },
  { id: 8, title: "Услуги и сервисы", href: "#" },
  { id: 9, title: "Обмен валют", href: "#" },
  { id: 10, title: "Газпром Бонус", href: "#" },
];

const HeaderNavPanel = () => {
  const [isLoading, setisLoading] = useState(false);
  const { toggleModalQR: toggleModal, modalClasses } = useModal();
  const leftBlockRef = useRef(null);
  const [hiddenItems, setHiddenItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (!isLoading) return;

    const checkOverflow = () => {
      if (leftBlockRef.current) {
        const container = leftBlockRef.current;
        const items = Array.from(container.children).filter(
          (child) => !child.classList.contains("dropdown-button")
        );

        const hidden = [];
        let isOveflowing = false;

        items.forEach((item) => {
          const navIndex = NAV_ITEMS.findIndex(
            (m) => m.title === item.textContent
          );
          if (navIndex === -1) return;

          item.style.display = "";

          if (isOveflowing) {
            hidden.push(NAV_ITEMS[navIndex]);
            item.style.display = "none";
          } else {
            const itemRight = item.getBoundingClientRect().right;
            const containerRight = container.getBoundingClientRect().right - 70;

            if (itemRight > containerRight) {
              hidden.push(NAV_ITEMS[navIndex]);
              item.style.display = "none";
              isOveflowing = true;
            }
          }
        });
        setHiddenItems(hidden);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [isLoading]);

  return (
    <nav className="h-full border-b border-gray-300 z-10 bg-white select-none">
      <div className="relative wrapper mx-auto ml-auto mr-auto flex h-full w-full text-[16px]">
        <div
          className={`flex space-x-5 items-center hoverLink whitespace-nowrap pr-10 flex-1 min-w-0`}
          ref={leftBlockRef}
        >
          {NAV_ITEMS.map((item) => (
            <div
              className={`${
                !isLoading
                  ? "animate-pulse rounded bg-gray-200 text-transparent min-w-10"
                  : "hover:text-blue-500 "
              }`}
              key={item.id}
            >
              {item.id == 2 ? (
                <div className="inline-flex">
                  {item.title}
                  <span
                    className={`relative h-3 w-3 ml-1.5 ${
                      !isLoading ? "hidden" : ""
                    }`}
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    </span>
                  </span>
                </div>
              ) : (
                item.title
              )}
            </div>
          ))}

          {hiddenItems.length > 0 && (
            <div className="dropdown-button">
              <div
                className={`
                hover:bg-[#96969b29] text-[16px] transition-colors duration-200 
                rounded-[8px] p-1 pl-2 pr-2 pb-2 cursor-pointer hover:text-blue-600 items-center
                ${!isLoading ? "animate-pulse rounded bg-gray-200" : ""}
              `}
                onClick={toggleModal}
              >
                {!isLoading ? "" : <ThreeDots />}
              </div>
              <div className="relative">
                <div className={`${modalClasses.default} left-0 mt-[3px]`}>
                  <div className=" bg-white w-66 max-h-full rounded-[12px] custom-shadow p-2 ">
                    {hiddenItems.map((item) => (
                      <div
                        className="flex p-3 rounded-[8px] transition-colors duration-400 hover:bg-[#f4f6fa] group "
                        key={item.id}
                      >
                        <div className="text-[16px] leading-3 transition-colors duration-400 group-hover:text-blue-600 text-black">
                          {item.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`flex items-center ml-auto space-x-4 relative`}>
          {!isLoading ? (
            <div className=" animate-pulse rounded bg-gray-200">
              <div className="opacity-0 w-40 h-10" />
            </div>
          ) : (
            <BecomeClinetButton />
          )}
          {!isLoading ? (
            <div className=" animate-pulse rounded bg-gray-200">
              <div className="opacity-0 w-10 h-10" />
            </div>
          ) : (
            <QRCodeButton />
          )}
        </div>

        {/*process.env.NODE_ENV === "development" && (
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
      )*/}
      </div>
    </nav>
  );
};
export default HeaderNavPanel;
