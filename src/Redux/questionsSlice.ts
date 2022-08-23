/*
ref thunks:
https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk
https://redux-toolkit.js.org/usage/usage-with-typescript#createasyncthunk

ref loading state:
https://redux-toolkit.js.org/api/createAsyncThunk#overview
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Clue, getFiveClues } from '../utils';
import type { RootState } from './store';

export interface SliceState {
  byCategory: { [key: number]: Clue[] },
  // Per documentation, but we use only idle and pending.
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: SliceState = {
  byCategory: {},
  loading: 'idle',
}

// Thunks
export const fetchQuestionsByCategory = createAsyncThunk(
  'questions/fetchQuestionsByCategory',
  async (categoryNumber: number) => {

    const endpoint = `https://jservice.io/api/clues?category=${categoryNumber}`;
    const response = await fetch(endpoint);
    const newQuestions: Clue[] = await response.json();

    return newQuestions;
  }
)

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  // This is the big benefit of using the createAsyncThunk api. Another benefit
  // is viewing the actions history in the redux dev tools.
  extraReducers: (builder) => {
    builder
      // for our use case (and many others), we only need pending and idle loading states
      .addCase(fetchQuestionsByCategory.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchQuestionsByCategory.fulfilled, (state, action) => {
        const catId = action.payload[0].category_id
        state.byCategory[catId] = getFiveClues(action.payload)
        state.loading = 'idle'
      })
      .addCase(fetchQuestionsByCategory.rejected, (state) => {
        state.loading = 'idle'
      })
  },
})

// Selectors
export const selectCluesByCategory = (state: RootState, catId: number) => (
  state.questions.byCategory[catId]
)

export const selectRequestStatus = (state: RootState) => state.questions.loading

export default questionsSlice.reducer