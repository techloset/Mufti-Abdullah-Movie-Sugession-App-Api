import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

interface NavbarProps {
  searchPlaceholder: string;
  onSearchChange: (query: string) => void;
  showSearchButton?: boolean;
  showPlusButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ searchPlaceholder,onSearchChange ,  showSearchButton, showPlusButton}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // navigate('/search')
     setSearchQuery(event.target.value);
    // onSearchChange(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Check the current pathname to determine whether to navigate or not
    const currentPathname = window.location.pathname;
    const shouldNavigate = currentPathname !== '/search';
  
    if (shouldNavigate) {
      // Navigate to the movie page along with the search query
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
      setSearchQuery(encodedQuery);
      setSearchQuery(searchQuery)
      
    } else {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
      setSearchQuery(encodedQuery);
      onSearchChange(searchQuery);
      setSearchQuery(searchQuery);
      // If already on the movie page, just trigger the search
    }
  };
  

  return (
    <nav className="p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-black" style={{
          fontFamily: 'FONTSPRING DEMO - Caros Bold',
          fontSize: '35px',
          fontWeight: 600,
          lineHeight: '30px',
        }}>
          <Link to="/">
          The <br />Movie <br />Tracker
          </Link>
        </div>
        <div className="flex-grow flex items-center justify-center sm:hidden">
        {showSearchButton && (
            <button className="text-white focus:outline-none " onClick={toggleSearch}>
              🔍
            </button>
          )}
          {showPlusButton && (
            <button className="text-black ms-1 focus:outline-none" style={{
              fontFamily: "Rounded Mplus 1c Bold",
              fontSize: "30px",
              fontWeight: 700,
            }}>
              +
            </button>
          )}
        </div>
        <div className={`flex-grow flex items-center justify-center sm:flex hidden`}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md focus:outline-none text-center   focus:ring focus:border-blue-300 sm:w-full md:w-96 lg:w-[40rem]"
            style={{
              background: '#D9D9D9',
              borderRadius: '30px',
            }}
          />
        </form>
      </div>  
      </div>
        {isSearchVisible && (
        <div className="container mx-auto my-5 sm:hidden block flex items-center justify-center transition-all duration-2000 ease-in-out">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:w-full md:w-96 lg:w-[40rem] responsive-search-input"
              style={{
                background: '#D9D9D9',
                borderRadius: '30px',
              }}
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
