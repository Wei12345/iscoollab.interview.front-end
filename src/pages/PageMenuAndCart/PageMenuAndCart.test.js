import '@testing-library/jest-dom'

import * as React from 'react'
import { render, fireEvent, within } from '../../test-utils'

import menus from '../../data/menus';

import PageMenuAndCart from './index';

test('PageMenuAndCart 正確顯示，正確觸發事件', () => {  
  const { getByTestId } = render(<PageMenuAndCart />)

  expect(getByTestId('menu-title')).toHaveTextContent('Menu')
    
  const menuContentEl = getByTestId('menu-content')
  const menuCategoryEls = within(menuContentEl).getAllByTestId('category');

  menus.forEach(({ category }, index) => {
    const categoryEl = menuCategoryEls[index]
    const categoryTitleEl = within(categoryEl).getByTestId('category-title')
    expect(categoryTitleEl).toHaveTextContent(category)
  })

  menus.forEach(({ items }, index) => {
    const categoryEl = menuCategoryEls[index]
    const itemEls = within(categoryEl).getAllByTestId('item');

    items.forEach(({ item }, itemIndex) => {
      const itemEl = itemEls[itemIndex]
      expect(itemEl).toHaveTextContent(item)
    })
  })

  expect(getByTestId('cart-title')).toHaveTextContent('Cart')

  const cartContentEl = getByTestId('cart-content');

  const item1El = within(menuCategoryEls[0]).getAllByTestId('item')[0]
  fireEvent.click(item1El);

  const cartItem1El = within(cartContentEl).getAllByTestId('item')[0]
  const cartItem1CountEl = within(cartContentEl).getAllByTestId('item-count')[0];
  const cartItem1IncreaseEl = within(cartContentEl).getAllByTestId('item-increase')[0];
  const cartItem1DecreaseEl = within(cartContentEl).getAllByTestId('item-decrease')[0];

  expect(cartItem1El).toHaveTextContent('foodA')
  expect(cartItem1CountEl).toHaveTextContent('x1')
  
  fireEvent.click(cartItem1IncreaseEl);
  expect(cartItem1CountEl).toHaveTextContent('x2');
  
  fireEvent.click(cartItem1DecreaseEl);
  expect(cartItem1CountEl).toHaveTextContent('x1')

  const item2El = within(menuCategoryEls[1]).getAllByTestId('item')[0]
  fireEvent.click(item2El);
  fireEvent.click(item2El);

  const cartItem2El = within(cartContentEl).getAllByTestId('item')[1]
  const cartItem2CountEl = within(cartContentEl).getAllByTestId('item-count')[1];
  const cartItem2IncreaseEl = within(cartContentEl).getAllByTestId('item-increase')[1];
  const cartItem2DecreaseEl = within(cartContentEl).getAllByTestId('item-decrease')[1];

  expect(cartItem2El).toHaveTextContent('drinkQ')
  expect(cartItem2CountEl).toHaveTextContent('x2')

  fireEvent.click(cartItem2IncreaseEl);
  fireEvent.click(cartItem2IncreaseEl);
  expect(cartItem2CountEl).toHaveTextContent('x4')
  
  fireEvent.click(cartItem2DecreaseEl);
  fireEvent.click(cartItem2DecreaseEl);
  expect(cartItem2CountEl).toHaveTextContent('x2')

  fireEvent.click(cartItem2DecreaseEl);
  fireEvent.click(cartItem2DecreaseEl);
  expect(within(cartContentEl).getAllByTestId('item')[1]).toBeUndefined()

  const submitButtonEl = within(cartContentEl).getByTestId('submit-button')
  expect(submitButtonEl).toHaveTextContent('submit')

  fireEvent.click(submitButtonEl)
  expect(within(cartContentEl).queryAllByTestId('item')).toEqual([])
})
