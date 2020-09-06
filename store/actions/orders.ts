import CartItem from 'models/cart-item'
import { ADD_ORDER } from 'store/types/actions'
import { AddOrderAction } from 'store/types/orders'

export function addOrder(
  cartItems: { item: CartItem; id: string }[],
  totalAmount: number
): AddOrderAction {
  return {
    type: ADD_ORDER,
    orderData: {
      items: cartItems,
      amount: totalAmount,
    },
  }
}
