import { StackScreenProps } from '@react-navigation/stack'
import { DrawerScreenProps } from '@react-navigation/drawer'

export type RootStackParamList = {
  ShopNavigator: undefined
  AuthScreen: undefined
  StartUpScreen: undefined
}

export type RootStackScreenProps = StackScreenProps<
  RootStackParamList,
  'ShopNavigator' | 'AuthScreen' | 'StartUpScreen'
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
  AdminStack: undefined
}

export type ShopStackScreenProps = DrawerScreenProps<
  ShopStackParamList,
  'ProductsStack' | 'OrdersStack'
>

export type AdminStackParamList = {
  UserProductsScreen: undefined
  EditProductsScreen: {
    productId?: string
    productTitle?: string
  }
}

export type AdminScreenProps = StackScreenProps<
  AdminStackParamList,
  'UserProductsScreen' | 'EditProductsScreen'
>

export type OrdersStackParamList = {
  OrdersScreen: undefined
}

export type OrdersStackScreenProps = StackScreenProps<
  OrdersStackParamList,
  'OrdersScreen'
>
