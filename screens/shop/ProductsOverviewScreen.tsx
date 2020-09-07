import React, { FunctionComponent } from 'react'
import { FlatList, Button, ListRenderItemInfo } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'

import ProductItem from 'components/shop/Product/ProductItem'
import * as cartActions from 'store/actions/cart'
import { ProductsStackScreenProps } from 'types'
import Colors from 'constants/Colors'
import Product from 'models/product'

const ProductsOverviewScreen: FunctionComponent<ProductsStackScreenProps> = ({
  navigation,
}) => {
  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  )
  const dispatch = useDispatch()

  const onSelect = (itemData: ListRenderItemInfo<Product>) =>
    navigation.navigate('ProductDetailScreen', {
      productId: itemData.item.id,
      productTitle: itemData.item.title,
    })

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem {...itemData.item} onSelect={() => onSelect(itemData)}>
          <Button
            color={Colors.primary}
            onPress={() => onSelect(itemData)}
            title="View Details"
          />
          <Button
            color={Colors.primary}
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item))
            }}
            title="To Cart"
          />
        </ProductItem>
      )}
    />
  )
}

export default ProductsOverviewScreen
