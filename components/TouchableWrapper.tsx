import { isAndroid } from 'constants/Platform'
import React, { FunctionComponent } from 'react'
import { GestureResponderEvent } from 'react-native'
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler'

interface AuxProps {
  onPress: (event: GestureResponderEvent) => void
  useForeground: boolean | undefined
}

const TouchableWrapper: FunctionComponent<AuxProps> = ({ children, ...rest }) =>
  isAndroid ? (
    <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
  ) : (
    <TouchableOpacity {...rest}>{children}</TouchableOpacity>
  )

export default TouchableWrapper
