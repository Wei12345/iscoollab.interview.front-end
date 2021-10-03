import uniqueId from "../lib/uniqueId";

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
        item: 'drinkQ',
      },
      {
        id: uniqueId(),
        item: 'drinkW',
      },
      {
        id: uniqueId(),
        item: 'drinkE',
      }
    ]
  },
  {
    id: uniqueId(),
    category: 'Others',
    items: [
      {
        id: uniqueId(),
        item: 'other1',
      },
      {
        id: uniqueId(),
        item: 'other2',
      },
      {
        id: uniqueId(),
        item: 'other3',
      }
    ]
  }
]

export default data;
