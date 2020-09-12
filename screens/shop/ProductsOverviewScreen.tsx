import React, {
  useEffect,
  FunctionComponent,
  useState,
  useCallback,
} from 'react'
import {
  FlatList,
  Button,
  ListRenderItemInfo,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'

import ProductItem from 'components/shop/Product/ProductItem'
import * as cartActions from 'store/actions/cart'
import * as productsActions from 'store/actions/products'
import { ProductsStackScreenProps } from 'types'
import Colors from 'constants/Colors'
import Product from 'models/product'

const ProductsOverviewScreen: FunctionComponent<ProductsStackScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false)
  const [isRefreshing, setRefreshing] = useState(false)

  const [err, setError] = useState(null)

  const products = useSelector(
    (state: RootState) => state.products.availableProducts
  )
  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null)
    setRefreshing(true)
    try {
      await dispatch(productsActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setRefreshing(false)
  }, [dispatch, setLoading, setError])

  useEffect(() => {
    const focus = navigation.addListener('focus', loadProducts)
    return focus
  }, [loadProducts])

  useEffect(() => {
    let isCancelled = false
    if (!isCancelled) {
      setLoading(true)
      loadProducts().then(() => setLoading(false))
    }
    return () => {
      isCancelled = true
    }
  }, [dispatch, loadProducts])

  if (err)
    return (
      <View style={styles.centered}>
        <Text style={[styles.message, { color: 'red' }]}>
          An error occurred!
        </Text>
        <Button
          title="Try again!"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    )

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )

  if (!loading && products.length === 0)
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>
          No products were found. Maybe start adding some!
        </Text>
      </View>
    )

  const onSelect = (itemData: ListRenderItemInfo<Product>) =>
    navigation.navigate('ProductDetailScreen', {
      productId: itemData.item.id,
      productTitle: itemData.item.title,
    })

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={(itemData) => (
        <ProductItem {...itemData.item} onSelect={() => onSelect(itemData)}>
          <Button
            color={Colors.primary}
            onPress={() => onSelect(itemData)}
            title="View Details"
          />
          <Button
            color={Colors.primary}
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item))
            }}
            title="To Cart"
          />
        </ProductItem>
      )}
    />
  )
}

export default ProductsOverviewScreen

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    maxWidth: '75%',
    textAlign: 'center',
    marginBottom: 10,
  },
})
