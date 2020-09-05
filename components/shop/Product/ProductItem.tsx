import React, { ReactChild, ReactChildren } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  GestureResponderEvent,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native'
import Colors from 'constants/Colors'
import { isAndroid } from 'constants/Platform'

interface AuxProps {
  children: ReactChild | ReactChildren
  onPress: (event: GestureResponderEvent) => void
  useForeground: boolean | undefined
}

interface OwnProps {
  title: string
  price: number
  imageUrl: string
  onViewDetail: (event: GestureResponderEvent) => void
  onAddToCart: (event: GestureResponderEvent) => void
}

type Props = OwnProps

const ProductItem: React.FC<Props> = ({
  imageUrl,
  price,
  title,
  onViewDetail,
  onAddToCart,
}) => {
  const TouchableWrapper = ({ children, ...rest }: AuxProps) =>
    isAndroid ? (
      <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
    ) : (
      <TouchableOpacity {...rest}>{children}</TouchableOpacity>
    )

  return (
    <TouchableWrapper onPress={onViewDetail} useForeground>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color={Colors.primary}
            onPress={onViewDetail}
            title="View Details"
          />
          <Button
            color={Colors.primary}
            onPress={onAddToCart}
            title="To Cart"
          />
        </View>
      </View>
    </TouchableWrapper>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: '25%',
  },
})
