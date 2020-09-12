import CartItem from 'models/cart-item'
import Order from 'models/order'
import { ThunkAction } from 'redux-thunk'
import { RootState } from 'store/rootReducer'
import { ADD_ORDER, SET_ORDERS } from './actions'

export interface OrderState {
  orders: Order[]
}

export interface AddOrderAction {
  type: typeof ADD_ORDER
  orderData: {
    items: { item: CartItem; id: string }[]
    amount: number
    id: string
    date: Date
  }
}

export type AddOrderThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  AddOrderAction
>

export interface SetOrdersAction {
  type: typeof SET_ORDERS
  orders: Order[]
}

export type SetOrdersThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SetOrdersAction
>

export type OrderActionType = AddOrderAction | SetOrdersAction
