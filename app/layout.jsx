"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { Footer } from "./ui/Footer";
import Header from "./ui/Header.jsx";
import { CityProvider } from "./ui/HeadersComponents/ContextApi/CityContext";
import { ModalProvider } from "./contextApi/ModalContext";
import { SearchBlockProvider } from "./contextApi/SearchBlockContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <html lang="en">
      <head>
        <meta name="yandex-verification" content="ee8c03bb26c7d932" />
      </head>
      <body>
        <SearchBlockProvider>
          <CityProvider>
            <ModalProvider>
              <Header />
              {children}
              <Footer />
              <div className={isHome ? "max-lg:mt-30" : ""} />
            </ModalProvider>
          </CityProvider>
        </SearchBlockProvider>
      </body>
    </html>
  );
}
