"use client";

import { FallBackImg } from "@/app/utils/FallBackImg";
import { SERVICES_ITEMS } from "./data/constant";
import Link from "next/link";

export const ServicesForYou = () => {
  return (
    <div>
      <h2 className="text-[28px] font-semibold pl-4 pt-8 leading-8 pb-8">
        Услуги для вас
      </h2>
      {SERVICES_ITEMS.map((services) => (
        <Link href={services.link} key={services.id}>
          <div key={services.id} className="p-4">
            <div
              style={{ background: services.bg }}
              className="rounded-2xl pl-4 pt-4"
            >
              <div className="mb-2 font-semibold text-[24px]">
                <span className="">{services.title}</span>
              </div>

              <div>
                <span>{services?.desc}</span>
              </div>

              <FallBackImg
                src={services.icon}
                offIcon={services.localIcon}
                alt={services.title}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
