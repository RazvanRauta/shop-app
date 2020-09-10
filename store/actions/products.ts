import {
  CreateProductAction,
  DeleteProductAction,
  UpdateProductAction,
} from '../types/products'
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from 'store/types/actions'
import { Values } from 'screens/user/EditProductScreen'

export const deleteProduct = (productId: string): DeleteProductAction => {
  return {
    type: DELETE_PRODUCT,
    pid: productId,
  }
}
export const createProduct = ({
  title,
  price,
  imageUrl,
  description,
}: Values): CreateProductAction => {
  return {
    type: CREATE_PRODUCT,
    productData: { title, price, imageUrl, description },
  }
}
export const updateProduct = (
  { title, price, imageUrl, description }: Values,
  productId: string
): UpdateProductAction => {
  return {
    type: UPDATE_PRODUCT,
    pid: productId,
    productData: { title, price, imageUrl, description },
  }
}
