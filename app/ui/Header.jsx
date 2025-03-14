"use client";

import "./header.css";
import Link from "next/link";
import SquareOfDots, { GazpromBankSvg, Magnifier } from "./SvgElements";
import DropdownMenu from "./DropdownMenu";
import Cities from "./Cities";
// Возможно понадобиться позже box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5)
//shrink-0 - сжатие, если 0, то сжатие не происходи, в данном контексте отменит перенос элементов
const Header = () => {
  return (
    <header>
      <div className="header_full_main_menu flex  justify-center p-2 text-[14px] shadow-md">
        <div className="flex wrapper text-[#696e82] ">
          <div className="flex shrink-0 space-x-[var(--spacingHeader)] items-center hoverLink">
            <div
              tabIndex="0"
              className="lg:p-[10px] lg:-ml-[100px] lg:w-[35px] "
            >
              <Link href="" className="group ">
                <SquareOfDots />
              </Link>
            </div>
            <Link
              href=""
              className="group mr-10 hover:scale-105 transition-transform duration-300"
            >
              <GazpromBankSvg />
            </Link>

            <Link className="" href="">
              Для всех
            </Link>
            <Link href="" className="">
              Private
            </Link>
            <Link href="">Малому и среднему бизнесу</Link>
            <Link href="">Крупному бизнесу</Link>
            <Link href="">Финансовым организациям</Link>
            <Link href="">Инвесторам</Link>
            {/*<DropdownMenu />*/}
          </div>
          <div
            className="
          flex justify-end w-95  items-center ml-[var(--spacingHeader)] space-x-[var(--spacingHeader)] shrink-0
          text-black
          min-[120em]:ml-[98px]"
          >
            <Cities />
            <div className="">
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
                className="hover:text-[#4768BF]"
              >
                банкоматы
              </Link>
            </div>

            <Magnifier />
            <Link href="">Войти</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
//#4768BF0
export default Header;
