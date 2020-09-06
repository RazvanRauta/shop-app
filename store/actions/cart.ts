import Product from 'models/product'
import { ADD_TO_CART, REMOVE_FROM_CART } from 'store/types/actions'
import { AddToCartAction, RemoveFromCartAction } from 'store/types/cart'

export function addToCart(product: Product): AddToCartAction {
  return {
    type: ADD_TO_CART,
    product: product,
  }
}

export function removeFromCart(pid: string): RemoveFromCartAction {
  return {
    type: REMOVE_FROM_CART,
    pid: pid,
  }
}
