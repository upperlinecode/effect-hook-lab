export type ScoreAction = { type: string; payload: number };
// export type ScoreAction =
//   | ReturnType<typeof increaseScore>
//   | ReturnType<typeof decreaseScore>
//   | ReturnType<typeof resetScore>;

// Action creator - makes those objects so that you reduce number of things you need to do manually.
export const increaseScore = (value: number) => ({
  type: "INCREASE_SCORE",
  payload: value,
});

export const decreaseScore = (value: number) => ({
  type: "DECREASE_SCORE",
  payload: value,
});

export const resetScore = () => ({
  type: "RESET_SCORE",
});
