import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../helper/Instance";

interface SeasonState {
  seasons: [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchSeries = createAsyncThunk("series/fetchSeries", async () => {
  try {
    const response = await instance.get("tv/popular?language=en-US&page=1");
    return response.data.results;
  } catch (error) {
    throw error;
  }
});

const seasonSlice = createSlice({
  name: "seasons",
  initialState: {
    seasons: [],
    status: "idle",
    error: null,
  } as SeasonState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seasons = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});
export const selectAllSeasons = (state: { seasons: SeasonState }) =>
  state.seasons.seasons;
export const selectIsLoading = (state: { seasons: SeasonState }) =>
  state.seasons.status === "loading";
export const { reducer: seasonsReducer } = seasonSlice;
export default seasonSlice;
