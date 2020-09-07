import { DeleteProductAction } from '../types/products'
import { DELETE_PRODUCT } from 'store/types/actions'

export const deleteProduct = (productId: string): DeleteProductAction => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  }
}
