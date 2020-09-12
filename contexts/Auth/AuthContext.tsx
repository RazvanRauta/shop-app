import * as React from 'react'

export type AuthContextType = {
  signIn: ((data: any) => Promise<void>) | {}
  signOut: (() => void) | {}
  signUp: ((data: any) => Promise<void>) | {}
}

export const AuthContext: React.Context<AuthContextType> = React.createContext<
  AuthContextType
>({ signIn: {}, signOut: {}, signUp: {} })
