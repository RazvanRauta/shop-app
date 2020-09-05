import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParamList = {
  ProductsOverviewScreen: undefined
  ProductDetailScreen: { productId?: string; productTitle?: string }
  NotFound: undefined
}

export type RootStackScreenProps = StackScreenProps<
  RootStackParamList,
  'ProductsOverviewScreen' | 'ProductDetailScreen'
>
