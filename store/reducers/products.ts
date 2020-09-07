import { ProductsState, ProductsActionTypes } from 'store/types/products'
import PRODUCTS from 'data/dummy-data'
import { DELETE_PRODUCT } from 'store/types/actions'

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
}

export default (
  state = initialState,
  action: ProductsActionTypes
): ProductsState => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id != action.pid
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id != action.pid
        ),
      }

    default:
      return state
  }
}
