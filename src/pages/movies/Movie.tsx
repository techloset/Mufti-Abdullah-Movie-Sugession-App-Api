// Important Notice that when data is get from the search page and you refresh the page then qury is null and data can not show here.
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../assets/icons/icon _bookmark_.png";
import SeasonCard from "../../components/seasonCard/SeasonCard";
import { useParams } from "react-router-dom";
import {
  fetchMovies,
  selectAllMovies,
  selectIsLoading,
} from "../../redux/MovieSlice";
import {
  fetchSeries,
  selectAllSeasons,
  selectIsLoadingSeason,
} from "../../redux/SeasonsSlice";
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

export default function Movie() {
  const { movieId } = useParams();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isLoadingSearch = useSelector(selectIsLoadingSearch);
  const isLoadingSeason = useSelector(selectIsLoadingSeason);
  const movies: CardsType[] = useSelector(selectAllMovies);
  const seasons: CardsType[] = useSelector(selectAllSeasons);
  const searchs: CardsType[] = useSelector(selectAllSearch);
  const [movieData, setMovieData] = useState<
    CardsType | CardsType | CardsType | null
  >(null);
  // Inside the useEffect where you fetch movies and series
  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchSeries());
    dispatch(searchMovies(movieId as string)).catch((error) => {
      console.error("Error fetching movies and series:", error);
    });
  }, [dispatch]);

  // Inside the second useEffect where you setMovieData
  useEffect(() => {
    const matchedMovie = movies.find(
      (movie) => movie.id.toString() === movieId
    );
    const matchedSeries = seasons.find(
      (season) => season.id.toString() === movieId
    );
    const matchedSearch = searchs.find(
      (search) => search.id.toString() === movieId
    );

    if (matchedMovie) {
      setMovieData(matchedMovie);
    } else if (matchedSeries) {
      setMovieData(matchedSeries);
    } else if (matchedSearch) {
      setMovieData(matchedSearch);
    } else {
      console.error("No matching data found for movieId:", movieId);
    }
  }, [movies, seasons, searchs, movieId]);
  const lastSearchResult = searchs[searchs.length - 1];

  return (
    <>
      <Navbar
        showSearchButton={true}
        searchPlaceholder={"Seach Seasons here"}
        onSearchChange={function (query: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      {isLoading || isLoadingSearch || isLoadingSeason ? (
        <Loader />
      ) : (
        (movieData || lastSearchResult) && (
          <>
            <div className="container mx-auto p-4 font-roboto">
              <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-1">
                <div className="col-span  sm:w-full">
                  <p className=" font-bold text-[40px] font-roboto leading-9 my-4">
                    {(movieData || lastSearchResult)?.original_title}
                  </p>
                </div>

                <div className="col-span  flex-row justify-end p-2 sm:flex hidden gap-x-6">
                  <button
                    className="bg-[#D9D9D9] hover:bg-[#D2D2D2] flex flex-row rounded-full p-4 cursor-pointer text-black"
                    disabled={isLoading}
                  >
                    <img
                      src={Icon}
                      alt=""
                      className="md:mx-2 sm:mx-1 text-[15px]"
                    />
                    <span>Add to watchlist</span>
                  </button>
                </div>
              </div>
              {/* description section */}
              <div className="container mx-auto py-4">
                <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2">
                  {/* Container for Poster Image */}
                  <div className="flex sm:flex-row flex-col z-10 relative">
                    <div className="sm:w-[196px]  w-[98px] my-auto relative md:top-0 md:left-0 top-16 left-8">
                      <img
                        className="sm:w-[98px] md:w-full lg:w-[196px] rounded-[2rem]"
                        src={`https://image.tmdb.org/t/p/original/${
                          (movieData || lastSearchResult)?.poster_path
                        }`}
                        alt=""
                      />
                    </div>

                    <div className="my-5 sm:w-[413px] w-[334px] sm:ps-5 ps-0 flex flex-col pe-2 relative md:top-0 md:left-0 top-16 left-2">
                      <div className="flex flex-row text-[18px]">
                        <span className="rounded-full border-2 border-black border-solid px-3 py-1 me-2">
                          Action
                        </span>
                        <span className="rounded-full border-2 border-black border-solid px-3 py-1 ms-2">
                          Sci Fiction
                        </span>
                      </div>
                      <p className="color-black font-medium text-[18px] text-wrap w-auto mt-4 mb-10">
                        {(movieData || lastSearchResult)?.overview.slice(
                          0,
                          300
                        )}
                      </p>
                      <h3 className="text-[18px] font-normal font-roboto">
                        IBM Rating
                      </h3>
                      {movieData?.vote_average && (
                        <span className="text-[15px]">
                          ⭐
                          {Math.round(
                            (movieData || lastSearchResult).vote_average
                          )}
                          /{<span className="text-[12px]">10</span>}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 w-auto md:static relative top-[-570px]">
                    <div className="ms-auto my-5 h-auto w-auto">
                      <img
                        className="rounded-[20px] md:w-full lg:w-[521px] sm:w-[334] h-full"
                        src={`https://image.tmdb.org/t/p/original/${
                          (movieData || lastSearchResult)?.backdrop_path
                        }`}
                        alt="Backdrop-path"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
      {isLoadingSeason ? (
        <Loader />
      ) : (
        <div className="container   md:my-2  mx-auto py-4 font-roboto">
          <div className="grid grid-cols-2 gap-4 mb-6 ">
            <div className="flex flex-row gap-4">
              <h1 className="font-bold text-[30px] leading-9 my-auto mx-2">
                Seasons
              </h1>
              <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-xl p-3  bg-[#D9D9D9] text-black text-[20px] font-bold">
                1
              </span>
              <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-xl p-3  bg-[#D9D9D9] text-black text-[20px] font-bold">
                2
              </span>
              <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-xl p-3  bg-[#D9D9D9] text-black text-[20px] font-bold">
                3
              </span>
              <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-xl p-3  bg-[#D9D9D9] text-black text-[20px] font-bold">
                4
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-2 sm:ms-0 ms-5 gap-4 p-2">
            {seasons.map((season) => (
              <div key={season.id}>
                <SeasonCard
                  imageUrl={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                  movieId={season.id}
                  rating={season.vote_average}
                  name={season.name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
