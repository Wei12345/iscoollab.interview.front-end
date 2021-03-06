import React from 'react'

export default function Cart({ data, onSubmit, onIncreaseItemClick, onDecreaseItemClick }) {
  return (
    <div>
      {data.map(({ id, item, count }) => (
        <div key={id}>
          <p>
            <span data-testid="item">{item}</span>
            <button data-testid="item-increase" onClick={() => { onIncreaseItemClick({ id }) }}>+</button>
            <button data-testid="item-decrease" onClick={() => { onDecreaseItemClick({ id }) }}>-</button>
            <span data-testid="item-count">x{count}</span>
          </p>
        </div>
      ))}
      <button
        type="button"
        data-testid="submit-button"
        onClick={onSubmit}
      >submit</button>
    </div>
  )
}