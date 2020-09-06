import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootStackScreenProps } from 'types'
import { RootState } from 'store/rootReducer'

import Colors from 'constants/Colors'
import { FlatList } from 'react-native-gesture-handler'
import CartItem from 'components/shop/CartItem/CartItem'

const CartScreen: FunctionComponent<RootStackScreenProps> = () => {
  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  )
  const cartItems = useSelector((state: RootState) =>
    Object.keys(state.cart.items).map((key) => ({
      key,
      value: state.cart.items[key],
    }))
  )
  return (
    <View style={styles.cartScreen}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          Total:
          <Text style={styles.price}> ${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          disabled={!cartItems.length}
          color={Colors.accent}
          title="Order Now"
          onPress={() => {}}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => (
          <CartItem {...itemData.item.value} onRemove={() => {}} />
        )}
      />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartScreen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
  },
  price: {
    color: Colors.primary,
  },
})
