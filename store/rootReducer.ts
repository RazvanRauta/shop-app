import { combineReducers } from 'redux'

import productsReducer from 'store/reducers/products'
import cartReducer from 'store/reducers/cart'
import ordersReducer from 'store/reducers/orders'

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
})

export type RootState = ReturnType<typeof rootReducer>
