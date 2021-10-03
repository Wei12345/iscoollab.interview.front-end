import React from 'react'

export default function Menu({ data, onItemClick }) {
  return (
    <div>
      {data.map(({ id, category, items }) => (
        <div key={id} data-testid="category">
          <h2 data-testid="category-title">
            {category}
          </h2>
          {items.map(({ id: itemId, item }) => (
            <p
              key={itemId}
              data-testid="item"
              onClick={() => onItemClick({ id: itemId, item })}
            >
              {item}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}