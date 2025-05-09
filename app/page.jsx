"use client";
import Link from "next/link";
import { FINANCIAL_PRODUCTS_ITEMS } from "./Variable";

export default function Home() {
  console.log("Загруженно Home");
  return (
    <div>
      <div className="max-[1023]:max-w-3xl max-[1023]:ml-auto max-[1023]:mr-auto min-[1024]:hidden">
        <section className="flex h-45 pl-4 pr-4">
          {FINANCIAL_PRODUCTS_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative min-[360]:w-80 rounded-2xl w-[calc(100vw-40px)] h-[100%]"
              style={{ backgroundColor: item.bg }}
            >
              <span className="absolute top-0 left-0 w-full h-full">
                <h3 className="max-[1023]:text-[23px] leading-7 font-semibold max-w-40 text-white">
                  {item.title}
                </h3>
                <p>{item.description}</p>
              </span>

              <span className="w-35 h-full ml-auto">
                <picture>
                  <source type="image/webp" srcSet={item.srcsetWebp} />
                  <source type="image/png" srcSet={item.srcsetPng} />
                  <img src={item.srcImg} alt={item.title} />
                </picture>
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
