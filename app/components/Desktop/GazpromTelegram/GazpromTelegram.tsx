"use client";

import Image from "next/image";

export const GazpromTelegram = () => {
  return (
    <div className="overflow-hidden pt-5">
      <div
        className="relative bg-[#f4f6ff] min-h-[156px] pt-5 pb-5 pl-22 rounded-2xl 
        flex justify-between"
      >
        <div className="lg:max-w-[376px]">
          <h3 className="text-[24px] font-semibold">Газпромбанк в Telegram</h3>
          <span className="mt-2">У нас для вас новости, скорре переходи</span>
        </div>

        <div className="relative flex right-0 w-[288px] ">
          <div className="absolute lg:-right-6 xl:right-0  w-full h-[calc(100%+64px)]  -top-10 transition-all duration-400">
            {" "}
            <Image
              src="/GazpomTelegram/gpbTg.png"
              alt="Изображение: азпромбанк в Telegram"
              fill
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
