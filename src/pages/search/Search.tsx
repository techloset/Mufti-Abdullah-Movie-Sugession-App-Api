import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/MovieCard";
import loader from "../../assets/loader/loader.svg";
import { useLocation } from "react-router-dom";
import { searchMoviesFulfilled } from "../../redux/SearchSlice";
import {
  Searchs,
  searchMovies,
  selectAllSearch,
  selectIsLoading,
} from "../../redux/SearchSlice";
import Navbar from "../../components/navbar/Navbar";

const Search = () => {
  const dispatch = useDispatch();
  const searches = useSelector(selectAllSearch) || [];
  const [searchQuery, setSearchQuery] = useState("");
  const isLoading = useSelector(selectIsLoading);
  const [query, setQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQuery = searchParams.get("query") || "";
    setQuery(newQuery);
  }, [location.search]);
  useEffect(() => {
    let isMounted = true;
    if (query) {
      dispatch(searchMovies(query) as any)
        .then((data: Searchs[]) => {
          if (isMounted) {
            dispatch(searchMoviesFulfilled(data));
          }
        })
        .catch((error: any) => {
          console.error("Error in searchMovies dispatch:", error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, query]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setQuery(query);
    dispatch(searchMovies(query) as any)
      .then((data: any) => {
        dispatch(searchMoviesFulfilled(data));
      })
      .catch((error: any) => {
        console.error("Error in searchMovies dispatch:", error);
      });
  };
  return (
    <>
      <Navbar
        searchPlaceholder={"Search for something specific"}
        onSearchChange={handleSearchChange}
        showSearchButton={true}
      />
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div
            role="status"
            className="flex items-center justify-center bg-white bg-opacity-80 p-8 rounded shadow-md"
          >
            <img
              src={loader}
              alt="svg loader"
              style={{ width: "50px", height: "50px" }}
            />

            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4 ">
        <div className="grid grid-cols-1 w-full my-4">
          <h1 className="font-bold">
            Search Results For: <span className="text-2xl">{query}</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {searches.length > 0 ? (
            searches.map((search: Searchs) => (
              <div key={search.id} className="col-span-1 md:col-span-1">
                <MovieCard
                  imageUrl={search.poster_path}
                  movieId={search.id}
                  rating={search.vote_average}
                />
              </div>
            ))
          ) : query ? (
            <div className="col-span-full text-center text-xl font-semibold">
              No movies found for "{query}".
            </div>
          ) : (
            <div className="col-span-full text-center text-xl font-semibold">
              Enter a search query.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
