import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export interface Searchs {
  // Define the structure of your Movie type here
  id: number;
  poster_path: string;
  vote_average: number;
  // ... other properties
}
interface SearchState {
  [x: string]: any;
  movies: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const searchMovies = createAsyncThunk('search/searchMovies', async (query: string) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGM2MDRhNGUxMzdhNmI1ZTY1N2RlM2RjMDQ0Mjc4MCIsInN1YiI6IjY1OWQyNmFmNTVjMWY0MDA5NTFhNmNhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ke_xzaRgPuvTyv8mN3bC5Ieki6LqV5OIwyv2NpSoWZY',
        },
      }
    );
    // console.log("response.data.results",response.data.results)
    return response.data.results;
  } catch (error) {
    throw error;
  }
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  } as SearchState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});

export const { reducer: moviesReducer, actions } = searchSlice;
export const { searchMoviesFulfilled } :any = actions;
export const selectAllSearch = (state: { search: SearchState }) => state.search.movies;
export const selectIsLoading = (state: { search: SearchState }) => state.search.status === 'loading';

export default searchSlice;