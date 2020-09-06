import { isAndroid } from 'constants/Platform'
import React, { FunctionComponent } from 'react'
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native'

interface AuxProps {
  onPress: (event: GestureResponderEvent) => void
  useForeground: boolean | undefined
  containerStyle?: StyleProp<ViewStyle>
}

const TouchableWrapper: FunctionComponent<AuxProps> = ({ children, ...rest }) =>
  isAndroid ? (
    <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
  ) : (
    <TouchableOpacity {...rest}>{children}</TouchableOpacity>
  )

export default TouchableWrapper
