import { combineReducers } from 'redux'

import productsReducer from 'store/reducers/products'
import cartReducer from 'store/reducers/cart'
import ordersReducer from 'store/reducers/orders'
import authReducer from 'store/reducers/auth'

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
