import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../assets/icons/icon _bookmark_.png";
import loader from "../../assets/loader/loader.svg";
import SeasonCard from "../../components/seasonCard/SeasonCard";
import { useParams } from "react-router-dom";
import {
  fetchMovies,
  selectAllMovies,
  selectIsLoading,
} from "../../redux/MovieSlice";
import { fetchSeries, selectAllSeasons } from "../../redux/SeasonsSlice";
import { selectAllSearch } from "../../redux/SearchSlice";
import Navbar from "../../components/navbar/Navbar";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/Store";

export default function Movie() {
  const { movieId } = useParams();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const movies: Movie[] = useSelector(selectAllMovies);
  const seasons: Season[] = useSelector(selectAllSeasons);
  const searchs: Search[] = useSelector(selectAllSearch);
  const [movieData, setMovieData] = useState<Movie | Season | Search | null>(
    null
  );
  interface Movie {
    id: number;
    vote_average: number;
    poster_path: string;
    name: string;
    original_title: string;
    backdrop_path: string;
    overview: string;
  }

  interface Season {
    id: number;
    vote_average: number;
    poster_path: string;
    name: string;
    original_title: string;
    backdrop_path: string;
    overview: string;
  }

  interface Search {
    id: number;
    vote_average: number;
    poster_path: string;
    name: string;
    original_title: string;
    backdrop_path: string;
    overview: string;
  }

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSeries());
  }, [dispatch]);

  useEffect(() => {
    const matchedMovie = movies.find(
      (movie) => movie.id.toString() === movieId
    );
    const matchedSeries = seasons.find(
      (seasons) => seasons.id.toString() === movieId
    );
    const matchedSearch = searchs.find(
      (search) => search.id.toString() === movieId
    );

    if (matchedMovie) {
      setMovieData(matchedMovie);
    }
    if (matchedSeries) {
      setMovieData(matchedSeries);
    }
    if (matchedSearch) {
      setMovieData(matchedSearch);
    }
  }, [movies, seasons, , searchs, movieId]);
  if (movieData === null) {
    return <div>Id Data Not Found</div>;
  }

  if (fetchMovies.pending("peding")) {
    <div role="status">
      <img
        src={loader}
        alt="svg loader"
        style={{ width: "50px", height: "50px" }}
      />

      <span className="sr-only">Loading...</span>
    </div>;
  }
  return (
    <>
      <Navbar
        showSearchButton={true}
        searchPlaceholder={"Seach Seasons here"}
        onSearchChange={function (query: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="container mx-auto p-4 ">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          {movieData ? (
            <div className="col-span  sm:w-full">
              <p className=" font-bold text-4xl leading-9 ">
                {" "}
                {movieData.original_title}
              </p>
            </div>
          ) : (
            <div className="col-span font-bold text-4xl leading-9 sm:w-full">
              Movie not found
            </div>
          )}

          <div className="col-span flex flex-row justify-end p-2 sm:flex hidden">
            <button
              className="bg-[#D9D9D9] hover:bg-[#D2D2D2] flex flex-row rounded-full p-4 cursor-pointer text-black"
              disabled={isLoading}
            >
              <img src={Icon} alt="" className="md:mx-2 sm:mx-1" />
              <span>Add to watchlist</span>
            </button>
          </div>
        </div>
        {/* description section */}
        <div className="container mx-auto py-4">
          <div className="grid lg:grid-cols-2  sm:grid-cols-1 gap-3 flex flex-col justify-between">
            <div className="grid md:grid-cols-2 sm:grid-cols-1  z-10 md:static absolute gap-5">
              <div className="my-3 sm:w-full  w-[100px] flex justify-center relative md:top-0 md:left-0 top-16 left-8">
                <img
                  className="sm:w-[49px] md:w-full lg:w-[196px] rounded-[2rem]"
                  src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
                  alt=""
                />
              </div>

              <div className="me-2 w-[500] my-5 ps-0 relative md:top-0 md:left-0 top-16 left-1">
                <span className="rounded-full border-2 border-black border-solid px-3 py-1 me-2 ">
                  Action
                </span>
                <span className="rounded-full border-2 border-black border-solid px-3 py-1 ms-2">
                  Sci Fiction
                </span>
                <p className="color-black font-bold text-l mt-4 mb-10">
                  {movieData.overview.slice(0, 300)}
                </p>
                <h3>IBM Rating</h3>
                <span className="text-xl">
                  ⭐{Math.round(movieData.vote_average)}
                </span>{" "}
                <span>/10</span>
              </div>
            </div>
            <div className="grid grid-cols-1 w-full  md:static relative ">
              <div className="mx-3 my-5 w-full">
                <img
                  className="rounded-[20px] h-full"
                  src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
                  width="700"
                  height="500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-96  md:my-2  mx-auto py-4">
        <div className="grid grid-cols-2 gap-4 mb-6 ">
          <div className="flex flex-row gap-4">
            <h1 className="font-bold text-4xl leading-9">Seasons</h1>
            <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black">
              1
            </span>
            <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black">
              2
            </span>
            <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black">
              3
            </span>
            <span className="cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black">
              4
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 p-2">
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
    </>
  );
}
