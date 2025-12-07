"use client";

import { useEffect, useState } from "react";

export const FallBackImg = ({ src, offIcon, alt, className = "" }) => {
  const safeSrc = src ?? null;
  const safeOff = offIcon ?? null;

  const [realSrc, setRealSrc] = useState(offIcon);

  useEffect(() => {
    if (!safeSrc && !safeOff) {
      setRealSrc(null);
      return;
    }

    if (!safeSrc) {
      setRealSrc(safeOff);
      return;
    }
    let cancelled = false;

    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setRealSrc(safeSrc);
    };
    img.onerror = () => {
      if (!cancelled) setRealSrc(safeOff);
    };
    img.src = safeSrc;

    return () => {
      cancelled = true;
    };
  }, [safeOff, safeSrc]);
  if (!realSrc) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={realSrc} alt={alt} className={className} />;
};
