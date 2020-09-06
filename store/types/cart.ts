import CartItem from 'models/cart-item'
import Product from 'models/product'

export const ADD_TO_CART = 'ADD_TO_CART'

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

export type CartActionTypes = AddToCartAction
