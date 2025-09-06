"use client";

import Link from "next/link";
import { BANNERS } from "./data/constant";
import { FallBackImg } from "@/app/utils/FallBackImg";

// max-[1023px]:ml-auto max-[1023px]:mr-auto
export const Banners = () => {
  return (
    <div className="max-[1023px]:max-w-3xl">
      {BANNERS.map((banners) => (
        <div key={banners.id} className="p-4 mt-4 ">
          <div className={`rounded-2xl p-4`} style={{ background: banners.bg }}>
            <Link href={banners.link} className={`text-${banners.textColor}`}>
              <div className={`flex flex-shrink-0`}>
                <div className={`max-w-[60%] min-w-[200px]`}>
                  <h3 className="font-semibold">{banners.title}</h3>
                  <p>{banners.desc}</p>
                </div>
                <div className="">
                  <FallBackImg
                    src={banners.icon}
                    offIcon={banners.localIcon}
                    alt={banners.title}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
