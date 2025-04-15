"use client";

import Link from "next/link";
import { GazpromBankSvg, Magnifier, ThreeDots } from "../SvgElements";

import Cities from "../Cities";
import { useModal } from "@/app/hooks/useModal";
import ProjectsBankButton from "./ProjectsBankButton";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DefoultLinkGPB = ({ href, title }) => {
  return (
    <Link href={href}>
      <div className="flex p-3 rounded-[8px] transition-colors duration-400 hover:bg-[#f4f6fa] group ">
        <div className="text-[16px] leading-3 transition-colors duration-400 group-hover:text-blue-600">
          {title}
        </div>
      </div>
    </Link>
  );
};

const MENU = [
  { id: 1, title: "Для всех", href: "/" },
  { id: 2, title: "Private", href: "2" },
  { id: 3, title: "Малому и среднему бизнесу", href: "3" },
  { id: 4, title: "Крупному бизнесу", href: "4" },
  { id: 5, title: "Финансовым организациям", href: "5" },
  { id: 6, title: "Инвесторам", href: "6" },
];

const HeaderMenu = ({ onSearchClick }) => {
  const [isLoading, setisLoading] = useState(true);
  const { toggleModalQR, modalClasses } = useModal();
  const { toggleModalQR: toggleModalMenu, modalClasses: modalClassesMenu } =
    useModal();
  const leftBlockRef = useRef(null);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [cityChanged, setCityChanged] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 0.1);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (isLoading) return;
    const checkOverflow = () => {
      if (leftBlockRef.current) {
        const container = leftBlockRef.current;
        const items = Array.from(container.children).filter(
          (child) => !child.classList.contains("dropdown-button")
        );

        const hidden = [];
        let isOveflowing = false;

        items.forEach((item) => {
          const menuIndex = MENU.findIndex((m) => m.title === item.textContent);
          if (menuIndex === -1) return;

          if (isOveflowing) {
            hidden.push(MENU[menuIndex]);
            item.style.display = "none";
          } else {
            item.style.display = "flex";
            /*
             * getBoundingClientRect() — это метод DOM-элемента, который возвращает его размеры и позицию относительно видимой области окна браузера (viewport).
             * Он полезен, когда нужно точно определить расположение элемента на экране или его геометрические параметры.
             */
            const itemRight = item.getBoundingClientRect().right;
            const containerRight = container.getBoundingClientRect().right - 40;

            if (itemRight > containerRight) {
              hidden.push(MENU[menuIndex]);
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
  }, [cityChanged, isLoading]);

  const handleCityChange = () => {
    setCityChanged([]);
  };

  return (
    <div className="wrapper ml-auto mr-auto flex h-full w-full min-[1920px]:min-w-[1920px] text-[14px] text-[#696e82] relative bg-[#f4f6fa] z-20">
      <div
        className="flex space-x-5 items-center hoverLink whitespace-nowrap pr-10 flex-1 min-w-0"
        ref={leftBlockRef}
      >
        <ProjectsBankButton />

        <Link
          href="/ui"
          className="group mr-6 hover:scale-105 transition-transform duration-300 text-blue-600 shrink-0"
        >
          <GazpromBankSvg />
        </Link>
        {MENU.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${
              isLoading
                ? "animate-pulse rounded bg-gray-200 text-transparent"
                : ""
            }`}
          >
            {item.title}
          </Link>
        ))}
        {hiddenItems.length > 0 && (
          <div className="dropdown-button">
            <div
              className={`
                hover:bg-[#96969b29] text-[16px] transition-colors duration-200 
                rounded-[8px] p-1 pl-2 pr-2 pb-2 cursor-pointer hover:text-blue-600 items-center
                ${isLoading ? "animate-pulse rounded bg-gray-200" : ""}
              `}
              onClick={toggleModalMenu}
            >
              {isLoading ? "." : <ThreeDots />}
            </div>
            <div className="relative">
              <div className={`${modalClassesMenu} left-0 mt-[3px]`}>
                <div className=" bg-white w-66  max-h-full rounded-[12px] custom-shadow p-2">
                  {hiddenItems.map((item) => {
                    if (!item) return null;
                    return (
                      <div key={item.id} className="text-black">
                        <DefoultLinkGPB href={""} title={item.title} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center text-black ml-auto ">
        <div className="flex space-x-8 w-full items-center relative">
          <div
            className={`${
              isLoading ? "animate-pulse rounded bg-gray-200 h-5 w-30" : ""
            }`}
          >
            <div className={`${isLoading ? "hidden" : ""}`}>
              <Cities onCityChange={handleCityChange} />
            </div>
          </div>

          <div className="whitespace-nowrap">
            <Link
              href=""
              title="Открыть страницу с картой офисов"
              className="hover:text-[#4768BF]"
            >
              Офисы
            </Link>{" "}
            и{" "}
            <Link
              href=""
              title="Открыть страницу с картой банкоматов"
              className="hover:text-[#4768BF] "
            >
              банкоматы
            </Link>
          </div>
          <button
            className="group hover:scale-120 transition-transform duration-300 "
            onClick={onSearchClick}
          >
            <Magnifier />
          </button>
          <div>
            <button
              className="
            bg-[#0a0a0b14] hover:bg-[#0a0a0b29] text-black text-[16px] transition-colors duration-200 
              rounded-[8px] p-2.5 pl-4 pr-4 cursor-pointer"
              onClick={toggleModalQR}
            >
              Войти
            </button>

            <div className={`${modalClasses} right-0`}>
              <div className=" bg-white w-72 h-22 max-h-full rounded-[12px] custom-shadow p-2">
                <DefoultLinkGPB href={""} title={"Интернет-банк"} />
                <DefoultLinkGPB href={""} title={"ГПБ Бизнес-онлайн"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderMenu;
