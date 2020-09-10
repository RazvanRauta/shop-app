import { ProductsState, ProductsActionTypes } from 'store/types/products'
import PRODUCTS from 'data/dummy-data'
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from 'store/types/actions'
import Product from 'models/product'

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
}

export default (
  state = initialState,
  action: ProductsActionTypes
): ProductsState => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === 'u1'),
      }

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

    case CREATE_PRODUCT:
      const newProduct = new Product(
        //@ts-ignore
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        parseInt(action.productData.price)
      )
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct),
      }
    case UPDATE_PRODUCT:
      const prodIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.pid
      )

      const updatedProduct = new Product(
        action.pid,
        state.userProducts[prodIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[prodIndex].price
      )

      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[prodIndex] = updatedProduct

      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.pid
      )

      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = updatedProduct

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      }

    default:
      return state
  }
}
