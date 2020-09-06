import { combineReducers } from 'redux'

import productsReducer from 'store/reducers/products'
import cartReducer from 'store/reducers/cart'

export const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>
