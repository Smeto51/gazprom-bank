"use client";

import "./header.css";

import HeaderMenu from "./HeadersComponents/HeaderMenu";
import HeaderNavPanel from "./HeadersComponents/HeaderNavPanel";
import HeaderSearching from "./HeadersComponents/HeaderMagnifierSearching";
import { useState } from "react";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header className="w-full">
      <div className="header_full_main_menu">
        <HeaderMenu onSearchClick={() => setShowSearch(!showSearch)} />
        <HeaderNavPanel />
        <div
          className={`fixed left-0 right-0 transition duration-300 ease-out ${
            showSearch
              ? "translate-y-0 opacity-100 "
              : "-translate-y-full opacity-0"
          }`}
        >
          {showSearch && <HeaderSearching />}
        </div>
      </div>
    </header>
  );
};
//#4768BF0
export default Header;
