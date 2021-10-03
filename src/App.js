import React, { useState } from "react";
import { Provider } from 'react-redux'

import store from './store'

import PageMenuAndCart from './pages/PageMenuAndCart'
import PageHistory from './pages/PageHistory'

const PAGE_MENU_AND_CART = 'PAGE_MENU_AND_CART';
const PAGE_ORDER = 'PAGE_ORDER';

export default function App() {
  const [page, setPage] = useState(PAGE_MENU_AND_CART)

  return (
    <Provider store={store}>
      <button type="button" data-testid="go-menu-and-cart-button" onClick={() => { setPage(PAGE_MENU_AND_CART) }}>Go Menu And Cart</button>
      <button type="button" data-testid="go-history-button" onClick={() => { setPage(PAGE_ORDER) }}>Go History</button>
      {page === PAGE_MENU_AND_CART && (
        <div data-testid="page-menu-and-cart">
          <PageMenuAndCart />
        </div>
      )}
      {page === PAGE_ORDER && (
        <div data-testid="page-history">
          <PageHistory />
        </div>
      )}
    </Provider>
  )
}