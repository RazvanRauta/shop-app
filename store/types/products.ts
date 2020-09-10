import Product from 'models/product'
import { Values } from 'screens/user/EditProductScreen'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from './actions'

export interface ProductsState {
  availableProducts: Product[]
  userProducts: Product[]
}

export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT
  pid: string
}

export interface CreateProductAction {
  type: typeof CREATE_PRODUCT
  productData: Values
}

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT
  pid: string
  productData: Values
}

export type ProductsActionTypes =
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction
