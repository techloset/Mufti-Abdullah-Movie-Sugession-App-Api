import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SeasonState {
  seasons: any[]; // Replace 'any[]' with the actual type for seasons
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchSeries = createAsyncThunk('seasons/fetchSeries', async () => {
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
    return response.data.results;
  } catch (error) {
    throw error;
  }
});

const seasonSlice = createSlice({
  name: 'seasons',
  initialState: {
    seasons: [],
    status: 'idle',
    error: null,
  } as SeasonState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seasons = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message ?? null) as string | null;
      });
  },
});
export const selectAllSeasons = (state: { seasons: SeasonState }) => state.seasons.seasons;
export const selectIsLoading = (state: { seasons: SeasonState }) => state.seasons.status === 'loading';
export const { reducer: seasonsReducer } = seasonSlice;
export default seasonSlice;
