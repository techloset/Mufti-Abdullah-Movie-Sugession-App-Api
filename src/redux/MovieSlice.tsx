import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export interface Movie {
    // Define the structure of your Movie type here
    id: number;
    poster_path: string;
    vote_average: number;
    // ... other properties
  }
interface MovieState {
  movies: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGM2MDRhNGUxMzdhNmI1ZTY1N2RlM2RjMDQ0Mjc4MCIsInN1YiI6IjY1OWQyNmFmNTVjMWY0MDA5NTFhNmNhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ke_xzaRgPuvTyv8mN3bC5Ieki6LqV5OIwyv2NpSoWZY',
        },
      }
    );
    return response.data.results as Movie[];
  } catch (error) {
    throw error;
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  } as MovieState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});

export const selectAllMovies = (state: { movies: MovieState }) => state.movies.movies;
export const selectIsLoading = (state: { movies: MovieState }) => state.movies.status === 'loading';

export const { reducer: moviesReducer } = moviesSlice;


export default moviesSlice;
