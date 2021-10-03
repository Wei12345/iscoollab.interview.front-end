import { configureStore } from '@reduxjs/toolkit'
import historyReducer from './pages/PageHistory/historySlice'

export default configureStore({
  reducer: {
    history: historyReducer
  }
})