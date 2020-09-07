import Product from 'models/product'
import { DELETE_PRODUCT } from './actions'

export interface ProductsState {
  availableProducts: Product[]
  userProducts: Product[]
}

interface DeleteProductAction {
  type: typeof DELETE_PRODUCT
  pid: string
}

export type ProductsActionTypes = DeleteProductAction
