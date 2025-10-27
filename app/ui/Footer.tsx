"use client";

import Image from "next/image";
import { GazpromBankSvg, SVGComponet } from "./SvgElements";
import Link from "next/link";
import Cities from "./Cities";

export const Footer = () => {
  return (
    <footer className="p-4 bg-gray-200/60 rounded-2xl space-y-8 mt-6">
      <div className="text-blue-500">
        <GazpromBankSvg />
      </div>
      <div className="flex">
        <div className="-ml-4">
          <Image
            src="/Calculation/platezi.png"
            alt="Приложение Андроид"
            width={60}
            height={60}
          />
        </div>

        <div className="ml-2">
          <p>Газпромбанк</p>
          <Link href="#" className="text-[14px] text-black/50">
            для Android
          </Link>
        </div>
      </div>
      <div>
        <p className="text-[14px] text-black/50">Бесплатно по России</p>
        <Link href="tel:88001000701" className="font-medium text-[18px]">
          8 800 100 07 01
        </Link>
      </div>
      <div>
        <p className="text-[14px] text-black/50">Бесплатно c мобильных</p>
        <Link href="tel:400" className="font-medium text-[18px]">
          400
        </Link>
      </div>
      <div>
        <p className="text-[14px] text-black/50">Задать вопрос</p>
        <div className="flex">
          <Link
            href="#"
            className="font-medium  text-white bg-black p-4 rounded-[8px] mt-4"
          >
            Обращение в банк
          </Link>
        </div>
      </div>
      <div>
        <p className="text-[14px] text-black/50">Ваше местоположение</p>
        <div className="flex text-blue-600">
          <div className=" w-5 h-5 items-center mt-1">
            <SVGComponet.Geo />
          </div>
          <span className="ml-1"></span>
          <Cities />
        </div>
      </div>
      <div>
        <p className="text-[14px] text-black/50">Адрес головного офиса:</p>
        <p className="text-[14px]">
          117420, г. Москва, ул. Наметкина, дом 16, корпус 1
        </p>
      </div>
      <div></div>
      <div className="mt-100"></div>
    </footer>
  );
};
