import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { clearOrder } from './historySlice'

import History from '../../components/History'

export default function PageHistory() {
  const orders = useSelector(state => state.history.orders);
  const dispatch = useDispatch();

  const handleClear = useCallback(() => {
    dispatch(clearOrder())
  }, [dispatch])

  return (
    <History data={orders} onClear={handleClear} />
  )
}