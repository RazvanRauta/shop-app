import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  HeaderButton as DefaultHeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons'
import Colors from 'constants/Colors'
import { isAndroid } from 'constants/Platform'

interface Props {}

type OwnProps = Props & HeaderButtonProps

const HeaderButton = (props: OwnProps) => {
  return (
    <DefaultHeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={isAndroid ? 'white' : Colors.primary}
    />
  )
}

export default HeaderButton
