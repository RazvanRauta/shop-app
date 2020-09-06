import Product from 'models/product'
import { SEND_MESSAGE } from './actions'

export interface ProductsState {
  availableProducts: Product[]
  userProducts: Product[]
}

interface ProductsOneAction {
  type: typeof SEND_MESSAGE
  payload: Product
}

export type ProductsActionTypes = ProductsOneAction
