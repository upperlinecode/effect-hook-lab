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
  byCategory: Clue[][];
  // Per documentation. We use only idle and pending.
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: SliceState = {
  byCategory: [],
  loading: 'idle'
}

// Thunks
export const fetchCluesByCategory = createAsyncThunk(
  'clues/fetchCluesByCategory',
  async (categoryNumbers: number[]) => {
    // SO ref on Promise.all with fetch
    // https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all

    // MDN Promise.all
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

    // Basically we should use Promise.all if we are using an array of Promises
    // and need to await for all of them to resolve.
    //
    // Promise.all keeps the passed in array order regardless of when each
    // promise resolves.

    const responses = categoryNumbers.map(async (catId) => {
      const response = await fetch(
        `https://jservice.io/api/clues?category=${catId}`
      );

      const newClues: Clue[] = await response.json();
      const topFiveClues = getFiveClues(newClues);
      return topFiveClues;
    });

    return await Promise.all(responses);
  }
)


export const cluesSlice = createSlice({
  name: 'clues',
  initialState,
  reducers: {},
  // This is the big benefit of using the createAsyncThunk api. Another benefit
  // is viewing the actions history in the redux dev tools. The extraReducers
  // api is also used when this slice has to respond to another slice's actions.
  extraReducers: (builder) => {
    builder
      // for our use case (and many others), we only need pending and idle loading states
      .addCase(fetchCluesByCategory.pending, (state) => {
        state.loading = 'pending'
      })
      .addCase(fetchCluesByCategory.fulfilled, (state, action) => {
        state.byCategory = action.payload
        state.loading = 'idle'
      })
      .addCase(fetchCluesByCategory.rejected, (state) => {
        state.loading = 'idle'
      })
  }
})

export const selectAllClues = (state: RootState) => (
  state.clues.byCategory
)

export const selectRequestStatus = (state: RootState) => state.clues.loading

export default cluesSlice.reducer