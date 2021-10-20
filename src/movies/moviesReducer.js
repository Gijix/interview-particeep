import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movies$ } from "./movies";

export const setInitialMovies = createAsyncThunk(
  "fetchMovies",
  async () => await movies$
);
const initialState = {
  value: { list: [], visibleList: [], categories: [], loading: true },
};
const setCategorie = (state) =>
  state.value.list.reduce(
    (acc, v) =>
      acc.some((x) => x.value === v.category)
        ? [...acc]
        : [...acc, { value: v.category, label: v.category }],
    []
  );
export const movieReducer = createSlice({
  initialState,
  name: "movieFilter",
  reducers: {
    remove: (state, action) => {
      state.value.list = state.value.list.filter(
        (x, i) => x.id !== action.payload.id
      );
      state.value.categories = setCategorie(state);
      state.value.visibleList = state.value.visibleList.filter(
        (x) => x.id !== action.payload.id
      );
    },
    filter: (state, action) => {
      const condition = (movie) =>
        action.payload.some((x) => x.value === movie.category) ||
        !action.payload.length;
      state.value.visibleList = state.value.list.filter(condition);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setInitialMovies.fulfilled, (state, action) => {
      state.value.list = action.payload;
      state.value.visibleList = action.payload;
      state.value.categories = setCategorie(state);
      state.value.loading = false;
    });
  },
});

export const { remove, filter } = movieReducer.actions;
export const selectMovies = (state) => state.movieList.value;
export default movieReducer.reducer;
