import { API } from 'constants/API'
import CartItem from 'models/cart-item'
import Order from 'models/order'
import { ADD_ORDER, SET_ORDERS } from 'store/types/actions'
import { AddOrderThunkAction, SetOrdersThunkAction } from 'store/types/orders'

export const addOrder = (
  cartItems: { item: CartItem; id: string }[],
  totalAmount: number
): AddOrderThunkAction => async (dispatch, getState) => {
  const { token, userId } = getState().auth
  const date = new Date()
  const response = await fetch(`${API}/orders/${userId}.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartItems,
      totalAmount,
      date: date.toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  const resData = await response.json()

  dispatch({
    type: ADD_ORDER,
    orderData: {
      id: resData.name,
      items: cartItems,
      amount: totalAmount,
      date: date,
    },
  })
}

export const fetchOrders = (): SetOrdersThunkAction => async (
  dispatch,
  getState
) => {
  const { userId } = getState().auth
  const response = await fetch(`${API}/orders/${userId}.json`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  const resData = await response.json()

  const loadedOrders = resData
    ? Object.keys(resData).map(
        (name: string) =>
          new Order(
            name,
            resData[name].cartItems,
            resData[name].totalAmount,
            new Date(resData[name].date)
          )
      )
    : []

  dispatch({ type: SET_ORDERS, orders: loadedOrders })
}
