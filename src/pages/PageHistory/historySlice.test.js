import reducer, { createOrder, clearOrder } from './historySlice'

describe('history reducer', () => {
  it('正確的 initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      orders: []
    })
  })
  
  it('正確新增一筆訂單', () => {
    const prevState = { orders: [] }
    const order = [
      {
        id: '1',
        count: 5,
        item: 'foodA',
      },
      {
        id: '2',
        count: 20,
        item: 'drinkA',
        },
    ]

    expect(reducer(prevState, createOrder(order))).toEqual({
      orders: [
        {
          id: '0',
          order: '1',
          items: [
            {
              id: '1',
              count: 5,
              item: 'foodA',
            },
            {
              id: '2',
              count: 20,
              item: 'drinkA',
              },
          ]
        }
      ]
    })
  })

  it('清空訂單', () => {
    const prevState = {
      orders: [
        {
          id: '0',
          order: '1',
          items: [
            {
              id: '1',
              count: 5,
              item: 'foodA',
            },
            {
              id: '2',
              count: 20,
              item: 'drinkA',
              },
          ]
        }
      ]
    }

    expect(reducer(prevState, clearOrder())).toEqual({ orders: [] })
  })
})
