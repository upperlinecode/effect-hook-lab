import { legacy_createStore as createStore } from "redux";
import { ScoreAction } from "./actions";

const initialState = {
  score: 1000,
  status: "loaded" as "loading" | "loaded" | "game over",
};

export type stateType = typeof initialState;

const reducer = (state = initialState, action: ScoreAction) => {
  // Every branch of this switch MUST return a state.
  switch (action.type) {
    case "INCREASE_SCORE":
      // ====== Super verbose way
      // const currentScore = state.score;
      // ////OR (not recommended): const currentScore = getScore(state);
      // const newState = { ...state, score: currentScore + action.payload };
      // return newState;
      // ====== Simpler way
      return { ...state, score: state.score + action.payload };
    case "DECREASE_SCORE":
      return { ...state, score: state.score - action.payload };
    case "RESET_SCORE":
      return { ...state, score: 0, status: "loading" as const };
    case "DATA_LOADED":
      return { ...state, status: "loaded" as const };
    default:
      return state; // If no type match, return original state unchanged.
  }
};

export const myStore = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
