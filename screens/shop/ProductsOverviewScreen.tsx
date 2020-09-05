import React from 'react'
import { FlatList, GestureResponderEvent } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ProductItem from 'components/shop/Product/ProductItem'

import { RootStackScreenProps } from 'types'

const ProductsOverviewScreen: React.FC<RootStackScreenProps> = ({
  navigation,
}) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  )

  const onAddToCart = (event: GestureResponderEvent) => {
    console.log(event.currentTarget)
  }

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          {...itemData.item}
          onAddToCart={onAddToCart}
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
