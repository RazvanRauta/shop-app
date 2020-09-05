import { ProductsState, ProductsActionTypes } from 'store/types/products'
import PRODUCTS from 'data/dummy-data'

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
}

export default (
  state = initialState,
  action: ProductsActionTypes
): ProductsState => {
  switch (action.type) {
    default:
      return state
  }
}
