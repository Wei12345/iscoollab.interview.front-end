import React from 'react'

export default function Menu({ data, onItemClick }) {
  return (
    <div>
      {data.map(({ id, category, items }) => (
        <div key={id} data-testid="category">
          <h1 data-testid="category-title">
            {category}
          </h1>
          {items.map(({ id: itemId, item }) => (
            <p
              key={itemId}
              data-testid="item"
              onClick={onItemClick}
            >
              {item}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}