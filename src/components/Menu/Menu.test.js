import '@testing-library/jest-dom'

import * as React from 'react'
import { render, fireEvent, screen, within } from '@testing-library/react'

import uniqueId from '../../lib/uniqueId';

import Menu from './index';


describe('Menu 正確顯示，正確觸發事件', () => {
  const data = [
    {
      id: uniqueId(),
      category: 'Food',
      items: [
        {
          id: uniqueId(),
          item: 'foodA',
        },
        {
          id: uniqueId(),
          item: 'foodB'
        },
        {
          id: uniqueId(),
          item: 'foodC'
        }
      ]
    },
    {
      id: uniqueId(),
      category: 'Drink',
      items: [
        {
          id: uniqueId(),
          item: 'drinkA',
        }
      ]
    }
  ]

  it('Menu Category 正確顯示', () => {
    render(<Menu data={data} />)

    data.forEach(({ category }, index) => {
      expect(screen.getAllByTestId('category')[index]).toHaveTextContent(category)
    })
  })

  
  it('Menu Item 正確顯示', () => {
    render(<Menu data={data} />)

    const categoryEls = screen.getAllByTestId('category');
    data.forEach(({ items }, index) => {
      const categoryEl = categoryEls[index];

      items.forEach(({ item }, itemIndex) => {
        const itemEl = within(categoryEl).getAllByTestId('item')[itemIndex];
        expect(itemEl).toHaveTextContent(item)
      })
    })
  })

  it('Menu Button 正確點擊', () => {
    const itemClickFn = jest.fn();
    render(<Menu data={data} onItemClick={itemClickFn} />)

    const categoryEls = screen.getAllByTestId('category');
    data.forEach(({ items }, index) => {
      itemClickFn.mockReset()
      const categoryEl = categoryEls[index];

      items.forEach((_, itemIndex) => {
        const itemEl = within(categoryEl).getAllByTestId('item')[itemIndex];
        fireEvent.click(itemEl)
      })

      expect(itemClickFn).toBeCalledTimes(items.length)
    })
  })
})
