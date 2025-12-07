"use client";

import Image from "next/image";

export const MobileApp = () => {
  return (
    <div className="relative flex items-center xl:max-w-7xl mx-auto">
      <div className="relative flex-[0_0_496px]">
        <Image
          src="/MobileApp/mobileApp.png"
          alt="Moбильное приложение"
          width={496}
          height={428}
          className="top-0 left-0"
        />
      </div>

      <div className="flex-[1_1_auto] ">
        <h2 className="text-[40px] leading-12 font-semibold">
          Мобильное приложение Газпромбанка
        </h2>

        <p className="text-[14px] leading-4 mb-6 mt-2">
          Совершайте покупки, оплачивайте услуги без комиссии, управляйте своими
          картами, вкладами и кредитами не выходя из дома
        </p>
        <div className="text-[14px] ">
          <button className="bg-black hover:bg-black/80 text-white p-2 px-4 rounded-lg mr-4 cursor-pointer duration-200 transition-colors">
            Скачать
          </button>
          <button className="hover:bg-[#0a0a0b0f]/140 bg-[#0a0a0b0f] p-2 px-4 rounded-lg cursor-pointer duration-200 transition-colors">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};
