"use client";

import Link from "next/link";
import { FINANCE_SECTION } from "./data/constants";
import { useState } from "react";
import { FallBackImg } from "@/app/utils/FallBackImg";

const FinanceItem = ({ item }) => (
  <div>
    <Link href={item.link} className="gap-2 flex flex-col items-center">
      <FallBackImg src={item.icon} offIcon={item.offIcon} alt={item.name} />
      <p className="text-center text-sm leading-4">{item.name}</p>
    </Link>
  </div>
);

const ShowMoreItem = () => {
  const [showMore, setShowMore] = useState(false);

  const moreItems = FINANCE_SECTION.slice(8);
  return (
    <>
      {!showMore ? (
        <div className="gap-2 flex flex-col items-center">
          <button onClick={() => setShowMore(true)}>
            <div className="w-[72px] h-72px p-[6px] rounded-2xl bg-[#f5f5f5] flex items-center flex-wrap ">
              {moreItems.map((item) => (
                <div className="w-7.5 h-7.5" key={item.id}>
                  <FallBackImg
                    src={item.icon}
                    offIcon={item.offIcon}
                    alt={item.name}
                  />
                </div>
              ))}
            </div>

            <p className="text-center">Eщё</p>
          </button>
        </div>
      ) : (
        moreItems.map((item) => <FinanceItem key={item.id} item={item} />)
      )}
    </>
  );
};

export const FinanceSection = () => {
  const defaultItems = FINANCE_SECTION.slice(0, 8);
  return (
    <section className="pt-8 pb-8 pl-4 pr-4 mr-auto ml-auto w-full">
      <div className="grid grid-cols-3 gap-x-6  gap-y-4">
        {defaultItems.map((item) => (
          <FinanceItem key={item.id} item={item} />
        ))}
        <ShowMoreItem />
      </div>
    </section>
  );
};
