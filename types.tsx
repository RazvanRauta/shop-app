import { StackScreenProps } from '@react-navigation/stack'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { Values } from 'screens/user/EditProductScreen'

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
    submit: (values: Values, id: string) => void
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
