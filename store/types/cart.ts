import CartItem from 'models/cart-item'
import Product from 'models/product'
import { ADD_ORDER, ADD_TO_CART, REMOVE_FROM_CART } from './actions'

export interface CartState {
  items: {
    [key: string]: CartItem
  }
  totalAmount: number
}

export interface AddToCartAction {
  type: typeof ADD_TO_CART
  product: Product
}

export interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART
  pid: string
}
export interface ClearCartAction {
  type: typeof ADD_ORDER
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | ClearCartAction
