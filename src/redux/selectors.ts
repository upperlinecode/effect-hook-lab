import { RootState } from "./configureStore";

export const getScore = (state: RootState) => state.app.score;
export const getStatus = (state: RootState) => state.app.status;
