import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Colors from 'constants/Colors'
import { RootStackScreenProps } from 'types'
import * as authActions from 'store/actions/auth'
import { useDispatch } from 'react-redux'

const StartUpScreen: FunctionComponent<RootStackScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if (!userData) {
        navigation.navigate('AuthScreen')
        return
      }
      const transformedData = JSON.parse(userData)

      const { expiryDate, token, userId } = transformedData
      const expirationDate = new Date(expiryDate)

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.navigate('AuthScreen')
        return
      }

      dispatch(authActions.authenticate(userId, token))

      navigation.navigate('ShopNavigator')
    }

    tryLogin()
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

export default StartUpScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
