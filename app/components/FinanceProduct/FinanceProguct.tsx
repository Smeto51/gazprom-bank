"use client";

import { FINANCIAL_PRODUCTS_ITEMS } from "@/app/Variable";
import { Carousel } from "./FinanceProductCarousel";

import Link from "next/link";
import { ArrowSVG } from "@/app/ui/SvgElements";

type MobileImgProps = {
  srcsetWebp: string;
  srcsetPng: string;
  srcImg: string;
  title: string;
};

const MobileImg = ({
  srcsetWebp,
  srcsetPng,
  srcImg,
  title,
}: MobileImgProps) => (
  <span className="block w-35 ml-auto items-center lg:hidden">
    <picture className="">
      <source type="image/webp" srcSet={srcsetWebp} />
      <source type="image/png" srcSet={srcsetPng} />
      <img
        className="max-[1023px]:w-35 object-contain h-[170px]"
        src={srcImg}
        alt={title}
      />
    </picture>
  </span>
);

export const FinProfuct = () => {
  return (
    <section className=" min-lg:pt-28 relative z-0">
      <Carousel>
        {FINANCIAL_PRODUCTS_ITEMS.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={`relative block flex-shrink-0 rounded-2xl max-[1024px]:w-80 h-full
                lg:w-[calc(50%-16px)] xl:w-[calc(33%-16px)] scale-99 
                hover:-translate-y-1 duration-300 ease-in-out transform will-change-transform`}
              style={{ backgroundColor: item.bg }}
            >
              <MobileImg
                srcsetWebp={item.srcsetWebp}
                srcsetPng={item.srcsetPng}
                srcImg={item.srcImg}
                title={item.title}
              />
              <div className="max-lg:hidden">
                <picture>
                  <img
                    className="lg:max-h-[560px]"
                    src={item.scrImg1024}
                    alt={item.title}
                  />
                </picture>
              </div>
              <span className="absolute top-4 w-full p-5 flex flex-col lg:items-center max-[1024px]:hidden">
                <div
                  className={`pl-4 pr-4 py-1 rounded-[8px] ${item.buttonColor} ${item.buttonTextColor}`}
                >
                  {item.buttonName}
                </div>
              </span>
              <span className="absolute lg:top-14 top-4 left-0 w-full h-full p-5 flex flex-col lg:items-center">
                <h3
                  className="max-[1024]:text-[23px] max-[1024]:leading-7 font-semibold max-[1023px]:max-w-45
                    text-[28px] leading-8 "
                  style={{ color: item?.titleColor }}
                >
                  {item.title}
                </h3>
                <p
                  className="max-[1024px]:hidden min-lg:pt-3 leading-5"
                  style={{ color: item?.titleColor }}
                >
                  {item.description}
                </p>
                <button
                  className="absolute flex w-8 h-8 bottom-5 left-5 items-center justify-center rounded-[12px] hover:bg-[#E2E2E5] cursor-pointer transition-colors duration-200
                    lg:hidden mb-2"
                  style={{ background: item?.titleColor }}
                >
                  <div
                    className="flex h-4 w-4 "
                    style={{ color: item?.ArrowColor }}
                  >
                    <ArrowSVG />
                  </div>
                </button>
              </span>
            </Link>
          );
        })}
      </Carousel>
    </section>
  );
};
