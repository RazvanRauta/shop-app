import CartItem from 'models/cart-item'
import { CartState, CartActionTypes, ADD_TO_CART } from 'store/types/cart'
const initialState: CartState = {
  items: {},
  totalAmount: 0,
}

export default (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      let updatedOrNewCartItem: CartItem
      const addedProduct = action.product
      const existingCartItem = state.items[addedProduct.id] ?? null

      if (existingCartItem) {
        updatedOrNewCartItem = new CartItem(
          existingCartItem.quantity + 1,
          addedProduct.price,
          addedProduct.title,
          existingCartItem.sum + addedProduct.price
        )
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.price
        )
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.price,
      }

    default:
      return state
  }
}
