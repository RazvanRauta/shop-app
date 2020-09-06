import CartItem from 'models/cart-item'
import { ADD_ORDER, ADD_TO_CART, REMOVE_FROM_CART } from 'store/types/actions'
import { CartState, CartActionTypes } from 'store/types/cart'
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
          existingCartItem.sum + addedProduct.price,
          addedProduct.imageUrl
        )
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.price,
          addedProduct.imageUrl
        )
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.price,
      }
    case REMOVE_FROM_CART:
      const pid = action.pid
      const selectedCartItem = state.items[pid]
      const currentQuantity = selectedCartItem?.quantity
      let updatedCartItems
      if (currentQuantity > 1) {
        const updatedCartItem = new CartItem(
          currentQuantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice,
          selectedCartItem.imageUrl
        )
        updatedCartItems = { ...state.items, [pid]: updatedCartItem }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[pid]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      }

    case ADD_ORDER:
      return initialState

    default:
      return state
  }
}
