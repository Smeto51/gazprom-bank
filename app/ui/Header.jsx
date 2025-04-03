"use client";

import "./header.css";

import HeaderMenu from "./HeadersComponents/HeaderMenu";
import HeaderNavPanel from "./HeadersComponents/HeaderNavPanel";
import HeaderSearching from "./HeadersComponents/HeaderMagnifierSearching";

const Header = () => {
  return (
    <header className="w-full">
      <div className="header_full_main_menu">
        <HeaderMenu />
        <HeaderNavPanel />
        <HeaderSearching />
      </div>
    </header>
  );
};
//#4768BF0
export default Header;
