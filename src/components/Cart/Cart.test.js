import '@testing-library/jest-dom'

import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'

import uniqueId from '../../lib/uniqueId';

import Cart from './index';

describe('Cart 正確顯示，正確觸發事件', () => {
  const data = [
    {
      id: uniqueId(),
      count: 5,
      item: 'foodA',
    },
    {
      id: uniqueId(),
      count: 20,
      item: 'drinkA',
    },
  ]

  it('Cart Item 正確顯示', () => {
    render(<Cart data={data} />)

    const itemEls = screen.getAllByTestId('item');
    const itemCountEls = screen.getAllByTestId('item-count');

    data.forEach(({ item, count }, index) => {
      const itemEl = itemEls[index]
      expect(itemEl).toHaveTextContent(item);

      const itemCountEl = itemCountEls[index];
      expect(itemCountEl).toHaveTextContent(`x${count}`)
    })
  })

  it('Cart Increase 正確顯示及觸發', () => {
    const increaseFn = jest.fn();
    render(<Cart data={data} onIncreaseItemClick={increaseFn} />)

    const itemIncreaseEls = screen.getAllByTestId('item-increase');

    let increaseCount = 0;
    data.forEach(({ item, count }, index) => {
      const itemIncreaseEl = itemIncreaseEls[index]
      expect(itemIncreaseEl).toHaveTextContent('+')
      fireEvent.click(itemIncreaseEl)

      increaseCount += 1;
    })
    expect(increaseFn).toBeCalledTimes(increaseCount)
  })

  it('Cart Decrease 正確顯示及觸發', () => {
    const decreaseFn = jest.fn();
    render(<Cart data={data} onDecreaseItemClick={decreaseFn} />)

    const itemDecreaseEls = screen.getAllByTestId('item-decrease');

    let decreaseCount = 0;
    data.forEach(({ item, count }, index) => {
      const itemDecreaseEl = itemDecreaseEls[index]
      expect(itemDecreaseEl).toHaveTextContent('-')
      fireEvent.click(itemDecreaseEl)

      decreaseCount += 1;
    })
    expect(decreaseFn).toBeCalledTimes(decreaseCount)
  })

  it('Cart Submit 正確觸發', () => {
    const submitFn = jest.fn();
    render(<Cart
      data={data}
      onSubmit={submitFn}
    />)

    const submitButtonEl = screen.getByTestId('submit-button');
    expect(submitButtonEl).toHaveTextContent('submit')
  
    fireEvent.click(submitButtonEl)
    expect(submitFn).toBeCalledTimes(1)
  })
})
