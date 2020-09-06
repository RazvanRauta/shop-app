import * as React from 'react'
import { Text as DefaultText } from 'react-native'

export type TextProps = DefaultText['props']

export function SansText(props: TextProps) {
  return (
    <DefaultText
      style={[props.style, { fontFamily: 'open-sans' }]}
      {...props}
    />
  )
}

export function SansBoldText(props: TextProps) {
  return (
    <DefaultText
      style={[props.style, { fontFamily: 'open-sans-bold' }]}
      {...props}
    />
  )
}
