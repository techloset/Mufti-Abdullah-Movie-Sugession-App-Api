// store.js
import { configureStore, createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

interface MovieState {
  movies: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


export interface Movie {
    id: number;
    poster_path: string;
    vote_average: number;
  }

const initialState: MovieState = {
  movies: [],
  status: 'idle',
  error: null,
};
export const searchMovies = createAsyncThunk('movies/searchMovies', async (query: string) => {
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
    return response.data.results;
  } catch (error) {
    throw error;
  }
});

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
    console.log(response.data.results)
    return response.data.results;
  } catch (error) {
    throw error;
  }
});

export const fetchSeries = createAsyncThunk('movies/fetchSeries', async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
      {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGM2MDRhNGUxMzdhNmI1ZTY1N2RlM2RjMDQ0Mjc4MCIsInN1YiI6IjY1OWQyNmFmNTVjMWY0MDA5NTFhNmNhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ke_xzaRgPuvTyv8mN3bC5Ieki6LqV5OIwyv2NpSoWZY',
        },
      }
    );
    console.log(response.data.results)
    return response.data.results;
  } catch (error) {
    throw error;
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
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
      builder.addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      });
      builder.addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      });
  },
});

const seasonSlice = createSlice({
  name: 'seasons',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});
const searchSlice = createSlice({
  name: 'search',
  initialState,
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
// Create a selector to check if any async action is pending
export const selectIsLoading = createSelector(
  (state: { movies: MovieState }) => state.movies.status === 'loading',
  (loading) => loading
);
export const selectAllMovies = (state: { movies: MovieState }) => state.movies.movies;

export const { reducer } = moviesSlice;

const store = configureStore({
  reducer: {
    movies: reducer,
  },
});

export default store;
