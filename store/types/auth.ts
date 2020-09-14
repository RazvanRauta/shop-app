import { ThunkAction } from 'redux-thunk'
import { RootState } from 'store/rootReducer'
import { SIGN_UP, SIGN_IN, AUTHENTICATE, LOGOUT } from './actions'

export interface AuthState {
  token: string
  userId: string
}

export interface AuthenticateAction {
  type: typeof AUTHENTICATE
  token: string
  userId: string
}

export type AuthenticateThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  AuthenticateAction
>

export interface SignUpAction {
  type: typeof SIGN_UP
  token: string
  userId: string
}

export type SignUpThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SignUpAction
>

export interface SignInAction {
  type: typeof SIGN_IN
  token: string
  userId: string
}

export type SignInThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  SignInAction
>

export interface LogoutAction {
  type: typeof LOGOUT
}

export type LogoutThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  LogoutAction
>

export type AuthActionsType =
  | SignInAction
  | SignUpAction
  | AuthenticateAction
  | LogoutAction
