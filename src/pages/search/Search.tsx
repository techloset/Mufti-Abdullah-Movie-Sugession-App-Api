import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/MovieCard";
import { useLocation } from "react-router-dom";
import {
  searchMovies,
  selectAllSearch,
  selectIsLoadingSearch,
} from "../../redux/SearchSlice";
import Navbar from "../../components/navbar/Navbar";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/Store";
import Loader from "../../components/loader/Loader";
import { CardsType } from "../../constants/Types";

const Search = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  const searches = useSelector(selectAllSearch) || [];
  const isLoading = useSelector(selectIsLoadingSearch);
  const [query, setQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQuery = searchParams.get("query") || "";
    setQuery(newQuery);
  }, [location.search]);
  useEffect(() => {
    if (query) {
      dispatch(searchMovies(query)).catch((error) => {
        console.error("Error in searchMovies dispatch:", error);
      });
    }
  }, [dispatch, query]);

  const handleSearchChange = (query: string) => {
    setQuery(query);
    dispatch(searchMovies(query)).catch((error) => {
      console.error("Error in searchMovies dispatch:", error);
    });
  };
  return (
    <div className="md:bg-[#EBEAEA] sm:bg-[white]">
      <Navbar
        searchPlaceholder={"🔍Search Movies & Series here"}
        onSearchChange={handleSearchChange}
        // showSearchButton={true}
        showPlusButton={true}
        isSearchVisible={true}
      />

      <div className="container mx-auto p-4 font-roboto ">
        <div className="grid grid-cols-1 w-full my-4">
          <h1 className="font-bold text-[15px]">
            Showing search results for:{" "}
            <span className="text-[20px] text-[#7D7D7D]">{query}</span>
          </h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 sm:w-full w-[375px] gap-x-0 gap-y-4">
            {searches.length > 0
              ? searches.map((search: CardsType) => (
                  <div
                    key={search.id}
                    className="col-span-1 md:col-span-1 sm:w-[197px] w-[158px]"
                  >
                    <MovieCard
                      imageUrl={search.poster_path}
                      movieId={search.id}
                      rating={search.vote_average}
                    />
                  </div>
                ))
              : query && (
                  <div className="col-span-full text-center text-xl font-semibold">
                    No movies found for "{query}".
                  </div>
                )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
