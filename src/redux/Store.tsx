import { configureStore, combineReducers } from "@reduxjs/toolkit";
import moviesSlice from "./MovieSlice";
import searchSlice from "./SearchSlice";
import seasonSlice from "./SeasonsSlice";
const rootReducer = combineReducers({
  movies: moviesSlice.reducer,
  search: searchSlice.reducer,
  seasons: seasonSlice.reducer,
});

const Store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
