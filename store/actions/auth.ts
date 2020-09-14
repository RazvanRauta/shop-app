import { SIGN_UP_API, SIGN_IN_API } from 'constants/API'
import { AUTHENTICATE, LOGOUT, SIGN_IN, SIGN_UP } from 'store/types/actions'
import {
  SignUpThunkAction,
  SignInThunkAction,
  AuthenticateAction,
  LogoutAction,
} from 'store/types/auth'
import AsyncStorage from '@react-native-community/async-storage'

export const authenticate = (
  userId: string,
  token: string
): AuthenticateAction => {
  return { type: AUTHENTICATE, userId: userId, token: token }
}

export const signUp = (
  email: string,
  password: string
): SignUpThunkAction => async (dispatch) => {
  const response = await fetch(SIGN_UP_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  })

  if (!response.ok) {
    const errorResData = await response.json()
    const errorId = errorResData.error.message
    let message = 'Something went wrong!'

    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email exists already!'
    }

    throw new Error(message)
  }

  const resData = await response.json()

  dispatch({
    type: SIGN_UP,
    token: resData.idToken,
    userId: resData.localId,
  })
  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  )
  saveDataToStorage(resData.idToken, resData.localId, expirationDate)
}

export const signIn = (
  email: string,
  password: string
): SignInThunkAction => async (dispatch) => {
  const response = await fetch(SIGN_IN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  })

  if (!response.ok) {
    const errorResData = await response.json()
    const errorId = errorResData.error.message
    let message = 'Something went wrong!'

    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!'
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid!'
    }

    throw new Error(message)
  }

  const resData = await response.json()

  dispatch({
    type: SIGN_IN,
    token: resData.idToken,
    userId: resData.localId,
  })
  const expirationDate = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  )
  saveDataToStorage(resData.idToken, resData.localId, expirationDate)
}

export const logout = (): LogoutAction => {
  AsyncStorage.setItem('userData', JSON.stringify({}))
  return { type: LOGOUT }
}

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: Date
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  )
}
