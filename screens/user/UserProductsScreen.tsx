import React, { FunctionComponent } from 'react'
import { FlatList, Button, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store/rootReducer'
import ProductItem from 'components/shop/Product/ProductItem'
import Colors from 'constants/Colors'
import * as productsActions from 'store/actions/products'
import { AdminScreenProps } from 'types'

const UserProductsScreen: FunctionComponent<AdminScreenProps> = ({
  navigation,
}) => {
  const userProducts = useSelector(
    (state: RootState) => state.products.userProducts
  )
  const dispatch = useDispatch()

  const onEditProduct = (id: string, title: string) => {
    navigation.navigate('EditProductsScreen', {
      productId: id,
      productTitle: title,
    })
  }

  return (
    <FlatList
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            marginTop: '100%',
          }}
        >
          <Text style={{ fontSize: 20 }}>
            oops! There are no products here!
          </Text>
        </View>
      )}
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem onSelect={() => {}} {...itemData.item}>
          <Button
            color={Colors.primary}
            onPress={() => onEditProduct(itemData.item.id, itemData.item.title)}
            title="Edit"
          />
          <Button
            color={Colors.primary}
            onPress={() => {
              dispatch(productsActions.deleteProduct(itemData.item.id))
            }}
            title="Delete"
          />
        </ProductItem>
      )}
    />
  )
}

export default UserProductsScreen

// const styles = StyleSheet.create({})
