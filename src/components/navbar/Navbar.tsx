import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlusIcon from "../../assets/icons/+.png";
interface NavbarProps {
  searchPlaceholder: string;
  onSearchChange: (query: string) => void;
  showSearchButton?: boolean;
  showPlusButton?: boolean;
  isSearchVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  searchPlaceholder,
  onSearchChange,
  showSearchButton,
  showPlusButton,
  isSearchVisible,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentPathname = window.location.pathname;
    const shouldNavigate = currentPathname !== "/search";

    if (shouldNavigate) {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
      setSearchQuery(encodedQuery);
      setSearchQuery(searchQuery);
    } else {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
      setSearchQuery(encodedQuery);
      onSearchChange(searchQuery);
      setSearchQuery(searchQuery);
    }
  };

  return (
    <nav className="p-4 w-full ">
      <div className="container mx-auto flex items-center justify-between">
        <div className=" max-w-[130px] max-h-[106px]">
          <Link
            to="/"
            className="text-[black] font-roboto text-[35px] font-semibold leading-[36px]"
          >
            The Movie Tracker
          </Link>
        </div>
        <div className="flex-grow flex items-center justify-end sm:hidden">
          {showSearchButton && (
            <Link to="/search">
              <button className=" bg-input h-[37px] w-[39px] rounded-[30px] focus:outline-none text-[20px] font-bold">
                <span className="w-[14px] h-[20px]">🔍</span>
              </button>
            </Link>
          )}
          {showPlusButton && (
            <button className=" ms-[20px] text-center  bg-input h-[37px] w-[39px] rounded-[30px] focus:outline-none  font-bold">
              <img src={PlusIcon} className="ps-2.5" alt="Plus Icon Image" />
            </button>
          )}
        </div>
        <div
          className={`flex-grow  items-center justify-center sm:flex hidden`}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="sm:w-full md:w-[630px] rounded-[30px] bg-input h-[57px]  py-[14px] px-[185px]  focus:ring focus:border-blue-300"
          >
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="placeholder-[black] text-[20px] font-normal leading-[23px] text-center font-roboto text-[black] focus:outline-none  bg-input  w-[259px] h-[23px] "
            />
          </form>
        </div>
      </div>
      {isSearchVisible && (
        <div className="container mx-auto my-5 sm:hidden   flex items-center justify-center transition-all duration-2000 ease-in-out">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 rounded-[30px] text-[12px] font-normal leading-[14px]  font-roboto placeholder-[black] focus:outline-none text-center bg-input  focus:ring focus:border-blue-300 w-[350px]   h-[57px]"
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
