"use client";

import { TestBlock } from "./components/TestBlock/TestBlock";
import { TitleBannerProduct } from "./components/TitleBanner/TitleBannerProduct";

export default function CashBackPage() {
  return (
    <div className="xl:max-w-7xl xl:mx-auto">
      <TitleBannerProduct />
      <TestBlock />
    </div>
  );
}
