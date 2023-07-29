import React from "react";
import SearchModal from "./search-modal/SearchModal";

const SearchBar = () => {
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  return (
    <>
      {openSearchModal && (
        <SearchModal isOpen={openSearchModal} setIsOpen={setOpenSearchModal} />
      )}
      <div
        className="relative hidden w-96  cursor-pointer sm:block"
        onClick={() => {
          setOpenSearchModal(true);
        }}
      >
        <label htmlFor="icon" className="sr-only">
          Search
        </label>
        <div className="relative active:border-2 rounded-lg focus:border-blue-500 focus:bg-gray-100 focus:ring-blue-500">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
          <input
            type="text"
            id="icon"
            name="icon"
            disabled
            className="block w-full cursor-pointer rounded-md border-gray-200 py-2 px-4 pl-11 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:bg-gray-100 focus:ring-blue-500   "
            placeholder="Search"
          />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
