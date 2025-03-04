"use client";

import Link from "next/link";

export const Header = () => {
  return (
    <div
      className="
        flex 
        items-center 
        justify-center 
        p-2 text-[14px] 
        bg-[#f4f6fa] 
        shadow-md 
        "
    >
      <img src="Gazprombank.svg" alt="ГазпромБанк" className="mr-[20px]" />
      <div className="flex items-center text-[#696e82] space-x-[20px]">
        <Link className="text-[#000000]" href="">
          Для всех
        </Link>
        <Link href="">Private</Link>
        <Link href="">Малому и среднему бизнесу</Link>
        <Link href="">Крупному бизнесу</Link>
        <Link href="">Финансовым организациям</Link>
        <Link href="">Инвесторам</Link>
      </div>
      <div className="ml-[10px] space-x-[20px]">
        <Link href="">Мурманск</Link>
        <Link href="">Офисы и банкоматы</Link>
        <Link href="">Войти</Link>
      </div>
    </div>
  );
};

/**

#696e82
#476bf0
#f4f6fa
*/
