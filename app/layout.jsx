"use client";

import "./globals.css";
import { Footer } from "./ui/Footer";
import Header from "./ui/Header.jsx";
import { CityProvider } from "./ui/HeadersComponents/ContextApi/CityContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CityProvider>
          <Header />
          {children}
          <Footer />
        </CityProvider>
      </body>
    </html>
  );
}
