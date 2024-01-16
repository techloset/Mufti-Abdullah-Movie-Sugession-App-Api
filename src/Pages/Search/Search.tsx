// Search.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../../components/movieCard/MovieCard';
// import { fetchMovies, selectAllMovies, Movie, searchMovies, selectIsLoading } from '../../redux/Store';

import { useLocation } from 'react-router-dom';
// import { Movie, selectAllMovies, selectIsLoading } from '../../redux/MovieSlice';
import { searchMoviesFulfilled } from '../../redux/SearchSlice';
import { Searchs, searchMovies, selectAllSearch, selectIsLoading } from '../../redux/SearchSlice';
import Navbar from '../../components/navbar/Navbar';

const Search = () => {
  const dispatch = useDispatch();
  const searches = useSelector(selectAllSearch) || [];
  const [searchQuery, setSearchQuery] = useState('');
  const isLoading = useSelector(selectIsLoading);
  const [query, setQuery] = useState('');


  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQuery = searchParams.get('query') || '';
    setQuery(newQuery);
  }, [location.search]);
  useEffect(() => {
    let isMounted = true;
  
    // Only fetch movies if there is a valid query
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
        searchPlaceholder={'Search for something specific'}
        onSearchChange={handleSearchChange}
        showSearchButton={true}
        // showPlusButton={true}
     
      />
         {isLoading && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div role="status" className="flex items-center justify-center bg-white bg-opacity-80 p-8 rounded shadow-md">
        <svg
          aria-hidden="true"
          className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    
      )}
 <div className="container mx-auto p-4 ">
  <div className="grid grid-cols-1 w-full my-4">
    <h1 className="font-bold">Search Results For: <span className="text-2xl">{query}</span></h1>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
  {searches.length > 0 ? (
  searches.map((search: Searchs) => (
    <div key={search.id} className="col-span-1 md:col-span-1">
      <MovieCard
        imageUrl={search.poster_path}
        movieId={search.id}
        rating={search.vote_average * 10}
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
