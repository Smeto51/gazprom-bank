"use client";

export const TitleLinkCashBack = () => (
  <div
    className="relative max-xl:justify-center flex gap-2 items-center transition-colors xl:mb-10
    xl:ml-0 xl:mt-10 duration-300"
  >
    <span
      className="text-[#0a0a0b66] hover:text-black cursor-pointer duration-200
    xl:text-[#ffffff66] xl:hover:text-white "
    >
      Главная
    </span>
    <div
      className="bg-[#0a0a0b66] w-1 h-1
    xl:bg-[#ffffff66]"
    />
    <span
      className="text-[#0a0a0b66] hover:text-black cursor-pointer duration-200
    xl:text-[#ffffff66] xl:hover:text-white"
    >
      Дебетовые карты
    </span>
    <div
      className="bg-[#0a0a0b66] w-1 h-1
    xl:bg-[#ffffff66]"
    />
    <span className="xl:text-white">Акция по дебетовой карте «Мир»</span>
  </div>
);
