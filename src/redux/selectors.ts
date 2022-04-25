import { stateType } from "./configureStore";

export const getScore = (state: stateType) => state.score;
export const getStatus = (state: stateType) => state.status;
