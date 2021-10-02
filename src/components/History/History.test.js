import '@testing-library/jest-dom'

import * as React from 'react'
import { render, fireEvent, screen, within } from '@testing-library/react'

import uniqueId from '../../lib/uniqueId';

import History from './index';

describe('History 正確顯示，正確觸發事件', () => {
  const data = [
    {
      id: uniqueId(),
      order: '1',
      items: [
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
      ],
    },
    {
      id: uniqueId(),
      order: '2',
      items: [
        {
          id: uniqueId(),
          count: 2,
          item: 'otherA',
        },
      ],
    },
  ]

  it('History Order 正確顯示', () => {
    render(<History data={data} />)
    
    data.forEach(({ order }, index) => {
      expect(screen.getAllByTestId('order-title')[index]).toHaveTextContent(`Order #${order}`)
    })
  })

  it('History Order Item 正確顯示', () => {
    render(<History data={data} />)

    const orderEls = screen.getAllByTestId('order');
    data.forEach(({ items }, index) => {
      const orderEl = orderEls[index];

      items.forEach(({ item, count }, itemIndex) => {
        const itemEl = within(orderEl).getAllByTestId('item')[itemIndex];
        expect(itemEl).toHaveTextContent(item)

        const itemCountEl = within(orderEl).getAllByTestId('item-count')[itemIndex];
        expect(itemCountEl).toHaveTextContent(`x${count}`)
      })
    })
  })

  it('Cart Submit 正確觸發', () => {
    const clearFn = jest.fn();

    render(<History
      data={data}
      onClear={clearFn}
    />)

    const clearButtonEl = screen.getByTestId('clear-button');
    expect(clearButtonEl).toHaveTextContent('clear')

    fireEvent.click(clearButtonEl)
    expect(clearFn).toBeCalledTimes(1)
  })
})
