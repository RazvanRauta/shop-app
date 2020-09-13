import { WEB_API_KEY } from '@env'

export const API = 'https://shop-app-native.firebaseio.com'
export const SIGN_UP_API = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`
export const SIGN_IN_API = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`
