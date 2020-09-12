import {
  CreateProductThunkAction,
  DeleteProductThunkAction,
  FirebaseProducts,
  SetProductsThunkAction,
  UpdateProductThunkAction,
} from '../types/products'
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from 'store/types/actions'
import { Values } from 'screens/user/EditProductScreen'
import { API } from 'constants/API'
import Product from 'models/product'

export const fetchProducts = (): SetProductsThunkAction => async (dispatch) => {
  try {
    const response = await fetch(`${API}/products.json`)

    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const resData: FirebaseProducts = await response.json()

    const loadedProducts = Object.keys(resData).map(
      (name: string) =>
        new Product(
          name,
          'u1',
          resData[name].title,
          resData[name].imageUrl,
          resData[name].description,
          parseInt(resData[name].price)
        )
    )

    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
    })
  } catch (err) {
    throw err
  }
}

export const deleteProduct = (
  productId: string
): DeleteProductThunkAction => async (dispatch) => {
  const response = await fetch(`${API}/products/${productId}.json`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Something went wrong!')
  }

  dispatch({
    type: DELETE_PRODUCT,
    pid: productId,
  })
}

export const createProduct = ({
  title,
  price,
  imageUrl,
  description,
}: Values): CreateProductThunkAction => async (dispatch) => {
  const response = await fetch(`${API}/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      price,
      imageUrl,
      description,
    }),
  })

  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  const resData = await response.json()

  dispatch({
    type: CREATE_PRODUCT,
    productData: { id: resData.name, title, price, imageUrl, description },
  })
}

export const updateProduct = (
  { title, imageUrl, description }: Omit<Values, 'price'>,
  productId: string
): UpdateProductThunkAction => async (dispatch) => {
  const response = await fetch(`${API}/products/${productId}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      imageUrl,
      description,
    }),
  })

  if (!response.ok) {
    throw new Error('Something went wrong!')
  }

  dispatch({
    type: UPDATE_PRODUCT,
    pid: productId,
    productData: { title, imageUrl, description },
  })
}
