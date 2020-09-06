import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import NotFoundScreen from '../screens/NotFoundScreen'
import { RootStackParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Colors from 'constants/Colors'
import { isAndroid } from 'constants/Platform'
import ProductsOverviewScreen from 'screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from 'screens/shop/ProductDetailScreen'
import HeaderButton from 'components/UI/HeaderButton'
import CartScreen from 'screens/shop/CartScreen'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isAndroid ? Colors.primary : '',
        },
        headerTintColor: isAndroid ? 'white' : '',
      }}
      initialRouteName="ProductsOverviewScreen"
    >
      <RootStack.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          headerTitle: 'All products',
          headerTitleStyle: { fontFamily: 'open-sans-bold' },
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={isAndroid ? 'md-cart' : 'ios-cart'}
                onPress={() => navigation.navigate('CartScreen')}
              />
            </HeaderButtons>
          ),
        })}
      />
      <RootStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params.productTitle,
          headerTitleStyle: { fontFamily: 'open-sans-bold' },
          headerBackTitleStyle: { fontFamily: 'open-sans-bold' },
        })}
      />

      <RootStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTitle: 'Cart',
          headerTitleStyle: { fontFamily: 'open-sans-bold' },
        }}
      />

      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </RootStack.Navigator>
  )
}

// const ProductsStack = createStackNavigator<ProductsStackParamList>()

// function ProductsNavigator() {
//   return (
//     <ProductsStack.Navigator initialRouteName="ProductsOverviewScreen">

//     </ProductsStack.Navigator>
//   )
// }

//Get title for stack
// function getHeaderTitle(route: RouteProp<RootStackParamList, 'ProductsStack'>) {
//   // If the focused route is not found, we need to assume it's the initial screen
//   // This can happen during if there hasn't been any navigation inside the screen
//   // In our case, it's "Feed" as that's the first screen inside the navigator
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Title not found 0'
//   console.log(route)
//   switch (routeName) {
//     case 'ProductDetailScreen':
//       return route.params?.productTitle ?? 'Title not found 1'
//     case 'ProductsOverviewScreen':
//       return 'All Products'
//     default:
//       return 'Title not found 2'
//   }
// }
