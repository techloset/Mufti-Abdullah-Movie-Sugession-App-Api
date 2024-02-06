import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import instance from "../utilites/Instance";
import { CardsType } from "../constants/Types";

export interface Searchs extends CardsType {
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
    } catch (error: any) {
      throw new Error(error?.message ?? "Fetch movies error");
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
export const selectIsLoadingSearch = (state: { search: SearchState }) =>
  state.search.status === "loading";

export default searchSlice;
