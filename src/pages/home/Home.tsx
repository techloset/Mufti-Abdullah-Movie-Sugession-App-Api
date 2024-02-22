import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/MovieCard";
import {
  fetchMovies,
  selectAllMovies,
  selectIsLoading,
} from "../../redux/MovieSlice";
import { searchMovies } from "../../redux/SearchSlice";
import Navbar from "../../components/navbar/Navbar";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { RootState } from "../../redux/Store";
import Loader from "../../components/loader/Loader";
import { CardsType } from "../../constants/Types";

export default function Home() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const movies: CardsType[] = useSelector(selectAllMovies);
  const isLoading = useSelector(selectIsLoading);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    dispatch(fetchMovies());
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const handleSearchChange = (query: string) => {
    dispatch(searchMovies(query));
  };

  return (
    <div className="md:bg-[#EBEAEA] sm:bg-[white]">
      <Navbar
        searchPlaceholder={"🔍 Search movie or a series"}
        onSearchChange={handleSearchChange}
        showSearchButton={true}
        showPlusButton={true}
      />
      {isLoading && movies ? (
        <Loader />
      ) : (
        <>
          <div className="container mx-auto flex flex-col justify-center items-center font-roboto">
            <div className="w-full gap-6 flex-wrap flex sm:flex-row flex-col sm:justify-between justify-center">
              {/* Trending Section  */}

              <div className="md:w-[30%] w-full ps-3">
                <h1 className="py-3 mb-4 mt-7 text-[20px] font-medium font-roboto">
                  Popular Movies
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  {movies.slice(10, 14).map((movie) => (
                    <div key={movie.id} className="md:col-span-1 sm:col-span-2">
                      <MovieCard
                        imageUrl={movie.poster_path}
                        movieId={movie.id}
                        rating={Math.round(movie.vote_average)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Section */}

              <div className="md:w-[60%] w-full sm:grid hidden">
                <h1 className="py-3 mb-4 mt-7 text-[20px] font-medium font-roboto">
                  Trending
                </h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
                  {movies.slice(0, 8).map((movie) => (
                    <div key={movie.id}>
                      <MovieCard
                        imageUrl={movie.poster_path}
                        movieId={movie.id}
                        rating={Math.round(movie.vote_average)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Popular Released Section */}

          <div className="container mx-auto mb-4 pt-4">
            <h1 className="sm:ms-0 ms-3 py-3 mb-4 mt-7 text-[20px] font-medium font-roboto">
              Popular Released
            </h1>
            {isDesktop ? (
              <div className="flex flex-row overflow-x-auto h-[263px]  py-2 px-3 scrollbar-hidden  gap-4">
                {movies.map((movie) => (
                  <div key={movie.id} className="">
                    <MovieCard
                      imageUrl={movie.poster_path}
                      movieId={movie.id}
                      rating={Math.round(movie.vote_average)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 mx-2 gap-y-3 gap-x-8 ">
                {movies.map((movie) => (
                  <div key={movie.id} className="">
                    <MovieCard
                      imageUrl={movie.poster_path}
                      movieId={movie.id}
                      rating={Math.round(movie.vote_average)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
