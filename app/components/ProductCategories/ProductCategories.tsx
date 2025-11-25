"use client";

import Image from "next/image";
import { PRODUCT_CATEGORIES } from "./constant";

import { Carousel } from "../FinanceProduct/FinanceProductCarousel";

export const ProductCategories = () => {
  return (
    <div className={`flex w-full relative overflow-x-hidden `}>
      <Carousel
        lg={4}
        xl={6}
        conteinerStyle="px-5"
        arrowNext="right-0"
        arrowPrev="left-0"
      >
        {PRODUCT_CATEGORIES.map((product, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 rounded-2xl 
            lg:w-[calc(25%-30px)] xl:w-[calc(16%-12px)] bg-gray-100 p-4 h-full ml-1
            hover:-translate-y-1 duration-300 ease-in-out transform will-change-transform`}
          >
            {product.title}
            <Image
              src={product.src}
              alt={`Изображение ${product.title}`}
              width={240}
              height={240}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
