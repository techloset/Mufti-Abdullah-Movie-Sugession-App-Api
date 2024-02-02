<<<<<<< HEAD
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import instance from "../helper/Instance";
import { Movie } from "./MovieSlice";

export interface Searchs extends Movie {
  id: number;
  poster_path: string;
  vote_average: number;
}

export interface SearchState {
  movies: Searchs[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (query: string) => {
    try {
      const response = await instance.get(
        `search/movie?query=${query}&language=en-US`
      );
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  } as SearchState,
  reducers: {
    setSearches: (state, action: PayloadAction<Searchs[]>) => {
      state.movies = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});

export const { reducer: searchReducer, actions } = searchSlice;
export const { setSearches } = actions;

export const selectAllSearch = (state: { search: SearchState }) =>
  state.search.movies;
export const selectIsLoading = (state: { search: SearchState }) =>
  state.search.status === "loading";

export default searchSlice;
=======
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import instance from "../helper/Instance";
import { Movie } from "./MovieSlice";

export interface Searchs extends Movie {
  id: number;
  poster_path: string;
  vote_average: number;
}

export interface SearchState {
  movies: Searchs[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const searchMovies = createAsyncThunk(
  "search/searchMovies",
  async (query: string) => {
    try {
      const response = await instance.get(
        `search/movie?query=${query}&language=en-US`
      );
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  } as SearchState,
  reducers: {
    setSearches: (state, action: PayloadAction<Searchs[]>) => {
      state.movies = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});

export const { reducer: searchReducer, actions } = searchSlice;
export const { setSearches } = actions;

export const selectAllSearch = (state: { search: SearchState }) =>
  state.search.movies;
export const selectIsLoading = (state: { search: SearchState }) =>
  state.search.status === "loading";

export default searchSlice;
>>>>>>> 8d87fee6aa92c1563f17afc29f1af0355222befa
