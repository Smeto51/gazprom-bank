"use client";

import { FallBackImg } from "@/app/utils/FallBackImg";
import Link from "next/link";

export const Banners = ({ b }) => {
  return (
    <div className="max-[1023px]:max-w-3xl">
      {b.map((banners) => (
        <div key={banners.id} className="p-4 mt-4 ">
          <div
            className={`rounded-2xl p-4  relative`}
            style={{ background: banners.bg }}
          >
            <Link href={banners.link} className={`text-${banners.textColor}`}>
              <div className={`flex flex-shrink-0 items-center min-h-[68px]`}>
                <div className={`max-w-[60%] min-w-[200px]`}>
                  <h3 className="font-semibold">{banners.title}</h3>
                  <p>{banners?.desc}</p>
                </div>
                <div className="absolute right-0 top-0 max-w-[148px] h-[100px]">
                  <FallBackImg
                    src={banners.icon}
                    offIcon={banners.localIcon}
                    alt={banners.title}
                    className="min-h-[80px]"
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
