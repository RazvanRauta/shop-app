import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { ProductsStackScreenProps } from 'types'
import { RootState } from 'store/rootReducer'
import Colors from 'constants/Colors'
import { FlatList } from 'react-native-gesture-handler'
import CartItem from 'components/shop/CartItem/CartItem'
import * as cartActions from 'store/actions/cart'
import * as orderActions from 'store/actions/orders'

const CartScreen: FunctionComponent<ProductsStackScreenProps> = () => {
  const cartTotalAmount = useSelector(
    (state: RootState) => state.cart.totalAmount
  )
  const cartItems = useSelector((state: RootState) =>
    Object.entries(state.cart.items)
      .map(([id, item]) => ({ item, id }))
      .sort((a, b) => (a.id > b.id ? 1 : -1))
  )
  const dispatch = useDispatch()
  return (
    <View style={styles.cartScreen}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          Total:
          <Text style={styles.price}>
            {' '}
            ${Math.round((cartTotalAmount * 100) / 100).toFixed(2)}
          </Text>
        </Text>
        <Button
          disabled={!cartItems.length}
          color={Colors.accent}
          title="Order Now"
          onPress={() =>
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
          }
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <CartItem
            {...itemData.item.item}
            onRemove={() =>
              dispatch(cartActions.removeFromCart(itemData.item.id))
            }
          />
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
