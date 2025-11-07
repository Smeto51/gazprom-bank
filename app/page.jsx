"use client";

import { SectionUsefull } from "./components/UsefullWindow/UsefullSection";
import { FinanceSection } from "./components/FinanceSections/FinanceSections";
import { BestOffers } from "./components/BestOffers/BestOffers";
import { Banners } from "./components/Banners/Banners";
import { Calculation } from "./components/Calculation/Calculation";
import { BANNERS_1, BANNERS_2 } from "./components/Banners/data/constant";
import { ServicesForYou } from "./components/ServicesForYou/ServicesForYou";
import { LastNews } from "./components/News/News";
import { SearchHome } from "./components/SearchBlock/SearchBlock";
import { FinProfuct } from "./components/FinanceProduct/FinanceProguct";
import { SearchTheSite } from "./components/Desktop/SearchTheSite/SearchTheSite";

export default function Home() {
  const searchIndex = 0;
  return (
    <div className="">
      <div className="max-[1024px]:max-w-3xl max-[1024]:ml-auto max-[1024px]:mr-auto">
        <FinProfuct />
        <div className="pb-8 -z-100" />
        <SectionUsefull />
        <div className="lg:hidden">
          <FinanceSection />
        </div>
        <div className="hidden lg:block">
          <SearchTheSite />
        </div>
        <BestOffers />
        <Banners b={BANNERS_1} />
        <Calculation />
        <ServicesForYou />
        <Banners b={BANNERS_2} />
        <LastNews />
      </div>
      <span className="lg:hidden">
        <SearchHome searchIndex={searchIndex} />
      </span>
    </div>
  );
}
