import React from 'react'

export default function History({ data, onClear }) {
  return (
    <div>
      {data.map(({ id, order, items }) => (
        <div key={id} data-testid="order">
          <h2 data-testid="order-title">Order #{order}</h2>
          {items.map(({ id: itemId, item, count }) => (
            <p key={itemId}>
              <span data-testid="item">{item}</span>
              <span data-testid="item-count">x{count}</span>
            </p>
          ))}
        </div>
      ))}
      <button
        type="button"
        data-testid="clear-button"
        onClick={onClear}
      >clear</button>
    </div>
  )
}
