import { combineReducers } from 'redux'

import productsReducer from 'store/reducers/products'

export const rootReducer = combineReducers({
  products: productsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
