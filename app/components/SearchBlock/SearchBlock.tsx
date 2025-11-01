"use client";

import { useModal } from "@/app/hooks/useModal";
import {
  ArrowSVG,
  CrossSVG,
  Magnifier,
  SVGComponet,
} from "@/app/ui/SvgElements";
import Link from "next/link";

const links = [
  {
    href: "javascript:void(0)",
    text: "Для всех",
    icon: <SVGComponet.ForEveryone />,
  },
  { href: "javascript:void(0)", text: "МСБ", icon: <SVGComponet.MSB /> },
  {
    href: "javascript:void(0)",
    text: "Крупному бизнесу",
    icon: <SVGComponet.Ecosystem />,
  },
  {
    href: "javascript:void(0)",
    text: "Экосистема",
    icon: <SVGComponet.Ecosystem />,
  },
];

const links2 = [
  {
    href: "javascript:void(0)",
    text: "Скачать мобильное приложение",
    icon: <SVGComponet.SmartPhone />,
  },
  {
    href: "javascript:void(0)",
    text: "Что входит в привилегии",
    icon: <SVGComponet.Wallet />,
  },
  {
    href: "javascript:void(0)",
    text: "Курсы валют",
    icon: <SVGComponet.Ruble />,
  },
  {
    href: "javascript:void(0)",
    text: "Тарифы",
    icon: <SVGComponet.Money />,
  },
];
export const SearchHome = ({ searchIndex }: { searchIndex: number }) => {
  const { modalIsOpen, toggleModal } = useModal();

  return (
    <>
      <div
        className={`fixed bottom-0 max-w-3xl z-1000 flex flex-col gap-3  left-0 right-0 bg-white border-t 
       border-gray-300 rounded-t-[12px] 
       duration-500 cursor-pointer focus:outline-none
       ${modalIsOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div
          className={`flex gap-3 items-center pt-4 px-4 
       `}
          onClick={toggleModal}
        >
          <div className=" flex gap-3 text-black/50 bg-[#0a0a0b14] p-2 rounded-[8px] w-full">
            <Magnifier />
            <p>Поиск</p>
          </div>
          <button></button>
          <div className="items-center flex w-10">
            <div className="p-2 bg-[#0a0a0b14] rounded-[12px]">
              <SVGComponet.Microphone />
            </div>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto scrollbar-hide whitespace-nowrap mb-4 mt-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link}
              className={`bg-[#0a0a0b14] px-3 py-1 rounded-[8px] flex ml-3 mr-3
                ${searchIndex == index ? "text-white bg-black" : "text-black"}`}
            >
              <div className="flex w-5 h-5 my-0.5">{link.icon}</div>

              {link.text}
            </Link>
          ))}
        </div>
      </div>

      {/**transform-gpu alt translateZ(0)
       * Плавность	На iOS и Android анимации translate, scale, rotate без GPU иногда «фризят». GPU-слой делает движение идеально плавным.
        ✅ Отдельный слой	Элемент не перерисовывает фон и соседей при движении — экономит ресурсы.
        ✅ Меньше лагов	Особенно важно при 60 fps интерфейсах (модалки, слайдеры, bottom sheets). */}
      <div
        className={`z-1000 fixed inset-0 transition-transform duration-200 ease-out transform-gpu
          ${modalIsOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="fixed bottom-0 bg-[#fff] w-full rounded-t-2xl px-4 border-gray-200 border">
          <div className="relative min-h-14  pt-4 ">
            <div
              className="absolute flex items-center justify-center w-6 h-6 top-2 right-0 
            bg-[#0a0a0b14] rounded-[50%] cursor-pointer z-1000"
              onClick={toggleModal}
            >
              <div className="scale-10">
                <CrossSVG />
              </div>
            </div>
          </div>
          <div className="flex gap-5 pb-4">
            <div className=" flex gap-3 text-black/50 bg-[#0a0a0b14] p-2 rounded-[8px] w-full">
              <Magnifier />
              <input className="" placeholder="Поиск" />
              <button>
                <SVGComponet.ButtonArrow />{" "}
              </button>
            </div>
            <div className="items-center flex w-10">
              <div className="p-2 bg-[#0a0a0b14] rounded-[12px]">
                <SVGComponet.Microphone />
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-col gap-4 min-w-[calc(100vw-32px)]">
            {links2.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-between relative px-3 py-2 rounded-lg transition"
              >
                <div className="flex items-center gap-3 text-black/80">
                  <div className="w-10 h-10 flex items-center justify-center text-black/60 bg-[#f5f5f5] rounded-[8px]">
                    <div></div>
                    {item.icon}
                  </div>
                  {item.text}
                </div>

                <div className="w-5 h-5 flex items-center justify-center text-black/60">
                  <ArrowSVG />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
