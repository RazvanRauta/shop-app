import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  GestureResponderEvent,
} from 'react-native'
import Colors from 'constants/Colors'
import TouchableWrapper from 'components/common/TouchableWrapper'

interface OwnProps {
  title: string
  price: number
  imageUrl: string
  onViewDetail: (event: GestureResponderEvent) => void
  onAddToCart: () => void
}

type Props = OwnProps

const ProductItem: React.FC<Props> = ({
  imageUrl,
  price,
  title,
  onViewDetail,
  onAddToCart,
}) => {
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableWrapper onPress={onViewDetail} useForeground={true}>
          <View>
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
      </View>
    </View>
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
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
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
    marginVertical: 2,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'open-sans-bold',
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
