import { createSlice } from '@reduxjs/toolkit'
import type { Clue } from '../utils';
import type { RootState } from './store';

export interface SliceState {
  byCategory: Clue[][]
}

const initialState: SliceState = {
  byCategory: []
}

export const cluesSlice = createSlice({
  name: 'clues',
  initialState,
  reducers: {
    setAllClues: (state, action) => {
      state.byCategory  = action.payload
    }
  }
})

export const selectAllClues = (state: RootState) => (
  state.clues.byCategory
)

export const { setAllClues } = cluesSlice.actions

export default cluesSlice.reducer