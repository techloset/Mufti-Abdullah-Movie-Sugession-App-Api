import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utilites/Instance";
import { CardsType } from "../constants/Types";

interface MovieState {
  movies: CardsType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await instance.get("trending/movie/day?language=en-US");
    return response.data.results;
  } catch (error: any) {
    throw new Error(error?.message ?? "Fetch movies error");
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  } as MovieState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});

export const selectAllMovies = (state: { movies: MovieState }) =>
  state.movies.movies;

export const selectIsLoading = (state: { movies: MovieState }) =>
  state.movies.status === "loading";

export const { reducer: moviesReducer } = moviesSlice;

export default moviesSlice;
