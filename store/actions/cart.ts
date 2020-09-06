import Product from 'models/product'
import { AddToCartAction, ADD_TO_CART } from 'store/types/cart'

export function addToCart(product: Product): AddToCartAction {
  return {
    type: ADD_TO_CART,
    product: product,
  }
}
