import { createSlice } from '@reduxjs/toolkit'
import type { Clue } from '../utils';
import type { RootState } from './store';

export interface SliceState {
  byCategory: Clue[][]
}

const initialState: SliceState = {
  byCategory: []
}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setAllClues: (state, action) => {
      state.byCategory  = action.payload
    }
  }
})

export const selectCluesByCategory = (state: RootState) => (
  state.questions.byCategory
)

export const { setAllClues } = questionsSlice.actions

export default questionsSlice.reducer