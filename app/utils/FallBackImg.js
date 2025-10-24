"use client";

import { useEffect, useState } from "react";

export const FallBackImg = ({ src, offIcon, alt, className = "" }) => {
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

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={realSrc} alt={alt} className={className} />;
};
