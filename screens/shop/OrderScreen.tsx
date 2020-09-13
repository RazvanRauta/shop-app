import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from 'store/rootReducer'
import { OrdersStackScreenProps } from 'types'
import OrderItem from 'components/shop/OrderItem/OrderItem'
import * as ordersActions from 'store/actions/orders'
import Colors from 'constants/Colors'

const OrderScreen: FunctionComponent<OrdersStackScreenProps> = () => {
  const [loading, setLoading] = useState(false)
  const orders = useSelector((state: RootState) => state.orders.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(ordersActions.fetchOrders())
    setLoading(false)
  }, [dispatch])

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          id={itemData.item.id}
          date={itemData.item.date}
          items={itemData.item.items}
          totalAmount={itemData.item.totalAmount}
        />
      )}
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
          <Text style={{ fontSize: 20 }}>oops! There are no orders yet!</Text>
        </View>
      )}
    />
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
