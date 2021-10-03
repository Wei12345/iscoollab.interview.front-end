import React, { useCallback, useState } from 'react';

import menus from '../../data/menus';

import { useDispatch } from 'react-redux'
import { createOrder } from '../PageHistory/historySlice'

import Menu from '../../components/Menu'
import Cart from '../../components/Cart'

export default function PageMenuAndCart() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  const getCartIndexById = useCallback((id) => cart.findIndex(({ id: cartItemId }) => cartItemId === id), [cart]);

  const setCartByIndex = useCallback(({ value, index }) => {
    const clonedCart = [...cart];
    
    if (index > -1) {
      clonedCart.splice(index, 1, value);
      setCart(clonedCart);
    }
  }, [cart])

  const addCart = useCallback(({ id, item }) => {
    const clonedCart = [...cart];
    clonedCart.push({
      id,
      item,
      count: 1
    })
    setCart(clonedCart)
  }, [cart])

  const removeCartById = useCallback(({ id }) => {
    const cartIndex = getCartIndexById(id);

    if (cartIndex > -1) {
      const clonedCart = [...cart];
      clonedCart.splice(cartIndex, 1)
      setCart(clonedCart)
    }
  }, [cart, getCartIndexById])

  const increaseCartItemById = useCallback(({ id }) => {
    const clonedCart = [...cart];
    const cartIndex = getCartIndexById(id);

    if (cartIndex > -1)  {
      setCartByIndex({
        index: cartIndex,
        value: {
          ...clonedCart[cartIndex],
          count: clonedCart[cartIndex].count + 1
        }
      })
    }
  }, [cart, getCartIndexById, setCartByIndex]);

  const decreaseCartItemById = useCallback(({ id }) => {
    const cartIndex = getCartIndexById(id);

    if (cartIndex === -1) {
      return;
    }

    const count = cart[cartIndex].count - 1;

    if (count === 0) {
      removeCartById({ id })
      return;
    }

    setCartByIndex({
      index: cartIndex,
      value: {
        ...cart[cartIndex],
        count,
      }
    })
  }, [cart, getCartIndexById, removeCartById, setCartByIndex]);

  const handleMenuItemClick = useCallback(({ id, item }) => {
    const cartIndex = getCartIndexById(id);

    if (cartIndex === -1)  {
      addCart({ id, item })
      return;
    }

    increaseCartItemById({ id });
  }, [getCartIndexById, increaseCartItemById, addCart])

  const handleSubmit = useCallback(() => {
    dispatch(createOrder(cart));
    setCart([]);
  }, [cart, dispatch])

  return (
    <>
      <div>
        <h1 data-testid="menu-title">Menu</h1>
        <h3>點擊分類(Food, Drink, Others)下的物品(foodA, drinkQ, other1...)可以加入物品進入購物車(下方 Cart)</h3>
        <div data-testid="menu-content">
          <Menu data={menus} onItemClick={handleMenuItemClick} />
        </div>
      </div>
      <div>
        <h1 data-testid="cart-title">Cart</h1>
        <h3>點擊物品的 +, - 將加入/減少物品數量，為 0 時將刪除物品，按下 Submit 將送出訂單，請點擊上方的 Go History 進入訂單歷史頁</h3>
        <div data-testid="cart-content">
          <Cart
            data={cart}
            onIncreaseItemClick={increaseCartItemById}
            onDecreaseItemClick={decreaseCartItemById}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  )
}