import Product from 'models/product'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { RootStackScreenProps } from 'types'

const ProductDetailScreen: React.FC<RootStackScreenProps> = ({ route }) => {
  const productId = route.params?.productId
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find(
      (prod: Product) => prod.id === productId
    )
  )
  return (
    <View style={styles.productDetail}>
      <Text>{selectedProduct?.title}</Text>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  productDetail: {
    marginHorizontal: 5,
  },
})
