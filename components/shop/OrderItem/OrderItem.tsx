import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import moment from 'moment'
import Order from 'models/order'
import CartItem from '../CartItem/CartItem'
import Colors from 'constants/Colors'

const OrderItem: FunctionComponent<Order> = ({ date, totalAmount, items }) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>
          {moment(date).format('MMMM Do YYYY, hh:mm')}
        </Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails((prevState: boolean) => !prevState)}
      />

      {showDetails && (
        <View style={styles.detailItems}>
          {items.map((item) => (
            <CartItem key={item.id} {...item.item} deletable={false} />
          ))}
        </View>
      )}
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
})
