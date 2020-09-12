import Product from 'models/product'
import { ThunkAction } from 'redux-thunk'
import { Values } from 'screens/user/EditProductScreen'
import { RootState } from 'store/rootReducer'
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from './actions'

export interface ProductsState {
  availableProducts: Product[]
  userProducts: Product[]
}

export interface DeleteProductAction {
  type: typeof DELETE_PRODUCT
  pid: string
}

export type DeleteProductThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  DeleteProductAction
>

export interface CreateProductAction {
  type: typeof CREATE_PRODUCT
  productData: Values
}

export type CreateProductThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  CreateProductAction
>

export interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT
  pid: string
  productData: Omit<Values, 'price'>
}

export type UpdateProductThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  UpdateProductAction
>

export interface FirebaseProduct {
  [key: string]: {
    description: string
    imageUrl: string
    price: string
    title: string
  }
}

export type FirebaseProducts = FirebaseProduct[]

export interface SetProductsAction {
  type: typeof SET_PRODUCTS
  products: Product[]
}

export type SetProductsThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetProductsAction
>

export type ProductsActionTypes =
  | DeleteProductAction
  | CreateProductAction
  | UpdateProductAction
  | SetProductsAction
