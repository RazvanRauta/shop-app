import React, { FunctionComponent } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, View } from 'react-native'
import TouchableWrapper from '../../common/TouchableWrapper'
import { isAndroid } from 'constants/Platform'
import { SansBoldText, SansText } from 'components/common/StyledText'
import CartItem from 'models/cart-item'

interface OwnProps {
  onRemove: () => void
}

type Props = CartItem & OwnProps

const CartItemCard: FunctionComponent<Props> = ({
  quantity,
  productTitle,
  sum,
  imageUrl,
  onRemove,
}) => {
  return (
    <View style={styles.cartItem}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.itemData}>
        <SansText style={styles.qty}>{quantity} x </SansText>
        <SansBoldText style={styles.title}>{productTitle}</SansBoldText>
      </View>
      <View style={styles.itemData}>
        <SansBoldText style={styles.amount}>${sum}</SansBoldText>
        <TouchableWrapper
          containerStyle={styles.deleteButton}
          onPress={onRemove}
          useForeground={true}
        >
          <Ionicons
            name={isAndroid ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableWrapper>
      </View>
    </View>
  )
}

export default CartItemCard

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    padding: 10,
  },
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qty: {
    color: '#888',
    fontSize: 16,
  },
  title: { fontSize: 16, fontFamily: 'open-sans-bold' },
  amount: { fontSize: 16 },
  deleteButton: {
    marginLeft: 20,
  },
})
