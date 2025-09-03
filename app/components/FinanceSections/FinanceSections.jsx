"use client";

import Link from "next/link";
import { FINANCE_SECTION } from "./data/constants";
import { useEffect, useState } from "react";

export const FinanceSection = () => {
  return (
    <section>
      <div className="grid grid-cols-3">
        {FINANCE_SECTION.map((item) => (
          <div key={item.id}>
            <Link href={item.link} className="flex flex-col items-center">
              <FallBackImg
                src={item.icon}
                offIcon={item.offIcon}
                alt={item.name}
              />
              <p>{item.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

const FallBackImg = ({ src, offIcon, alt }) => {
  const [realSrc, setRealSrc] = useState(offIcon);

  useEffect(() => {
    let cancelled = false;

    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setRealSrc(src);
    };
    img.onerror = () => {
      if (!cancelled) setRealSrc(offIcon);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, offIcon]);

  return <img src={realSrc} alt={alt} />;
};
