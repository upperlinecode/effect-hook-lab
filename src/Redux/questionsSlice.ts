import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Clue } from '../utils';
import type { RootState } from './store';

export interface SliceState {
  byCategory: { [key: number]: Clue[] }
}

const initialState: SliceState = {
  byCategory: {}
}

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestionsByCategory: (state, action: PayloadAction<{
      categoryNumber: number, topFiveQuestions: Clue[]
    }>) => {
      const { categoryNumber, topFiveQuestions } = action.payload
      state.byCategory[categoryNumber] = topFiveQuestions
    },
  },
})

export const selectCluesByCategory = (state: RootState, catId: number) => (
  state.questions.byCategory[catId]
)

export const { setQuestionsByCategory } = questionsSlice.actions

export default questionsSlice.reducer