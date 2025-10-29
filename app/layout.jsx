"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { Footer } from "./ui/Footer";
import Header from "./ui/Header.jsx";
import { CityProvider } from "./ui/HeadersComponents/ContextApi/CityContext";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <html lang="en">
      <body>
        <CityProvider>
          <Header />
          {children}
          <Footer />
          <div className={isHome ? "mt-20" : ""} />
        </CityProvider>
      </body>
    </html>
  );
}
