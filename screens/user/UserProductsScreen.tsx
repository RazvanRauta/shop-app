import React from 'react'
import { FlatList, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ProductItem from 'components/shop/Product/ProductItem'
import Colors from 'constants/Colors'

const UserProductsScreen = () => {
  const userProducts = useSelector(
    (state: RootState) => state.products.userProducts
  )
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem onSelect={() => {}} {...itemData.item}>
          <Button color={Colors.primary} onPress={() => {}} title="Edit" />
          <Button color={Colors.primary} onPress={() => {}} title="Delete" />
        </ProductItem>
      )}
    />
  )
}

export default UserProductsScreen

// const styles = StyleSheet.create({})
