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
import { ProductCategories } from "./components/ProductCategories/ProductCategories";
import { Popular } from "./components/Popular/Popular";
import { MobileApp } from "./components/Desktop/AppMobile/MobileApp";

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
        <div className="hidden lg:block lg:max-w-[864px] lg:pl-11 lg:pr-11 mx-auto">
          <SearchTheSite />
        </div>
        <div className="lg:hidden ">
          <BestOffers />
          <Banners b={BANNERS_1} />
        </div>

        <Calculation />
        <div className="max-lg:hidden">
          <ProductCategories />
          <Popular />
          <section className="pl-11 pr-11 pt-15 pb-16 ">
            <MobileApp />
          </section>
        </div>

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
