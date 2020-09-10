import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import {
  AdminStackParamList,
  OrdersStackParamList,
  ProductsStackParamList,
  ShopStackParamList,
} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Colors from 'constants/Colors'
import { isAndroid } from 'constants/Platform'
import ProductsOverviewScreen from 'screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from 'screens/shop/ProductDetailScreen'
import HeaderButton from 'components/UI/HeaderButton'
import CartScreen from 'screens/shop/CartScreen'
import OrderScreen from 'screens/shop/OrderScreen'
import { Ionicons } from '@expo/vector-icons'
import UserProductsScreen from 'screens/user/UserProductsScreen'
import EditProductScreen from 'screens/user/EditProductScreen'

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
const RootStack = createStackNavigator()

function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="ProductsStack">
      <RootStack.Screen
        name="ShopNavigator"
        component={ShopNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  )
}

const ShopStack = createDrawerNavigator<ShopStackParamList>()

function ShopNavigator() {
  return (
    <ShopStack.Navigator
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <ShopStack.Screen
        name="ProductsStack"
        component={ProductsNavigator}
        options={{
          title: 'All Products',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={isAndroid ? 'md-cart' : 'ios-cart'}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <ShopStack.Screen
        name="OrdersStack"
        component={OrdersNavigator}
        options={{
          title: 'Orders',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={isAndroid ? 'md-list' : 'ios-list'}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />

      <ShopStack.Screen
        name="AdminStack"
        component={AdminNavigator}
        options={{
          title: 'Users Products',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={isAndroid ? 'md-create' : 'ios-create'}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
    </ShopStack.Navigator>
  )
}

const ProductsStack = createStackNavigator<ProductsStackParamList>()

function ProductsNavigator() {
  return (
    <ProductsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isAndroid ? Colors.primary : '',
        },
        headerTintColor: isAndroid ? 'white' : '',
      }}
    >
      <ProductsStack.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          headerTitle: 'All Products',
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
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Orders"
                iconName={isAndroid ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        })}
      />
      <ProductsStack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({
          headerTitle: route.params.productTitle,
          headerTitleStyle: { fontFamily: 'open-sans-bold' },
          headerBackTitleStyle: { fontFamily: 'open-sans-bold' },
        })}
      />

      <ProductsStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerTitle: 'Cart',
          headerTitleStyle: { fontFamily: 'open-sans-bold' },
        }}
      />
    </ProductsStack.Navigator>
  )
}

const OrdersStack = createStackNavigator<OrdersStackParamList>()

function OrdersNavigator() {
  return (
    <OrdersStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isAndroid ? Colors.primary : '',
        },
        headerTintColor: isAndroid ? 'white' : '',
      }}
    >
      <OrdersStack.Screen
        name="OrdersScreen"
        component={OrderScreen}
        options={({ navigation }) => ({
          title: 'Your Orders',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Orders"
                iconName={isAndroid ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        })}
      />
    </OrdersStack.Navigator>
  )
}

const AdminStack = createStackNavigator<AdminStackParamList>()

function AdminNavigator() {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isAndroid ? Colors.primary : '',
        },
        headerTintColor: isAndroid ? 'white' : '',
      }}
    >
      <AdminStack.Screen
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: 'Your Products',
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="User Products"
                iconName={isAndroid ? 'md-menu' : 'ios-menu'}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={isAndroid ? 'md-create' : 'ios-create'}
                onPress={() => navigation.navigate('EditProductsScreen')}
              />
            </HeaderButtons>
          ),
        })}
      />

      <AdminStack.Screen
        name="EditProductsScreen"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params?.productTitle
            ? `Edit: ${route.params.productTitle}`
            : 'Add Product',
        })}
      />
    </AdminStack.Navigator>
  )
}
