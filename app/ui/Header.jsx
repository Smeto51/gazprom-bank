"use client";

import "./header.css";

import HeaderMenu from "./HeadersComponents/HeaderMenu";
import HeaderNavPanel from "./HeadersComponents/HeaderNavPanel";
import HeaderSearching from "./HeadersComponents/HeaderMagnifierSearching";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();
  const ignoreClickRef = useRef(false);
  const { width: windowWidth } = useWindowSize();

  useLayoutEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useLayoutEffect(() => {
    const handleClickOutside = (e) => {
      if (ignoreClickRef.current) {
        ignoreClickRef.current = false;
        return;
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  const handleSearchClick = () => {
    ignoreClickRef.current = true;
    setShowSearch(!showSearch);
  };

  return (
    <header className="w-full">
      <div className="header_full_main_menu">
        <HeaderMenu onSearchClick={handleSearchClick} />

        <div className="hidden lg:block h-full">
          <HeaderNavPanel />

          {
            <div
              ref={searchRef}
              className={`absolute left-0 right-0 transition duration-300 ease-out ${
                showSearch
                  ? "translate-y-0 opacity-100 "
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              <HeaderSearching onClose={() => setShowSearch(false)} />
            </div>
          }
        </div>
      </div>
    </header>
  );
};
//#4768BF0
export default Header;
