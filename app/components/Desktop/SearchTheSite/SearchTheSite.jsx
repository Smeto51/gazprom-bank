"use client";

import { useCallback, useState } from "react";
import { SerachInput } from "./SearchInput";

const typesSearch = [
  { id: 1, desc: "Что входит в Газпром Бонус?" },
  { id: 2, desc: "Где скачать приложение?" },
  { id: 3, desc: "Курсы валют" },
  { id: 4, desc: "Рефинансирование" },
  { id: 5, desc: "Как начать инвестировать?" },
];

export const SearchTheSite = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleClearInput = useCallback(() => {
    setSearchValue("");
  }, []);

  const handleInputChange = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {}, []);

  return (
    <div className="lg:max-w-[864px] lg:pl-11 lg:pr-11 mx-auto">
      <h2 className="flex text-5xl justify-center mt-20 font-semibold">
        Поиск по сайту
      </h2>
      <div className="flex gap-4 mt-10">
        <SerachInput
          searchValue={searchValue}
          handleInputChange={handleInputChange}
          handleClearInput={handleClearInput}
          handleSearch={handleSearch}
        />
      </div>
      <div className="flex gap-3 flex-wrap justify-center mt-4 items-center">
        {typesSearch.map((items, index) => (
          <div key={index} className="bg-gray-400/20 rounded-[8px] px-4 py-2">
            {items.desc}
          </div>
        ))}
      </div>
    </div>
  );
};
