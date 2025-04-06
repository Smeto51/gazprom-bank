"use client";

import { ThreeDots } from "../SvgElements";

import QRCodeButton from "./QRCodeButton";
import BecomeClinetButton from "./BecomeClientButton";

const CLASS_HOVER_BLUE = "hover:text-[#4768BF] transition-colors duration-200";
export const BUTTON_BLACK =
  "bg-black text-white rounded-[8px] hover:bg-gray-800  active:bg-gray-900 transition-colors duration-200 cursor-pointer focus:outline-none p-2.5";

const NAV_ITEMS = [
  "Карты",
  "Вклады и счета",
  "Кредиты",
  "Премиум",
  "Инвестиции",
  "Автокредитование",
  "Ипотека",
  "Услуги и сервисы",
  "Обмен валют",
  "Привилегии",
];

const HeaderNavPanel = () => {
  return (
    <nav className="relative lg:h-22 h-full border-b border-gray-300 z-10">
      <div className="container wrapper mx-auto flex items-center h-full text-[16px]">
        <div className="flex space-x-7 whitespace-nowrap">
          {NAV_ITEMS.map((item) => (
            <div key={item} className={CLASS_HOVER_BLUE}>
              {item}
            </div>
          ))}
          <div className="opacity-0">
            <ThreeDots />
          </div>
        </div>
        <div className="flex items-center ml-auto space-x-4 relative">
          <BecomeClinetButton />
          <QRCodeButton />
        </div>
      </div>
    </nav>
  );
};
export default HeaderNavPanel;
