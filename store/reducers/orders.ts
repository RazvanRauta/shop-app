import Order from 'models/order'
import { ADD_ORDER, SET_ORDERS } from 'store/types/actions'
import { OrderActionType, OrderState } from 'store/types/orders'

const initialState: OrderState = {
  orders: [],
}

export default (state = initialState, action: OrderActionType) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      }

    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      )

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      }

    default:
      return state
  }
}
