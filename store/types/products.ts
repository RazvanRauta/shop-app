import Product from 'models/product'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

export interface ProductsState {
  availableProducts: Product[]
  userProducts: Product[]
}

interface ProductsOneAction {
  type: typeof SEND_MESSAGE
  payload: Product
}

export type ProductsActionTypes = ProductsOneAction
