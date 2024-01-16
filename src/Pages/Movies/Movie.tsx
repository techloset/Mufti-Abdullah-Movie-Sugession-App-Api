import React, { useState } from 'react'
// Import statements...
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from "../../assets/icons/icon _bookmark_.png"
import SeasonCard from '../../components/seasonCard/SeasonCard'

// import { addToWatchList, fetchMovies, fetchSeries, selectAllMovies, selectIsLoading } from '../../redux/Store';
import { useParams } from 'react-router-dom';
import { fetchMovies, selectAllMovies, selectIsLoading } from '../../redux/MovieSlice';
import { fetchSeries, selectAllSeasons } from '../../redux/SeasonsSlice';
import { selectAllSearch } from '../../redux/SearchSlice';
import Navbar from '../../components/navbar/Navbar';


export default function Movie() {
  const { movieId } = useParams();
  // console.log(movieId)
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const series = useSelector(selectAllSeasons);
  const movies = useSelector(selectAllMovies);
  const searchs = useSelector(selectAllSearch);
  const [movieData, setMovieData] = useState(null);
  
  useEffect(() => {
    dispatch(fetchMovies() as any);
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSeries() as any);
  }, [dispatch]);

  useEffect(() => {
    const matchedMovie = movies.find(movie => movie.id.toString() === movieId);
    const matchedSeries = series.find(series => series.id.toString() === movieId);
    const matchedSearch = searchs.find(search => search.id.toString() === movieId);

    if (matchedMovie) {
      setMovieData(matchedMovie);
    }
    if(matchedSeries){
      setMovieData(matchedSeries)
    }
    if(matchedSearch){
      setMovieData(matchedSearch)
    }
  }, [movies,series,,searchs, movieId]);
  if (movieData === null) {
    return <div>Id Data Not Found</div>;
  }
  
  if(fetchMovies.pending("peding")){

<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

  }
  // console.log("Movie Data:", movieData);
  // console.log((movieData as any).original_title)



// i commit this because it can not authorized api 


// const handleAddToWatchList = () => {
  //   dispatch(addToWatchList()as any);

  // };
  return (
    <>
    <Navbar   showSearchButton={true}
        // showPlusButton={true}
      searchPlaceholder={'Seach Seasons here'}
       onSearchChange={function (query: string): void {
        throw new Error('Function not implemented.')
      } 
      }/>
<div className="container mx-auto p-4 ">
  <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
  
  {movieData ? (
  <div className="col-span  sm:w-full">
 <p className=' font-bold text-4xl leading-9 '>    {(movieData as any).original_title}</p>
  </div>
) : (
  <div className="col-span font-bold text-4xl leading-9 sm:w-full">
    Movie not found
  </div>
)}

    <div className="col-span flex flex-row justify-end p-2 sm:flex hidden">
    <button
      className='bg-[#D9D9D9] hover:bg-[#D2D2D2] flex flex-row rounded-full p-4 cursor-pointer text-black'
      // onClick={handleAddToWatchList}
      disabled={isLoading} 
    >
      <img src={Icon} alt="" className='md:mx-2 sm:mx-1' />
      <span>Add to watchlist</span>
    </button>
    </div>
  </div>
  {/* description section */}
  <div className="container mx-auto py-4">
  <div className="grid lg:grid-cols-2  sm:grid-cols-1 gap-3 flex flex-col justify-between">
<div className="grid md:grid-cols-2 sm:grid-cols-1  z-10 md:static absolute gap-5">
<div className="my-3 sm:w-full  w-[100px] flex justify-center relative md:top-0 md:left-0 top-16 left-8">
  <img className='sm:w-[49px] md:w-full lg:w-[196px] rounded-[2rem]' src=
  
     {`https://image.tmdb.org/t/p/original/${(movieData as any).poster_path
    }` }
     alt="" />
</div>

    <div className="me-2 w-[500] my-5 ps-0 relative md:top-0 md:left-0 top-16 left-1">
      <span className='rounded-full border-2 border-black border-solid px-3 py-1 me-2 '>Action</span>
      <span className='rounded-full border-2 border-black border-solid px-3 py-1 ms-2'>Sci Fiction</span>
      <p className='color-black font-bold text-l mt-4 mb-10'>
       {(movieData as any).overview.slice(0,300)
     }
        </p>
    <h3>IBM Rating</h3>
    <span className='text-xl'>
    ⭐
       {Math.round((movieData as any).vote_average)
     }
      </span> <span>/10</span>
    </div>
</div>
<div className="grid grid-cols-1 w-full  md:static relative ">
    <div className="mx-3 my-5 w-full">
    <img className='rounded-[20px] h-full' src=
         {`https://image.tmdb.org/t/p/original/${(movieData as any).backdrop_path}` }
         width="700" height="500" />
</div>
    </div>
    </div>
  </div>
  </div>
  <div className="container mt-96  md:my-2  mx-auto py-4">
    <div className="grid grid-cols-2 gap-4 mb-6 ">
      <div className='flex flex-row gap-4'>
        <h1 className='font-bold text-4xl leading-9'>Seasons</h1>
        <span className='cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black'>1</span>
        <span className='cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black'>2</span>
        <span className='cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black'>3</span>
        <span className='cursor-pointer  hover:bg-[#D2D2D2] flex flex-row rounded-full p-2  bg-[#D9D9D9] text-black'>4</span>
      </div>
    </div>
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 p-2">
      {series.map((serie) => (
        <div key={serie.id}>
          <SeasonCard
            imageUrl={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            movieId={serie.id}
            rating={serie.vote_average}
            name={serie.name}
        
          />
        </div>
      ))}
    </div>
  </div>
    </>
  )
}  
