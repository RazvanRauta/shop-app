import React, { FunctionComponent } from 'react'
import { FlatList, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { RootState } from 'store/rootReducer'
import { OrdersStackScreenProps } from 'types'
import OrderItem from 'components/shop/OrderItem/OrderItem'

const OrderScreen: FunctionComponent<OrdersStackScreenProps> = () => {
  const orders = useSelector((state: RootState) => state.orders.orders)
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
