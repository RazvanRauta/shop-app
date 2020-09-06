import React, { FunctionComponent } from 'react'
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { OrdersStackScreenProps } from 'types'

const OrderScreen: FunctionComponent<OrdersStackScreenProps> = () => {
  const orders = useSelector((state: RootState) => state.orders.orders)
  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <Text>${itemData.item.totalAmount}</Text>}
    />
  )
}

export default OrderScreen
