import { createSlice } from '@reduxjs/toolkit'

import uniqueId from '../../lib/uniqueId'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    orders: [],
  },
  reducers: {
    createOrder: (state, action) => {
      state.orders.push({
        id: uniqueId(),
        order: `${state.orders.length + 1}`,
        items: action.payload
      })
    },
    clearOrder: (state) => {
      state.orders = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { createOrder, clearOrder } = historySlice.actions

export default historySlice.reducer