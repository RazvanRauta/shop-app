import React from 'react'
import { FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ProductItem from 'components/shop/Product/ProductItem'
import * as cartActions from 'store/actions/cart'

import { ProductsStackScreenProps } from 'types'

const ProductsOverviewScreen: React.FC<ProductsStackScreenProps> = ({
  navigation,
}) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  )
  const dispatch = useDispatch()

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          {...itemData.item}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item))
          }}
          onViewDetail={() =>
            navigation.navigate('ProductDetailScreen', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            })
          }
        />
      )}
    />
  )
}

export default ProductsOverviewScreen
