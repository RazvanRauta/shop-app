import CartItem from 'models/cart-item'
import Order from 'models/order'
import { ADD_ORDER } from './actions'

export interface OrderState {
  orders: Order[]
}

export interface AddOrderAction {
  type: typeof ADD_ORDER
  orderData: {
    items: { item: CartItem; id: string }[]

    amount: number
  }
}

export type OrderActionType = AddOrderAction
