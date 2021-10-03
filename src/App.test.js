import '@testing-library/jest-dom'

import * as React from 'react'
import { render, fireEvent } from './test-utils';

import App from './App';

test('App 正確顯示，正確觸發事件', () => {  
  const { getByTestId } = render(<App />)

  const goMenuAndCartButtonEl = getByTestId('go-menu-and-cart-button');
  expect(goMenuAndCartButtonEl).toHaveTextContent('Go Menu And Cart')

  const goHistoryButtonEl = getByTestId('go-history-button');
  expect(goHistoryButtonEl).toHaveTextContent('Go History')

  fireEvent.click(goMenuAndCartButtonEl)
  expect(getByTestId('page-menu-and-cart')).toBeInTheDocument()

  fireEvent.click(goHistoryButtonEl)
  expect(getByTestId('page-history')).toBeInTheDocument()
})
