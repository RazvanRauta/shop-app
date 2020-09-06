import Colors from 'constants/Colors'
import Product from 'models/product'
import React from 'react'
import { Text, View, StyleSheet, ScrollView, Image, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { RootStackScreenProps } from 'types'
import * as cartActions from 'store/actions/cart'

const ProductDetailScreen: React.FC<RootStackScreenProps> = ({ route }) => {
  const productId = route.params?.productId
  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find(
      (prod: Product) => prod.id === productId
    )
  )
  const dispatch = useDispatch()
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct?.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            //@ts-ignore
            dispatch(cartActions.addToCart(selectedProduct))
          }}
        />
      </View>

      <Text style={styles.price}>${selectedProduct?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct?.description}</Text>
    </ScrollView>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans',
  },
})
