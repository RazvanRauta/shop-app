import { StackScreenProps } from '@react-navigation/stack'
import { DrawerScreenProps } from '@react-navigation/drawer'

export type RootStackParamList = {
  ShopNavigator: undefined
}

export type RootStackScreenProps = StackScreenProps<
  RootStackParamList,
  'ShopNavigator'
>

export type ProductsStackParamList = {
  ProductsOverviewScreen: undefined
  ProductDetailScreen: { productId?: string; productTitle?: string }
  CartScreen: undefined
}

export type ProductsStackScreenProps = StackScreenProps<
  ProductsStackParamList,
  'ProductsOverviewScreen' | 'CartScreen' | 'ProductDetailScreen'
>

export type ShopStackParamList = {
  ProductsStack: undefined
  OrdersStack: undefined
}

export type ShopStackScreenProps = DrawerScreenProps<
  ShopStackParamList,
  'ProductsStack' | 'OrdersStack'
>

export type OrdersStackParamList = {
  OrdersScreen: undefined
}

export type OrdersStackScreenProps = StackScreenProps<
  OrdersStackParamList,
  'OrdersScreen'
>
