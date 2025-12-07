"use client";
import { SearchInput } from "@/app/components/Desktop/SearchTheSite/SearchInput";
import { memo, useCallback, useState } from "react";

type HeaderSearchingProps = { onClose: () => void };

const HeaderSearching = memo(({ onClose }: HeaderSearchingProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleClearInput = useCallback(() => {
    setSearchValue("");
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handleSearch = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div className="relative lg:h-auto ">
      <div className="relative w-full flex  bg-white z-10 rounded-b-2xl ">
        <div className="flex w-full mx-auto space-x-7 wrapper lg:p-10">
          <SearchInput
            searchValue={searchValue}
            handleInputChange={handleInputChange}
            handleClearInput={handleClearInput}
            handleSearch={handleSearch}
            id="HeaderSearch"
          />
        </div>
      </div>
      <div
        className="absolute top-0 left-0 bg-black/50 w-full h-[100vh] z-0 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
});

HeaderSearching.displayName = "HeaderSearching";

export default HeaderSearching;
