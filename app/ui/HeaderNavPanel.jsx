"use client";
import Magnifier, { ThreeDots } from "./SvgElements";
//wrapper
const HeaderNavPanel = () => {
  const navItems = [
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

  const classHoverBlue = "hover:text-[#4768BF] transition-colors duration-200";
  return (
    <nav className="relative lg:h-22 h-full -z-1 border-b border-gray-300">
      <div className="container wrapper mx-auto flex items-center h-full text-[16px]">
        <div className="flex space-x-7 whitespace-nowrap">
          {navItems.map((item) => (
            <div key={item} className={classHoverBlue}>
              {item}
            </div>
          ))}
          <div className="opacity-0">
            <ThreeDots />
          </div>
        </div>
        <div className="flex ml-auto space-x-4 whitespace-nowrap">
          <button className={classHoverBlue}>Стать клиентом</button>
          <div>
            <Magnifier />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNavPanel;
