import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const initialState = {
  score: 1000,
  status: "loaded" as "loading" | "loaded" | "game over",
};

export const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    increaseScore(state, action: PayloadAction<number>) {
      state.score = state.score + action.payload;
    },
    decreaseScore(state, action: PayloadAction<number>) {
      state.score = state.score - action.payload;
    },
    resetScore(state) {
      state.score = 0;
      state.status = "loading";
    },
    dataLoaded(state) {
      state.status = "loaded";
    },
  },
});

export const myStore = configureStore({
  reducer: { [slice.name]: slice.reducer },
  devTools: true,
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
