import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './productSlice'

export const store = configureStore({
  reducer: {
    productslice: counterReducer,
  },
})