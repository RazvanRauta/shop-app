import { AUTHENTICATE, LOGOUT, SIGN_IN, SIGN_UP } from 'store/types/actions'
import { AuthState, AuthActionsType } from 'store/types/auth'

const initialState: AuthState = {
  //@ts-ignore
  token: null,

  //@ts-ignore
  userId: null,
}

export default (state = initialState, action: AuthActionsType): AuthState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      }
    case SIGN_IN:
      return {
        token: action.token,
        userId: action.userId,
      }
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId,
      }
    case LOGOUT:
      return {
        //@ts-ignore
        token: null,
        //@ts-ignore
        userId: null,
      }
    default:
      return state
  }
}
